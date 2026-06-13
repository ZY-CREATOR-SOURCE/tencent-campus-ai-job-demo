import json
import os
from io import BytesIO

import fitz
from docx import Document
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI


load_dotenv()

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) if os.getenv("OPENAI_API_KEY") else None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_pdf_text(file_bytes: bytes) -> str:
    text_parts = []
    with fitz.open(stream=file_bytes, filetype="pdf") as document:
        for page in document:
            text_parts.append(page.get_text())
    return "\n".join(text_parts).strip()


def extract_docx_text(file_bytes: bytes) -> str:
    document = Document(BytesIO(file_bytes))
    paragraphs = [paragraph.text.strip() for paragraph in document.paragraphs]
    return "\n".join(paragraph for paragraph in paragraphs if paragraph).strip()


def extract_text_from_file(filename: str, file_bytes: bytes) -> str:
    lower_name = filename.lower()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if lower_name.endswith(".pdf"):
        text = extract_pdf_text(file_bytes)
    elif lower_name.endswith(".docx"):
        text = extract_docx_text(file_bytes)
    elif lower_name.endswith(".doc"):
        raise HTTPException(status_code=415, detail="Legacy .doc is not supported. Please save as .docx and upload again.")
    else:
        raise HTTPException(status_code=415, detail="Only PDF and DOCX resumes are supported.")
    if not text:
        raise HTTPException(status_code=422, detail="No text was extracted. The resume may be scanned or image-based.")
    return text


def local_resume_diagnosis(resume_text: str) -> dict:
    has_sql = "SQL" in resume_text.upper()
    has_excel = "EXCEL" in resume_text.upper() or "Excel" in resume_text
    has_data = any(word in resume_text for word in ["数据", "分析", "复盘", "指标", "转化"])
    education_keywords = []
    for keyword in ["硕士", "本科", "博士", "双一流", "985", "211"]:
        if keyword in resume_text:
            education_keywords.append(keyword)
    if not education_keywords:
        education_keywords.append("已识别教育背景")
    language_keywords = []
    for keyword in ["CET-6", "英语六级", "CET-4", "英语四级", "雅思", "托福"]:
        if keyword in resume_text:
            language_keywords.append(keyword)

    covered = []
    missing = []
    if has_excel:
        covered.append("Excel")
    else:
        missing.append("Excel")
    if has_sql:
        covered.append("SQL")
    else:
        missing.append("SQL")
    if has_data:
        covered.append("数据复盘")
    else:
        missing.append("数据复盘")
    missing.extend(["量化结果", "业务影响"])

    return {
        "score": 82 if has_data else 76,
        "profile": "已解析简历文本，候选人具备校招投递基础。建议继续突出教育背景、核心技能、实习项目和可量化结果。",
        "education_keywords": education_keywords,
        "language_keywords": language_keywords,
        "keyword_covered": covered,
        "keyword_missing": missing,
        "star_parts": {
            "situation": "面向目标岗位相关项目或实习任务。",
            "task": "承担数据分析、运营推进或项目交付职责。",
            "action": "使用 Excel/SQL、沟通协作和复盘方法推进问题解决。",
            "result": "建议补充转化率、效率提升、用户增长等量化结果。"
        },
        "star_summary": "S：面向目标岗位相关项目或实习任务；T：承担数据分析、运营推进或项目交付职责；A：使用 Excel/SQL、沟通协作和复盘方法推进问题解决；R：建议补充转化率、效率提升、用户增长等量化结果。",
        "tencent_fit_advice": "投递腾讯校招产品运营、用户研究或数据分析类岗位时，建议强调用户洞察、数据复盘、跨部门协作和结果指标。",
        "rewrite_before": "负责项目运营和数据分析，参与活动复盘。",
        "rewrite_after": "围绕用户增长目标推进项目运营，使用 Excel/SQL 清洗并分析用户行为数据，定位转化流失环节，输出复盘建议并推动后续活动优化。",
        "mode": "local_fallback"
    }


def ai_resume_diagnosis(resume_text: str) -> dict:
    api_key = os.getenv("OPENAI_API_KEY", "")
    if not client or not api_key or api_key == "your_openai_api_key_here":
        return local_resume_diagnosis(resume_text)

    prompt = f"""
你是腾讯校招简历诊断助手。请基于简历文本输出严格 JSON，不要输出 Markdown。
JSON 字段：
score: 0-100 的初筛友好度分数
profile: 80字以内求职画像
education_keywords: 教育背景关键词数组，例如学校层次、学历、专业、院校信息；不要放 CET-6、英语六级等英语成绩
language_keywords: 语言能力/英语成绩关键词数组，例如 CET-6、英语六级、雅思、托福
keyword_covered: 已覆盖关键词数组
keyword_missing: 待加强关键词数组
star_parts: 对象，包含 situation、task、action、result 四个字段，每个字段一句话
star_summary: 用 STAR 法则总结简历中最相关的一段工作/实习/项目经历，格式为 S：...；T：...；A：...；R：...
tencent_fit_advice: 腾讯校招适配建议
rewrite_before: 从简历中概括一条偏弱原表述
rewrite_after: 将 rewrite_before 改写为更量化、更贴近腾讯校招岗位的表述

简历文本：
{resume_text[:8000]}
"""
    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt,
        )
    except Exception as error:
        result = local_resume_diagnosis(resume_text)
        result["mode"] = "local_fallback"
        result["ai_error"] = str(error)
        return result

    try:
        result = json.loads(response.output_text)
    except json.JSONDecodeError:
        result = local_resume_diagnosis(resume_text)
        result["raw_ai_output"] = response.output_text
    result["mode"] = "openai"
    return result


@app.get("/")
def health_check():
    return {"message": "FastAPI is running"}


@app.post("/api/extract-resume-text")
async def extract_resume_text(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_file(file.filename or "", file_bytes)
    return {
        "filename": file.filename,
        "char_count": len(text),
        "preview": text[:500],
        "text": text,
    }


@app.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_file(file.filename or "", file_bytes)
    diagnosis = ai_resume_diagnosis(text)
    return {
        "filename": file.filename,
        "char_count": len(text),
        "preview": text[:500],
        "text": text,
        "diagnosis": diagnosis,
    }
