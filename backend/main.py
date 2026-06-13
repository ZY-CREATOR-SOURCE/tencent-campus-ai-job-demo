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


DEMO_JOBS = [
    {
        "title": "腾讯产品运营实习生",
        "company": "腾讯",
        "department": "PCG",
        "city": "深圳",
        "salary": "200-300/天",
        "category": "核心推荐",
        "keywords": ["产品运营", "用户增长", "数据分析", "SQL", "Excel", "内容生态", "复盘", "跨部门协作"],
        "description": "负责内容生态活动运营、用户增长策略和数据复盘，要求具备用户洞察、项目推进和结构化表达能力。",
    },
    {
        "title": "腾讯用户研究实习生",
        "company": "腾讯",
        "department": "IEG",
        "city": "深圳",
        "salary": "200-300/天",
        "category": "核心推荐",
        "keywords": ["用户研究", "问卷调研", "竞品分析", "访谈", "数据分析", "结构化表达", "洞察"],
        "description": "参与用户访谈、问卷调研和竞品分析，输出用户洞察并支持产品体验优化。",
    },
    {
        "title": "腾讯商业分析助理",
        "company": "腾讯",
        "department": "CSIG",
        "city": "北京",
        "salary": "250-350/天",
        "category": "稳妥保底",
        "keywords": ["商业分析", "数据复盘", "Excel", "SQL", "指标分析", "报告撰写", "业务理解"],
        "description": "支持业务数据分析、行业研究和经营复盘，要求具备数据敏感度和清晰表达能力。",
    },
    {
        "title": "腾讯数据运营实习生",
        "company": "腾讯",
        "department": "WXG",
        "city": "广州",
        "salary": "200-300/天",
        "category": "稳妥保底",
        "keywords": ["数据运营", "Excel", "SQL", "可视化", "数据清洗", "运营策略", "复盘"],
        "description": "围绕产品运营目标进行数据清洗、指标监测和策略复盘，支持运营决策。",
    },
    {
        "title": "腾讯AI产品策划实习生",
        "company": "腾讯",
        "department": "TEG",
        "city": "上海",
        "salary": "250-350/天",
        "category": "跨界探索",
        "keywords": ["AI工具", "产品策划", "需求分析", "竞品分析", "用户洞察", "项目推进"],
        "description": "参与 AI 产品需求梳理、竞品分析和功能体验优化，适合具备产品意识和学习能力的候选人。",
    },
]


def unique_keywords(keywords: list[str]) -> list[str]:
    seen = set()
    result = []
    for keyword in keywords:
        if keyword and keyword not in seen:
            seen.add(keyword)
            result.append(keyword)
    return result


def collect_keywords(resume_text: str, keyword_pool: list[str]) -> list[str]:
    upper_text = resume_text.upper()
    matched = []
    for keyword in keyword_pool:
        if keyword.upper() in upper_text or keyword in resume_text:
            matched.append(keyword)
    return unique_keywords(matched)


def match_jobs(profile: dict) -> list[dict]:
    profile_keywords = []
    for field in ["education", "hard_skills", "internship_experience", "soft_skills"]:
        profile_keywords.extend(profile.get(field, []))
    profile_text = " ".join(profile_keywords + [profile.get("profile_summary", "")])

    matched_jobs = []
    for job in DEMO_JOBS:
        matched_keywords = [keyword for keyword in job["keywords"] if keyword in profile_text]
        base_score = 62 + len(matched_keywords) * 6
        if job["category"] == "核心推荐":
            base_score += 6
        score = min(96, max(68, base_score))
        matched_jobs.append({
            "title": job["title"],
            "company": job["company"],
            "department": job["department"],
            "city": job["city"],
            "salary": job["salary"],
            "category": job["category"],
            "match": score,
            "matched_keywords": matched_keywords[:5],
            "reason": f"与你的{ '、'.join(matched_keywords[:3]) if matched_keywords else '项目经历和校招基础能力' }较匹配。",
            "description": job["description"],
        })

    return sorted(matched_jobs, key=lambda job: job["match"], reverse=True)


