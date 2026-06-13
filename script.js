const profile = {
  educationTags: ["双一流硕士", "专业背景匹配", "校招候选人"],
  hardSkills: ["SQL基础", "Excel透视表", "竞品分析", "问卷调研", "数据复盘", "协作工具"],
  experienceTags: ["互联网运营实习", "用户增长活动", "AI工具调研", "社群运营", "项目复盘"],
  softSkills: ["跨部门沟通", "结构化表达", "执行推进", "学习速度快"]
};

const parsedProfile = {
  educationTags: ["硕士学历", "双一流院校", "互联网方向"],
  hardSkills: ["SQL基础", "Excel透视表", "竞品分析", "问卷调研", "数据复盘", "AI工具调研"],
  experienceTags: ["2段互联网运营实习", "用户增长活动", "内容生态运营", "社群运营", "项目复盘"],
  softSkills: ["跨部门沟通", "结构化表达", "执行推进", "快速学习", "结果导向"]
};

const chinaCityGroups = {
  "直辖市": ["北京", "上海", "天津", "重庆"],
  "广东": ["广州", "深圳", "珠海", "汕头", "佛山", "韶关", "湛江", "肇庆", "江门", "茂名", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"],
  "江苏": ["南京", "苏州", "无锡", "常州", "镇江", "扬州", "泰州", "南通", "盐城", "淮安", "宿迁", "徐州", "连云港"],
  "浙江": ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水"],
  "山东": ["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "临沂", "德州", "聊城", "滨州", "菏泽"],
  "河南": ["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "南阳", "商丘", "信阳", "周口", "驻马店", "济源"],
  "四川": ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝", "甘孜", "凉山"],
  "湖北": ["武汉", "黄石", "十堰", "宜昌", "襄阳", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施", "仙桃", "潜江", "天门", "神农架"],
  "湖南": ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西"],
  "福建": ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"],
  "安徽": ["合肥", "芜湖", "蚌埠", "淮南", "马鞍山", "淮北", "铜陵", "安庆", "黄山", "滁州", "阜阳", "宿州", "六安", "亳州", "池州", "宣城"],
  "河北": ["石家庄", "唐山", "秦皇岛", "邯郸", "邢台", "保定", "张家口", "承德", "沧州", "廊坊", "衡水"],
  "山西": ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
  "陕西": ["西安", "铜川", "宝鸡", "咸阳", "渭南", "延安", "汉中", "榆林", "安康", "商洛"],
  "辽宁": ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  "吉林": ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边"],
  "黑龙江": ["哈尔滨", "齐齐哈尔", "鸡西", "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭"],
  "江西": ["南昌", "景德镇", "萍乡", "九江", "新余", "鹰潭", "赣州", "吉安", "宜春", "抚州", "上饶"],
  "广西": ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"],
  "云南": ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄", "红河", "文山", "西双版纳", "大理", "德宏", "怒江", "迪庆"],
  "贵州": ["贵阳", "六盘水", "遵义", "安顺", "毕节", "铜仁", "黔西南", "黔东南", "黔南"],
  "海南": ["海口", "三亚", "三沙", "儋州", "五指山", "琼海", "文昌", "万宁", "东方", "定安", "屯昌", "澄迈", "临高", "白沙", "昌江", "乐东", "陵水", "保亭", "琼中"],
  "内蒙古": ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒", "阿拉善"],
  "宁夏": ["银川", "石嘴山", "吴忠", "固原", "中卫"],
  "甘肃": ["兰州", "嘉峪关", "金昌", "白银", "天水", "武威", "张掖", "平凉", "酒泉", "庆阳", "定西", "陇南", "临夏", "甘南"],
  "青海": ["西宁", "海东", "海北", "黄南", "海南", "果洛", "玉树", "海西"],
  "新疆": ["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉", "博尔塔拉", "巴音郭楞", "阿克苏", "克孜勒苏", "喀什", "和田", "伊犁", "塔城", "阿勒泰", "石河子", "阿拉尔", "图木舒克", "五家渠", "北屯", "铁门关", "双河", "可克达拉", "昆玉", "胡杨河", "新星", "白杨"],
  "西藏": ["拉萨", "日喀则", "昌都", "林芝", "山南", "那曲", "阿里"],
  "港澳台": ["香港", "澳门", "台北", "新北", "桃园", "台中", "台南", "高雄", "基隆", "新竹", "嘉义"]
};

const jobs = [
  {
    tier: "core",
    title: "腾讯产品运营实习生",
    company: "腾讯 · PCG",
    city: "深圳",
    salary: "200-300/天",
    score: 88,
    reason: "岗位强调用户增长、内容生态和数据复盘，与你的运营实习和AI工具调研经历高度重合。",
    tags: ["技能高度重合", "深圳意向匹配", "内容生态相关"],
    gapTitle: "关键词GAP：数据驱动增长表达不足",
    gapText: "该岗位重视用户增长和数据分析，但简历中“处理数据”的表达过泛，建议补充工具、数据规模、分析动作和业务结果。",
    bars: [90, 84, 88],
    gaps: ["用户增长", "转化漏斗", "SQL", "内容生态"],
    before: "参与用户增长活动，处理数据并完成复盘。",
    after: "围绕用户增长活动搭建转化漏斗，运用 SQL 与 Excel 分析 10w+ 行用户行为数据，定位流失环节并输出复盘建议，推动活动报名转化率提升 15%。"
  },
  {
    tier: "core",
    title: "腾讯用户研究实习生",
    company: "腾讯 · IEG",
    city: "深圳",
    salary: "200-300/天",
    score: 83,
    reason: "问卷调研、竞品分析和结构化表达能力较匹配，适合游戏/社区产品的用户洞察岗位。",
    tags: ["调研能力匹配", "项目可迁移", "需补作品"],
    gapTitle: "关键词GAP：用户洞察方法论不足",
    gapText: "简历有问卷和竞品经历，但缺少样本设计、访谈提纲、洞察结论和产品建议。",
    bars: [86, 80, 84],
    gaps: ["用户访谈", "样本设计", "洞察报告", "产品建议"],
    before: "参与问卷调研和竞品分析。",
    after: "设计并回收 300+ 份用户问卷，结合竞品路径拆解总结3类核心用户需求，输出用户洞察报告并提出2条产品体验优化建议。"
  },
  {
    tier: "safe",
    title: "校园社群运营实习生",
    company: "腾讯云与智慧产业",
    city: "广州",
    salary: "150-200/天",
    score: 90,
    reason: "岗位对社群运营和活动执行要求明确，你已有相关经历，初筛命中率较高。",
    tags: ["命中率较高", "经历直接对应", "保底优先"],
    gapTitle: "关键词GAP：运营指标表达不足",
    gapText: "岗位更关注社群活跃、转化和留存，需要把活动结果写成可衡量指标。",
    bars: [82, 91, 76],
    gaps: ["社群活跃", "留存率", "SOP", "转化路径"],
    before: "维护社群，策划线上活动。",
    after: "负责500+人校园社群日常运营，策划4场线上活动，通过分层触达和话术迭代提升活动到场率18%，沉淀社群运营SOP。"
  },
  {
    tier: "safe",
    title: "商业分析助理实习生",
    company: "腾讯广告",
    city: "上海",
    salary: "200-300/天",
    score: 80,
    reason: "数据复盘与业务分析意识较匹配，但需要补强独立取数和分析报告案例。",
    tags: ["数据能力可迁移", "业务复盘相关", "需补案例"],
    gapTitle: "关键词GAP：独立分析链路不完整",
    gapText: "简历提到SQL基础，但缺少从指标定义、取数分析到业务建议的完整证据链。",
    bars: [76, 78, 74],
    gaps: ["指标口径", "业务洞察", "留存分析", "可视化"],
    before: "使用Excel整理数据并输出分析结果。",
    after: "围绕活动转化指标搭建Excel分析表，拆解渠道、周期和用户分层差异，输出3条运营优化建议并被团队采纳。"
  },
  {
    tier: "explore",
    title: "AI产品经理助理",
    company: "腾讯会议",
    city: "深圳",
    salary: "250-350/天",
    score: 76,
    reason: "你有AI工具调研和竞品分析基础，适合探索产品方向，但需要补充PRD和用户研究作品。",
    tags: ["跨界探索", "AI兴趣契合", "需要作品集"],
    gapTitle: "关键词GAP：产品方法论证据不足",
    gapText: "岗位要求需求分析、原型设计和PRD能力，当前简历更偏运营执行。",
    bars: [74, 70, 86],
    gaps: ["PRD", "需求分析", "原型设计", "用户场景"],
    before: "参与AI工具调研，完成竞品分析。",
    after: "调研8款AI效率工具，拆解核心使用路径和付费转化设计，输出竞品分析报告，并提出2条面向会议协作场景的功能优化建议。"
  },
  {
    tier: "explore",
    title: "招聘运营实习生",
    company: "腾讯人才发展部",
    city: "深圳",
    salary: "150-200/天",
    score: 72,
    reason: "沟通协作和活动组织经验可迁移，但招聘场景证据较少，适合作为探索方向。",
    tags: ["软实力匹配", "职能跨界", "需解释动机"],
    gapTitle: "关键词GAP：招聘流程场景缺失",
    gapText: "简历没有候选人运营、面试安排和招聘漏斗相关描述，需要做迁移包装。",
    bars: [72, 66, 64],
    gaps: ["校园招聘", "候选人运营", "招聘漏斗", "面试安排"],
    before: "负责活动沟通和流程推进。",
    after: "协调活动参与者、讲师和内部团队，完成报名确认、流程提醒和现场执行，可迁移至候选人沟通与招聘流程推进场景。"
  }
];

const els = {
  educationTags: document.querySelector("#educationTags"),
  hardSkills: document.querySelector("#hardSkills"),
  experienceTags: document.querySelector("#experienceTags"),
  softSkills: document.querySelector("#softSkills"),
  jobGrid: document.querySelector("#jobGrid"),
  homeNav: document.querySelector("#homeNav"),
  radarNav: document.querySelector("#radarNav"),
  resumeDiagnosisLink: document.querySelector("#resumeDiagnosisLink"),
  hrNav: document.querySelector("#hrNav"),
  hrConsole: document.querySelector("#hr"),
  tabs: document.querySelectorAll(".tab"),
  statusPill: document.querySelector("#statusPill"),
  startBtn: document.querySelector("#startBtn"),
  chooseResume: document.querySelector("#chooseResume"),
  resumeFile: document.querySelector("#resumeFile"),
  fileStatus: document.querySelector("#fileStatus"),
  uploadDrop: document.querySelector("#uploadDrop"),
  citySelect: document.querySelector("#citySelect"),
  interestSelect: document.querySelector("#interestSelect"),
  salarySelect: document.querySelector("#salarySelect"),
  drawer: document.querySelector("#diagnosis"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  closeDrawer: document.querySelector("#closeDrawer"),
  drawerTitle: document.querySelector("#drawerTitle"),
  drawerScore: document.querySelector("#drawerScore"),
  gapTitle: document.querySelector("#gapTitle"),
  gapText: document.querySelector("#gapText"),
  gapTags: document.querySelector("#gapTags"),
  beforeText: document.querySelector("#beforeText"),
  afterText: document.querySelector("#afterText"),
  copyBtn: document.querySelector("#copyBtn"),
  skillBar: document.querySelector("#skillBar"),
  projectBar: document.querySelector("#projectBar"),
  industryBar: document.querySelector("#industryBar"),
  profileSummary: document.querySelector("#profileSummary"),
  openLogin: document.querySelector("#openLogin"),
  logoutBtn: document.querySelector("#logoutBtn"),
  loginModal: document.querySelector("#loginModal"),
  loginBackdrop: document.querySelector("#loginBackdrop"),
  closeLogin: document.querySelector("#closeLogin"),
  roleTabs: document.querySelectorAll(".role-tab"),
  loginTabs: document.querySelectorAll(".login-tab"),
  loginContent: document.querySelector("#loginContent"),
  hrDrop: document.querySelector("#hrDrop"),
  simulateUpload: document.querySelector("#simulateUpload"),
  jobDataFile: document.querySelector("#jobDataFile"),
  jobUploadStatus: document.querySelector("#jobUploadStatus"),
  confirmJobUpload: document.querySelector("#confirmJobUpload"),
  viewAllJobs: document.querySelector("#viewAllJobs"),
  allJobsPanel: document.querySelector("#allJobsPanel"),
  allJobsList: document.querySelector("#allJobsList"),
  allJobsCount: document.querySelector("#allJobsCount"),
  selectAllJobs: document.querySelector("#selectAllJobs"),
  deleteSelectedJobs: document.querySelector("#deleteSelectedJobs"),
  selectedJobCount: document.querySelector("#selectedJobCount"),
  jobNameFilter: document.querySelector("#jobNameFilter"),
  jobDepartmentFilter: document.querySelector("#jobDepartmentFilter"),
  jobBaseFilter: document.querySelector("#jobBaseFilter"),
  resetJobFilters: document.querySelector("#resetJobFilters"),
  parseJd: document.querySelector("#parseJd"),
  jdTitleInput: document.querySelector("#jdTitleInput"),
  jdSalaryInput: document.querySelector("#jdSalaryInput"),
  jdCityInput: document.querySelector("#jdCityInput"),
  jobCount: document.querySelector("#jobCount"),
  hrJobTable: document.querySelector("#hrJobTable"),
  hero: document.querySelector(".hero"),
  heroGrid: document.querySelector(".hero-grid"),
  uploadCard: document.querySelector(".upload-card"),
  reasonsSection: document.querySelector("#homeReasons"),
  workspace: document.querySelector("#radar"),
  diagnosisPanel: document.querySelector("#resume-diagnosis"),
  diagnosisFile: document.querySelector("#diagnosisFile"),
  chooseDiagnosisResume: document.querySelector("#chooseDiagnosisResume"),
  runDiagnosis: document.querySelector("#runDiagnosis"),
  diagnosisStatus: document.querySelector("#diagnosisStatus"),
  diagnosisFileStatus: document.querySelector("#diagnosisFileStatus"),
  resumeReport: document.querySelector("#resumeReport"),
  resumeReportScore: document.querySelector("#resumeReportScore"),
  keywordTags: document.querySelector("#keywordTags"),
  starSummary: document.querySelector("#starSummary"),
  tencentFitAdvice: document.querySelector("#tencentFitAdvice"),
  resumeRewriteBefore: document.querySelector("#resumeRewriteBefore"),
  resumeRewriteAfter: document.querySelector("#resumeRewriteAfter")
};

let activeTier = "core";
let activeJob = jobs[0];
let hasParsedResume = false;
let selectedResumeFile = null;
let loginIntent = "student";
const auth = { student: false, hr: false, activeRole: null };
const API_BASE_URL = "http://127.0.0.1:8010";
let pendingJobUpload = null;
let jobIdSeed = 3;
const selectedJobIds = new Set();
const hrJobRecords = [
  { id: "job-1", title: "PCG 产品运营实习生", department: "PCG", city: "深圳", salary: "200-300/天", skills: "用户增长、数据复盘", status: "已解析", source: "系统示例" },
  { id: "job-2", title: "IEG 用户研究实习生", department: "IEG", city: "深圳", salary: "200-300/天", skills: "问卷调研、用户洞察", status: "已解析", source: "系统示例" },
  { id: "job-3", title: "腾讯广告 商业分析助理", department: "腾讯广告", city: "上海", salary: "200-300/天", skills: "Excel、业务分析", status: "待校验", source: "系统示例" }
];

function normalized(text) {
  return String(text || "").trim().toLowerCase();
}

function getFilteredJobs() {
  const nameKeyword = normalized(els.jobNameFilter.value);
  const departmentKeyword = normalized(els.jobDepartmentFilter.value);
  const baseKeyword = normalized(els.jobBaseFilter.value);
  return hrJobRecords.filter((job) => {
    const matchName = !nameKeyword || normalized(job.title).includes(nameKeyword);
    const matchDepartment = !departmentKeyword || normalized(job.department).includes(departmentKeyword);
    const matchBase = !baseKeyword || normalized(job.city).includes(baseKeyword);
    return matchName && matchDepartment && matchBase;
  });
}

function populateCitySelect() {
  const selectedCity = "深圳";
  els.citySelect.innerHTML = Object.entries(chinaCityGroups).map(([group, cities]) => `
    <optgroup label="${group}">
      ${cities.map((city) => `<option value="${city}"${city === selectedCity ? " selected" : ""}>${city}</option>`).join("")}
    </optgroup>
  `).join("");
}

function renderTags(container, tags) {
  container.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
}

function adjustedScore(job) {
  let score = job.score;
  if (job.city === els.citySelect.value) score += 3;
  if (els.salarySelect.value === job.salary) score += 2;
  if (els.interestSelect.value.includes("数据") && job.title.includes("分析")) score += 4;
  if (els.interestSelect.value.includes("产品") && job.title.includes("产品")) score += 4;
  return Math.min(96, score);
}

function renderJobs() {
  const currentJobs = jobs
    .filter((job) => job.tier === activeTier)
    .map((job) => ({ ...job, originalIndex: jobs.indexOf(job), adjusted: adjustedScore(job) }))
    .sort((a, b) => b.adjusted - a.adjusted);

  els.jobGrid.innerHTML = currentJobs
    .map((job) => {
      const tierLabel = { core: "核心推荐", safe: "稳妥保底", explore: "跨界探索" }[job.tier];
      return `
        <article class="job-card">
          <div>
            <h3>${job.title}</h3>
            <p>${job.company} · ${job.city} · ${job.salary}</p>
            <p>${job.reason}</p>
            <div class="job-tags"><span>${tierLabel}</span>${job.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          </div>
          <div class="job-actions">
            <div class="match-percent">${job.adjusted}%</div>
            <button class="diagnose-btn" type="button" data-job="${job.originalIndex}">一键诊断</button>
          </div>
        </article>
      `;
    })
    .join("");

  const tierName = document.querySelector(".tab.active").textContent;
  els.statusPill.textContent = `${tierName} · ${currentJobs.length} 个重点岗位`;
}

function bestMatchedJob() {
  return jobs.map((job) => ({ ...job, adjusted: adjustedScore(job) })).sort((a, b) => b.adjusted - a.adjusted)[0];
}

function resumeRewriteFor(job) {
  if (!hasParsedResume) {
    return { before: job.before, after: job.after, gapTitle: job.gapTitle, gapText: job.gapText };
  }

  if (job.title.includes("产品运营")) {
    return {
      before: "负责用户增长活动、竞品分析和数据复盘。",
      after: "围绕用户增长目标策划并推进活动运营，结合竞品分析拆解内容生态玩法，使用 SQL 与 Excel 复盘转化漏斗，定位关键流失环节并输出优化建议，推动活动报名转化率提升 15%。",
      gapTitle: "基于上传简历生成：增长运营经历需要更量化",
      gapText: "你的简历已经包含用户增长、竞品分析和数据复盘关键词，但缺少数据规模、分析工具、转化指标和业务结果，建议用“动作 + 工具 + 指标 + 结果”重写。"
    };
  }

  return {
    before: job.before,
    after: job.after,
    gapTitle: `基于上传简历生成：${job.gapTitle.replace("关键词GAP：", "")}`,
    gapText: `${job.gapText} 系统已结合上传简历中的学历、硬技能、实习经历和软实力，生成更贴合该岗位JD的改写方向。`
  };
}

function openDrawer(job) {
  const rewrite = resumeRewriteFor(job);
  activeJob = { ...job, after: rewrite.after };
  els.drawerTitle.textContent = job.title;
  els.drawerScore.textContent = `${adjustedScore(job)}%`;
  els.gapTitle.textContent = rewrite.gapTitle;
  els.gapText.textContent = rewrite.gapText;
  els.gapTags.innerHTML = job.gaps.map((tag) => `<span class="missing">${tag}</span>`).join("");
  els.beforeText.textContent = rewrite.before;
  els.afterText.textContent = rewrite.after;
  els.skillBar.style.setProperty("--value", `${job.bars[0]}%`);
  els.projectBar.style.setProperty("--value", `${job.bars[1]}%`);
  els.industryBar.style.setProperty("--value", `${job.bars[2]}%`);
  els.drawer.classList.add("open");
  els.drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.drawer.classList.remove("open");
  els.drawer.setAttribute("aria-hidden", "true");
}

function activeLoginRole() {
  return document.querySelector(".role-tab.active").dataset.role;
}

function activeLoginType() {
  return document.querySelector(".login-tab.active").dataset.login;
}

function selectRole(role) {
  els.roleTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.role === role));
}

function setNavForRole(role) {
  document.querySelectorAll(".topbar nav a").forEach((link) => {
    const isStudentLink = link.id === "homeNav" || link.id === "radarNav" || link.id === "resumeDiagnosisLink";
    const isHrLink = link.id === "hrNav";

    if (role === "student") {
      link.hidden = !isStudentLink;
    } else if (role === "hr") {
      link.hidden = !isHrLink;
    } else {
      link.hidden = false;
    }
  });
}

function setActiveNav(activeLink) {
  document.querySelectorAll(".topbar nav a").forEach((link) => link.classList.remove("active-nav"));
  if (activeLink) activeLink.classList.add("active-nav");
}

function showHomeView() {
  els.hero.classList.remove("compact-mode");
  els.heroGrid.hidden = false;
  els.uploadCard.hidden = true;
  els.reasonsSection.hidden = false;
  els.workspace.hidden = true;
  els.diagnosisPanel.hidden = true;
  els.hrConsole.hidden = true;
  setActiveNav(els.homeNav);
}

function showStudentView() {
  els.hero.classList.remove("compact-mode");
  els.heroGrid.hidden = false;
  els.uploadCard.hidden = false;
  els.reasonsSection.hidden = true;
  els.workspace.hidden = false;
  els.diagnosisPanel.hidden = true;
  els.hrConsole.hidden = true;
  setActiveNav(els.radarNav);
}

function showDiagnosisView() {
  els.hero.classList.add("compact-mode");
  els.heroGrid.hidden = true;
  els.uploadCard.hidden = true;
  els.reasonsSection.hidden = true;
  els.workspace.hidden = true;
  els.diagnosisPanel.hidden = false;
  els.hrConsole.hidden = true;
  setActiveNav(els.resumeDiagnosisLink);
  if (hasParsedResume) renderResumeDiagnosis();
  els.diagnosisPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showHrView() {
  els.hero.classList.add("compact-mode");
  els.heroGrid.hidden = true;
  els.uploadCard.hidden = true;
  els.reasonsSection.hidden = true;
  els.workspace.hidden = true;
  els.diagnosisPanel.hidden = true;
  els.hrConsole.hidden = false;
  setActiveNav(els.hrNav);
  els.hrConsole.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateAuthUi() {
  if (auth.activeRole === "student") {
    els.openLogin.textContent = "学生已登录";
    els.openLogin.hidden = false;
    els.logoutBtn.hidden = false;
    els.uploadDrop.classList.remove("locked");
    if (!hasParsedResume) els.fileStatus.textContent = "学生端已登录，可上传 Word/PDF 简历";
    setNavForRole("student");
    showStudentView();
    return;
  }

  if (auth.activeRole === "hr") {
    els.openLogin.textContent = "HR已登录";
    els.openLogin.hidden = false;
    els.logoutBtn.hidden = false;
    els.uploadDrop.classList.add("locked");
    if (!hasParsedResume) els.fileStatus.textContent = "请切换学生端登录后上传简历";
    setNavForRole("hr");
    showHrView();
    return;
  }

  els.openLogin.textContent = "登录";
  els.openLogin.hidden = false;
  els.logoutBtn.hidden = true;
  els.uploadDrop.classList.add("locked");
  els.fileStatus.textContent = "请先登录学生端，再上传 Word/PDF 简历";
  setNavForRole(null);
  showHomeView();
}

function requireRole(role, message) {
  if (auth[role]) {
    const shouldRefreshView = auth.activeRole !== role;
    auth.activeRole = role;
    if (shouldRefreshView) updateAuthUi();
    return true;
  }
  loginIntent = role;
  selectRole(role);
  renderLogin(activeLoginType());
  els.fileStatus.textContent = message;
  openLogin(role);
  return false;
}

function finishLogin() {
  const role = activeLoginRole();
  auth[role] = true;
  auth.activeRole = role;
  closeLogin();
  updateAuthUi();
}

function logout() {
  auth.student = false;
  auth.hr = false;
  auth.activeRole = null;
  loginIntent = "student";
  closeLogin();
  updateAuthUi();
}

function renderLogin(type) {
  const role = activeLoginRole();
  const roleName = role === "hr" ? "HR端" : "学生端";
  const methodName = { wechat: "微信", phone: "手机号", qq: "QQ", email: "邮箱" }[type];
  const helperText = role === "hr"
    ? "登录后可管理岗位库、上传JD和配置推荐规则。"
    : "登录后可上传简历、生成画像和查看诊断建议。";

  const templates = {
    wechat: `
      <div class="qr-login">
        <div class="qr-box">微信扫码</div>
        <strong>使用微信登录${roleName}</strong>
        <p>${helperText}</p>
        <button class="login-submit" type="button" data-login-submit>模拟扫码成功</button>
      </div>
    `,
    phone: `
      <form class="login-form">
        <label>手机号<input type="tel" placeholder="请输入手机号" /></label>
        <label>验证码<input type="text" placeholder="请输入短信验证码" /></label>
        <button class="login-submit" type="button" data-login-submit>登录${roleName}</button>
      </form>
    `,
    qq: `
      <form class="login-form">
        <label>QQ号<input type="text" placeholder="请输入QQ号" /></label>
        <label>密码<input type="password" placeholder="请输入密码" /></label>
        <button class="login-submit" type="button" data-login-submit>登录${roleName}</button>
      </form>
    `,
    email: `
      <form class="login-form">
        <label>邮箱<input type="email" placeholder="请输入邮箱" /></label>
        <label>密码<input type="password" placeholder="请输入密码" /></label>
        <button class="login-submit" type="button" data-login-submit>登录${roleName}</button>
      </form>
    `
  };

  els.loginContent.innerHTML = `${templates[type]}<p class="login-note">当前选择：${roleName} · ${methodName}</p>`;
}

function openLogin(role = loginIntent) {
  selectRole(role);
  els.loginModal.classList.add("open");
  els.loginModal.setAttribute("aria-hidden", "false");
  renderLogin(activeLoginType());
}

function closeLogin() {
  els.loginModal.classList.remove("open");
  els.loginModal.setAttribute("aria-hidden", "true");
}

function renderResumeDiagnosis(apiData = null) {
  const diagnosis = apiData?.diagnosis || {};
  els.resumeReport.hidden = false;
  els.diagnosisStatus.textContent = diagnosis.mode === "openai" ? "AI诊断报告已生成" : "解析完成，已生成本地诊断";
  els.diagnosisFileStatus.textContent = selectedResumeFile ? `已解析：${selectedResumeFile.name}` : "已基于示例简历生成诊断";

  if (!apiData) return;

  els.resumeReportScore.textContent = `${diagnosis.score || 82}%`;
  const educationKeywords = diagnosis.education_keywords || [];
  const languageKeywords = diagnosis.language_keywords || [];
  const coveredKeywords = diagnosis.keyword_covered || [];
  const missingKeywords = diagnosis.keyword_missing || [];
  const renderTagList = (items, prefix = "") => items.map((item) => `<span>${prefix}${item}</span>`).join("");
  els.keywordTags.innerHTML = `
    <section>
      <h4>教育背景 / 语言能力</h4>
      <div class="report-tags neutral">
        ${renderTagList(educationKeywords, "教育背景：")}
        ${renderTagList(languageKeywords, "语言能力：")}
      </div>
    </section>
    <section>
      <h4>已覆盖</h4>
      <div class="report-tags covered">${renderTagList(coveredKeywords)}</div>
    </section>
    <section>
      <h4>待加强</h4>
      <div class="report-tags missing">${renderTagList(missingKeywords)}</div>
    </section>
  `;
  renderStarSummary(diagnosis);
  els.tencentFitAdvice.textContent = diagnosis.tencent_fit_advice || "建议突出与腾讯校招岗位相关的用户洞察、数据复盘、协作推进和业务结果。";
  els.resumeRewriteBefore.textContent = diagnosis.rewrite_before || "负责项目运营和数据分析，参与活动复盘。";
  els.resumeRewriteAfter.textContent = diagnosis.rewrite_after || "围绕用户增长目标推进项目运营，使用 Excel/SQL 分析用户行为数据，定位转化流失环节并推动活动优化。";
}

function parseStarSummary(starSummary = "") {
  const fallback = {
    situation: "面向目标岗位相关任务。",
    task: "承担项目推进与结果交付。",
    action: "使用数据分析、沟通协作和复盘方法解决问题。",
    result: "形成可量化结果或可复用经验。"
  };
  const patterns = {
    situation: /S[：:]\s*(.*?)(?=；\s*T[：:]|;\s*T[：:]|$)/,
    task: /T[：:]\s*(.*?)(?=；\s*A[：:]|;\s*A[：:]|$)/,
    action: /A[：:]\s*(.*?)(?=；\s*R[：:]|;\s*R[：:]|$)/,
    result: /R[：:]\s*(.*)$/
  };
  return Object.fromEntries(
    Object.entries(patterns).map(([key, pattern]) => {
      const match = starSummary.match(pattern);
      return [key, match?.[1]?.trim() || fallback[key]];
    })
  );
}

function renderStarSummary(diagnosis) {
  const starParts = diagnosis.star_parts || parseStarSummary(diagnosis.star_summary);
  const items = [
    ["S", "情境", starParts.situation],
    ["T", "任务", starParts.task],
    ["A", "行动", starParts.action],
    ["R", "结果", starParts.result]
  ];
  els.starSummary.innerHTML = items.map(([letter, label, text]) => `
    <section>
      <strong>${letter}</strong>
      <span>${label}</span>
      <p>${text || "待补充"}</p>
    </section>
  `).join("");
}

function scrollToResumeReport() {
  window.setTimeout(() => {
    els.resumeReport.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

async function analyzeResumeFile(file) {
  if (!file) {
    renderResumeDiagnosis();
    scrollToResumeReport();
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  els.diagnosisStatus.textContent = "正在上传并解析简历...";
  els.diagnosisFileStatus.textContent = `正在处理：${file.name}`;
  els.resumeReport.hidden = true;

  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze-resume`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "简历解析失败");
    }
    hasParsedResume = true;
    renderResumeDiagnosis(data);
    scrollToResumeReport();
  } catch (error) {
    els.diagnosisStatus.textContent = "解析失败";
    els.diagnosisFileStatus.textContent = error.message || "请确认 FastAPI 服务已启动";
  }
}

function simulateParse() {
  els.statusPill.textContent = "AI正在解析简历...";
  els.uploadDrop.classList.add("dragging");
  if (els.diagnosisStatus) els.diagnosisStatus.textContent = "正在解析简历...";
  window.setTimeout(() => {
    hasParsedResume = true;
    els.profileSummary.textContent = "已识别出产品/运营主线、数据分析辅助能力和AI应用兴趣，建议优先投递腾讯产品运营、用户研究和AI产品助理岗位。";
    renderTags(els.educationTags, parsedProfile.educationTags);
    renderTags(els.hardSkills, parsedProfile.hardSkills);
    renderTags(els.experienceTags, parsedProfile.experienceTags);
    renderTags(els.softSkills, parsedProfile.softSkills);
    els.uploadDrop.classList.remove("dragging");
    renderJobs();
    if (els.diagnosisPanel && !els.diagnosisPanel.hidden) renderResumeDiagnosis();
  }, 600);
}

function handleResumeFile(file) {
  if (!file) return;
  if (!requireRole("student", "请先登录学生端，再上传 Word/PDF 简历")) return;
  const allowed = [".pdf", ".doc", ".docx"];
  const fileName = file.name.toLowerCase();
  const isAllowed = allowed.some((suffix) => fileName.endsWith(suffix));
  if (!isAllowed) {
    selectedResumeFile = null;
    els.fileStatus.textContent = "请上传 PDF、DOC 或 DOCX 格式的简历";
    return;
  }
  selectedResumeFile = file;
  els.fileStatus.textContent = `已选择：${file.name}`;
  simulateParse();
}

function handleDiagnosisFile(file) {
  if (!file) return;
  if (!requireRole("student", "请先登录学生端，再上传 Word/PDF 简历")) return;
  const allowed = [".pdf", ".doc", ".docx"];
  const fileName = file.name.toLowerCase();
  const isAllowed = allowed.some((suffix) => fileName.endsWith(suffix));
  if (!isAllowed) {
    selectedResumeFile = null;
    els.diagnosisFileStatus.textContent = "请上传 PDF、DOC 或 DOCX 格式的简历";
    els.diagnosisStatus.textContent = "文件格式不支持";
    return;
  }
  selectedResumeFile = file;
  els.diagnosisFileStatus.textContent = `已选择：${file.name}`;
  els.diagnosisStatus.textContent = "已选择简历，点击生成诊断结果后开始解析";
  els.resumeReport.hidden = true;
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    els.tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    activeTier = tab.dataset.tier;
    renderJobs();
  });
});

els.jobGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-job]");
  if (!button) return;
  openDrawer(jobs[Number(button.dataset.job)]);
});

els.homeNav.addEventListener("click", (event) => {
  event.preventDefault();
  showHomeView();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

els.radarNav.addEventListener("click", (event) => {
  event.preventDefault();
  if (!requireRole("student", "请先登录学生端，再查看岗位雷达")) return;
  showStudentView();
  els.workspace.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.resumeDiagnosisLink.addEventListener("click", (event) => {
  event.preventDefault();
  if (!requireRole("student", "请先登录学生端，再使用简历诊断")) return;
  showDiagnosisView();
});

els.hrNav.addEventListener("click", (event) => {
  event.preventDefault();
  if (!requireRole("hr", "请先登录HR端，再查看内部岗位数据管理")) return;
  els.hrConsole.hidden = false;
  els.hrConsole.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".topbar nav a:not(#homeNav):not(#radarNav):not(#hrNav):not(#resumeDiagnosisLink)").forEach((link) => {
  link.addEventListener("click", () => {
    if (els.hrConsole) els.hrConsole.hidden = true;
  });
});

["dragenter", "dragover"].forEach((name) => {
  els.uploadDrop.addEventListener(name, (event) => {
    event.preventDefault();
    els.uploadDrop.classList.add("dragging");
  });
});

["dragleave", "drop"].forEach((name) => {
  els.uploadDrop.addEventListener(name, (event) => {
    event.preventDefault();
    els.uploadDrop.classList.remove("dragging");
  });
});

els.uploadDrop.addEventListener("drop", (event) => {
  handleResumeFile(event.dataTransfer.files[0]);
});

els.chooseResume.addEventListener("click", (event) => {
  if (!requireRole("student", "请先登录学生端，再上传 Word/PDF 简历")) {
    event.preventDefault();
    return;
  }
  els.resumeFile.click();
});

els.resumeFile.addEventListener("change", () => {
  handleResumeFile(els.resumeFile.files[0]);
});

if (els.chooseDiagnosisResume) {
  els.chooseDiagnosisResume.addEventListener("click", (event) => {
    if (!requireRole("student", "请先登录学生端，再上传 Word/PDF 简历")) {
      event.preventDefault();
      return;
    }
    els.diagnosisFile.click();
  });
}

if (els.diagnosisFile) {
  els.diagnosisFile.addEventListener("change", () => {
    handleDiagnosisFile(els.diagnosisFile.files[0]);
  });
}

if (els.runDiagnosis) {
  els.runDiagnosis.addEventListener("click", () => {
    if (!requireRole("student", "请先登录学生端，再生成简历诊断")) return;
    if (!selectedResumeFile && !hasParsedResume) {
      els.diagnosisFileStatus.textContent = "请先选择 PDF、DOC 或 DOCX 简历文件";
      els.diagnosisStatus.textContent = "等待上传简历";
      return;
    }
    if (hasParsedResume && !selectedResumeFile) {
      renderResumeDiagnosis();
      scrollToResumeReport();
      return;
    }
    analyzeResumeFile(selectedResumeFile);
  });
}

els.startBtn.addEventListener("click", () => {
  if (!requireRole("student", "请先登录学生端，再生成求职画像")) return;
  if (!selectedResumeFile) {
    els.fileStatus.textContent = "请先选择 PDF、DOC 或 DOCX 简历文件";
    return;
  }
  simulateParse();
});

els.citySelect.addEventListener("change", renderJobs);
els.interestSelect.addEventListener("change", renderJobs);
els.salarySelect.addEventListener("change", renderJobs);
els.closeDrawer.addEventListener("click", closeDrawer);
els.drawerBackdrop.addEventListener("click", closeDrawer);
els.openLogin.addEventListener("click", () => openLogin(auth.activeRole || loginIntent));
els.logoutBtn.addEventListener("click", logout);
els.closeLogin.addEventListener("click", closeLogin);
els.loginBackdrop.addEventListener("click", closeLogin);

els.roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectRole(tab.dataset.role);
    renderLogin(activeLoginType());
  });
});

els.loginTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    els.loginTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderLogin(tab.dataset.login);
  });
});

els.loginContent.addEventListener("click", (event) => {
  if (event.target.closest("[data-login-submit]")) finishLogin();
});

if (els.hrDrop) {
  ["dragenter", "dragover"].forEach((name) => {
    els.hrDrop.addEventListener(name, (event) => {
      event.preventDefault();
      els.hrDrop.classList.add("active");
    });
  });
  ["dragleave", "drop"].forEach((name) => {
    els.hrDrop.addEventListener(name, (event) => {
      event.preventDefault();
      els.hrDrop.classList.remove("active");
    });
  });
  els.hrDrop.addEventListener("click", () => {
    els.jobDataFile.click();
  });
  els.hrDrop.addEventListener("drop", (event) => {
    handleJobDataFile(event.dataTransfer.files[0]);
  });
}

if (els.simulateUpload) {
  els.simulateUpload.addEventListener("click", () => {
    els.jobDataFile.click();
  });
}

if (els.jobDataFile) {
  els.jobDataFile.addEventListener("change", () => {
    handleJobDataFile(els.jobDataFile.files[0]);
  });
}

function estimateJobRowsFromCsv(text) {
  return text.split(/\r?\n/).filter((line) => line.trim()).length > 1
    ? text.split(/\r?\n/).filter((line) => line.trim()).length - 1
    : 1;
}

function createImportedJobRecords(fileName, rowCount, importTime) {
  return Array.from({ length: rowCount }, (_, index) => ({
    id: `job-${++jobIdSeed}`,
    title: rowCount === 1 ? fileName.replace(/\.(xlsx|xls|csv)$/i, "") : `${fileName.replace(/\.(xlsx|xls|csv)$/i, "")} · 岗位${index + 1}`,
    department: "批量导入",
    city: "待解析",
    salary: "待维护",
    skills: "待AI解析",
    status: "已入库",
    source: fileName,
    importTime
  }));
}

function updateSelectedJobUi() {
  const selectedCount = selectedJobIds.size;
  const filteredJobs = getFilteredJobs();
  els.selectedJobCount.textContent = `已选择 ${selectedCount} 个岗位`;
  const filteredSelectedCount = filteredJobs.filter((job) => selectedJobIds.has(job.id)).length;
  els.selectAllJobs.checked = filteredJobs.length > 0 && filteredSelectedCount === filteredJobs.length;
  els.selectAllJobs.indeterminate = filteredSelectedCount > 0 && filteredSelectedCount < filteredJobs.length;
}

function renderHrJobTable() {
  const filteredJobs = getFilteredJobs();
  els.hrJobTable.innerHTML = filteredJobs.map((job) => `
    <li data-job-id="${job.id}">
      <input class="job-select" type="checkbox" data-job-id="${job.id}" ${selectedJobIds.has(job.id) ? "checked" : ""} />
      <span>${job.title}</span>
      <small>${job.department} · ${job.city} · ${job.salary}</small>
      <em>${job.status}</em>
    </li>
  `).join("") || "<li class=\"empty-job-row\"><span>没有匹配的岗位</span><small>请调整筛选条件</small><em>空</em></li>";
  els.jobCount.textContent = String(hrJobRecords.length);
  updateSelectedJobUi();
}

function renderAllJobsPanel() {
  const filteredJobs = getFilteredJobs();
  els.allJobsCount.textContent = `当前展示 ${filteredJobs.length} 条 / 共 ${hrJobRecords.length} 条`;
  els.allJobsList.innerHTML = filteredJobs.map((job) => `
    <article data-job-id="${job.id}" class="${selectedJobIds.has(job.id) ? "selected-row" : ""}">
      <strong>${job.title}</strong>
      <p>${job.department} · ${job.city} · ${job.salary}</p>
      <p>技能关键词：${job.skills}</p>
      <small>${job.source}${job.importTime ? ` · ${job.importTime}` : ""}</small>
      <em>${job.status}</em>
    </article>
  `).join("") || "<article><strong>没有匹配的岗位</strong><p>请调整岗位名称、事业部或BASE地点筛选条件。</p><p></p><small></small><em>空</em></article>";
}

function refreshJobViews() {
  renderHrJobTable();
  if (!els.allJobsPanel.hidden) renderAllJobsPanel();
}

function handleJobDataFile(file) {
  if (!file) return;
  if (!requireRole("hr", "请先登录HR端，再上传岗位数据")) return;

  const fileName = file.name.toLowerCase();
  const isCsv = fileName.endsWith(".csv");
  const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
  if (!isCsv && !isExcel) {
    els.jobUploadStatus.textContent = "请上传 Excel（.xlsx/.xls）或 CSV 岗位表";
    return;
  }

  els.jobUploadStatus.textContent = `正在预解析：${file.name}`;
  const finishPreview = (rowCount) => {
    pendingJobUpload = { file, rowCount };
    els.jobUploadStatus.textContent = `待确认：${file.name} · 预计 ${rowCount} 个岗位`;
    els.confirmJobUpload.disabled = false;
    els.simulateUpload.textContent = "重新选择岗位表";
  };

  if (isCsv) {
    const reader = new FileReader();
    reader.onload = () => finishPreview(estimateJobRowsFromCsv(String(reader.result || "")));
    reader.onerror = () => {
      els.jobUploadStatus.textContent = "CSV 读取失败，请检查文件格式";
    };
    reader.readAsText(file, "utf-8");
    return;
  }

  const estimatedRows = Math.max(1, Math.round(file.size / 1200));
  finishPreview(estimatedRows);
}

if (els.confirmJobUpload) {
  els.confirmJobUpload.addEventListener("click", () => {
    if (!pendingJobUpload) {
      els.jobUploadStatus.textContent = "请先选择 Excel / CSV 岗位表";
      return;
    }
    const { file, rowCount } = pendingJobUpload;
    const importTime = new Date().toLocaleString("zh-CN", { hour12: false });
    hrJobRecords.unshift(...createImportedJobRecords(file.name, rowCount, importTime));
    pendingJobUpload = null;
    els.confirmJobUpload.disabled = true;
    els.jobUploadStatus.textContent = `已确认上传：${file.name} · ${rowCount} 个岗位`;
    els.simulateUpload.textContent = "继续上传岗位表";
    refreshJobViews();
  });
}

if (els.viewAllJobs) {
  els.viewAllJobs.addEventListener("click", () => {
    els.allJobsPanel.hidden = !els.allJobsPanel.hidden;
    els.viewAllJobs.textContent = els.allJobsPanel.hidden ? "查看全部岗位信息" : "收起全部岗位信息";
    if (!els.allJobsPanel.hidden) renderAllJobsPanel();
  });
}

if (els.hrJobTable) {
  els.hrJobTable.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".job-select");
    if (!checkbox) return;
    if (checkbox.checked) selectedJobIds.add(checkbox.dataset.jobId);
    else selectedJobIds.delete(checkbox.dataset.jobId);
    updateSelectedJobUi();
    if (!els.allJobsPanel.hidden) renderAllJobsPanel();
  });
}

if (els.selectAllJobs) {
  els.selectAllJobs.addEventListener("change", () => {
    const filteredJobs = getFilteredJobs();
    filteredJobs.forEach((job) => selectedJobIds.delete(job.id));
    if (els.selectAllJobs.checked) {
      filteredJobs.forEach((job) => selectedJobIds.add(job.id));
    }
    refreshJobViews();
  });
}

if (els.deleteSelectedJobs) {
  els.deleteSelectedJobs.addEventListener("click", () => {
    if (selectedJobIds.size === 0) {
      els.selectedJobCount.textContent = "请先选择要删除的岗位";
      return;
    }
    for (let index = hrJobRecords.length - 1; index >= 0; index -= 1) {
      if (selectedJobIds.has(hrJobRecords[index].id)) hrJobRecords.splice(index, 1);
    }
    selectedJobIds.clear();
    refreshJobViews();
  });
}

[els.jobNameFilter, els.jobDepartmentFilter, els.jobBaseFilter].forEach((input) => {
  input.addEventListener("input", refreshJobViews);
});

if (els.resetJobFilters) {
  els.resetJobFilters.addEventListener("click", () => {
    els.jobNameFilter.value = "";
    els.jobDepartmentFilter.value = "";
    els.jobBaseFilter.value = "";
    refreshJobViews();
  });
}

if (els.parseJd) {
  els.parseJd.addEventListener("click", () => {
    const title = els.jdTitleInput.value.trim() || "新增岗位";
    const city = els.jdCityInput.value;
    const salary = els.jdSalaryInput.value.trim();
    hrJobRecords.unshift({
      id: `job-${++jobIdSeed}`,
      title,
      department: "单个录入",
      city,
      salary,
      skills: "SQL、数据复盘、用户增长",
      status: "已解析",
      source: "手动录入",
      importTime: new Date().toLocaleString("zh-CN", { hour12: false })
    });
    refreshJobViews();
    els.parseJd.textContent = "已解析并入库";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
    closeLogin();
  }
});

els.copyBtn.addEventListener("click", async () => {
  const fallbackCopy = () => {
    const helper = document.createElement("textarea");
    helper.value = activeJob.after;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  };

  try {
    if (navigator.clipboard) await navigator.clipboard.writeText(activeJob.after);
    else fallbackCopy();
  } catch {
    fallbackCopy();
  }

  els.copyBtn.textContent = "已复制";
  window.setTimeout(() => {
    els.copyBtn.textContent = "一键复制优化文案";
  }, 1200);
});

populateCitySelect();
renderHrJobTable();
renderTags(els.educationTags, profile.educationTags);
renderTags(els.hardSkills, profile.hardSkills);
renderTags(els.experienceTags, profile.experienceTags);
renderTags(els.softSkills, profile.softSkills);
renderJobs();
renderLogin("wechat");
updateAuthUi();