def local_career_profile(resume_text: str) -> dict:
    education = collect_keywords(resume_text, ["博士", "硕士", "本科", "双一流", "985", "211"])
    if not education:
        education = ["已识别教育背景"]

    hard_skills = collect_keywords(
        resume_text,
        ["SQL", "Excel", "Python", "SPSS", "Tableau", "PowerBI", "数据分析", "竞品分析", "问卷调研", "用户研究", "AI工具", "PPT"],
    )
    internship_experience = collect_keywords(
        resume_text,
        ["实习", "运营", "用户增长", "活动运营", "社群运营", "项目复盘", "数据复盘", "科研", "调研", "产品"],
    )
    soft_skills = collect_keywords(
        resume_text,
        ["跨部门沟通", "沟通", "协作", "结构化表达", "执行", "推进", "学习", "复盘", "责任心"],
    )

    if not hard_skills:
        hard_skills = ["数据分析基础", "办公软件应用"]
    if not internship_experience:
        internship_experience = ["项目/实习经历待进一步提炼"]
    if not soft_skills:
        soft_skills = ["沟通协作", "执行推进", "学习能力"]

    profile = {
        "profile_summary": "你具备校招投递基础，适合优先围绕运营、用户研究、商业分析或数据运营方向提炼经历。建议突出教育背景、数据能力、项目推进过程和量化结果。",
        "education": education[:6],
        "hard_skills": hard_skills[:8],
        "internship_experience": internship_experience[:8],
        "soft_skills": soft_skills[:8],
        "growth_advice": "建议补充每段经历的目标、行动和结果指标，例如用户增长、转化率提升、效率提升或报告采纳情况。",
        "mode": "local_fallback",
    }
    profile["recommended_jobs"] = match_jobs(profile)
    return profile


def ai_career_profile(resume_text: str) -> dict:
    api_key = os.getenv("OPENAI_API_KEY", "")
    if not client or not api_key or api_key == "your_openai_api_key_here":
        return local_career_profile(resume_text)

    job_context = "\n".join(
        f"- {job['title']}｜{job['department']}｜{job['city']}｜关键词：{'、'.join(job['keywords'])}"
        for job in DEMO_JOBS
    )
    prompt = f"""
你是腾讯校招 AI 求职画像智能体。请基于简历文本输出严格 JSON，不要输出 Markdown。
JSON 字段：
profile_summary: 120字以内，用腾讯校招语境描述候选人的整体求职画像
education: 学历背景关键词数组，例如学校层次、学历、专业、院校信息；不要放 CET-6、英语六级等英语成绩
hard_skills: 硬技能关键词数组，例如 SQL、Excel、Python、数据分析、用户研究、竞品分析
internship_experience: 实习/项目/科研经历关键词数组，提炼岗位相关经历
soft_skills: 软实力关键词数组，例如跨部门沟通、结构化表达、执行推进、学习能力
growth_advice: 80字以内，说明下一步如何提升岗位匹配度
recommended_jobs: 数组，按 match 从高到低排序，每项包含 title、company、department、city、salary、category、match、matched_keywords、reason、description

岗位库：
{job_context}

简历文本：
{resume_text[:8000]}
"""
    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt,
        )
    except Exception as error:
        result = local_career_profile(resume_text)
        result["ai_error"] = str(error)
        return result

    try:
        result = json.loads(response.output_text)
    except json.JSONDecodeError:
        result = local_career_profile(resume_text)
        result["raw_ai_output"] = response.output_text
        return result

    result["mode"] = "openai"
    if not result.get("recommended_jobs"):
        result["recommended_jobs"] = match_jobs(result)
    return result


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


@app.post("/api/generate-profile")
async def generate_profile(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_file(file.filename or "", file_bytes)
    profile = ai_career_profile(text)
    return {
        "filename": file.filename,
        "char_count": len(text),
        "preview": text[:500],
        "profile": profile,
    }
