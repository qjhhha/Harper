const navItems = [
  ["⌂", "首页", false],
  ["▣", "待办任务中心", true],
  ["◎", "渠道管理", true],
  ["☰", "进件管理", true],
  ["▣", "材料归档管理", true],
  ["▣", "档案借/出库管理", true],
  ["▥", "台账管理", true],
  ["◓", "财务管理", true],
  ["◓", "费用管理", true],
  ["￥", "还款管理", true],
  ["⌁", "租后管理", true],
  ["▦", "客诉管理", true],
  ["⌁", "诉讼管理", true],
  ["▥", "报表中心", true],
  ["⌂", "合规预警管理", true],
  ["▦", "合规维护管理", true],
  ["▤", "文件用印管理（纸质）", true],
  ["▤", "通用合同签署（电子）", true],
];

const stepLabels = ["发起申请", "自动取数", "规则校验", "合规复核", "主管审批", "财务回传"];

const invoiceTypeOptions = ["租金发票", "过户发票", "滞纳金发票", "服务费发票", "自定义"];

const invoiceProjects = [
  ["直营月租金", "台账/还款", true],
  ["回租租金收益", "台账/还款", true],
  ["GPS管理费", "进件-合同费用", true],
  ["公证费", "进件-合同费用", true],
  ["滞纳金", "费用入账/结清", true],
  ["名义货价", "租后-结清", false],
  ["提前还款手续费", "租后-结清", true],
  ["结清多款", "租后-结清", false],
  ["结清过户费", "租后-结清", false],
  ["结清违约金", "租后-结清", false],
  ["结清律师费", "租后-结清", false],
  ["结清保全费", "租后-结清", false],
  ["结清诉讼费", "租后-结清", false],
  ["结清保函费", "租后-结清", false],
  ["结清其他费", "租后-结清", false],
  ["结清其他法律事务费", "租后-结清", false],
];

const sourceRows = [
  ["进件查询-合同信息", "客户名称", "张某某", "开票客户信息"],
  ["进件查询-合同信息", "身份证号码/统一征信代码", "3502**********4816", "个人取身份证号；公司户取统一征信代码"],
  ["进件查询-车辆信息", "车架号EBS", "LGBH52E08RY202605", "车架号/EBS"],
  ["进件查询-合同费用", "GPS管理费", "1980 / 1000 / 200", "按金额拆主体"],
  ["费用入账/结清申请", "滞纳金", "126.00", "已实收、已去重"],
];

const subjectRows = [
  ["金象", "金象", "金象业务直接按金象主体开票"],
  ["盈信", "盈信融租", "回租租金、GPS1980、公证费、滞纳金"],
  ["盈信", "盈信科技", "GPS1000/GPS200"],
];

const taxRuleRows = [
  ["回租", "普票", "6%", "*金融服务*有形动产融资性售后回租"],
  ["直租-公司", "专票", "13%", "*融资租赁*汽车融资租赁"],
  ["直租-个人", "普票", "13%", "*融资租赁*汽车融资租赁"],
];

const invoiceRows = [
  ["1", "租金发票", "普票", "6%", "张某某", "3502**********4816", "LGBH52E08RY202605", "*金融服务*有形动产融资性售后回租", "1,598.71"],
  ["2", "服务费发票", "普票", "6%", "张某某", "3502**********4816", "LGBH52E08RY202605", "*现代服务*服务费", "1,980.00"],
  ["3", "服务费发票", "普票", "6%", "张某某", "3502**********4816", "LGBH52E08RY202605", "*现代服务*服务费", "1,200.00"],
  ["4", "滞纳金发票", "普票", "6%", "张某某", "3502**********4816", "LGBH52E08RY202605", "*金融服务*有形动产融资性售后回租", "126.00"],
];

const checkRows = [
  ["大主体识别", "本单归属盈信；金象/盈信规则已配置", "通过"],
  ["盈信子主体拆分", "盈信融租：租金、GPS1980、公证费、滞纳金；盈信科技：GPS1000/GPS200", "提醒"],
  ["发票类型/税率", "回租=普票6%；直租公司=专票13%；直租个人=普票13%", "通过"],
  ["客户信息来源", "客户名称、身份证号码/统一征信代码取进件查询-合同信息", "通过"],
  ["开票内容固定", "回租、直租按规则自动带出固定开票内容", "通过"],
  ["滞纳金", "结清申请新增126.00，已合并去重", "提醒"],
];

const templateRows = [
  ["1", "普票", "6%", "张某某", "3502**********4816", "LGBH52E08RY202605", "*金融服务*有形动产融资性售后回租", "1,598.71"],
  ["2", "专票", "13%", "厦门某公司", "91350200MA******", "LGBH52E08RY202699", "*融资租赁*汽车融资租赁", "19,615.00"],
];

const ledgerRowsBase = [
  ["KP202605210086-RZ", "张某某", "盈信", "盈信融租", "租金+GPS1980+滞纳金", "FQ202605210086-RZ"],
  ["KP202605210086-KJ", "张某某", "盈信", "盈信科技", "GPS1000+GPS200", "FQ202605210087-KJ"],
  ["KP202605210088-JX", "厦门某公司", "金象", "金象", "直租租金", "FQ202605210088-JX"],
];

const state = {
  view: "finance",
  activeMenu: "财务管理",
  step: -1,
  role: "合规",
  selectedProjects: ["直营月租金", "GPS管理费", "公证费", "滞纳金", "结清其他法律事务费"],
  invoiceType: "服务费发票",
  reviewText: "已核对主体层级、客户信息来源、发票类型税率、固定开票内容及GPS费用拆分规则；本单可提交主管审批。",
  approved: false,
  archived: false,
  autoDemo: false,
  autoTimer: null,
};

const demoFlow = [
  { view: "finance", title: "进入财务管理", next: "从财务管理进入开票申请中心，页面本身保持系统式操作，不放大段说明。" },
  { view: "apply", title: "合规发起申请", next: "用 ebsName 查询客户，选择开票类型和开票项目，确认车架号和客户开票信息。" },
  { view: "fetch", title: "系统自动取数", next: "客户名称、证件号/统一征信代码、车架号EBS都从进件查询和合同信息中带出。" },
  { view: "validate", title: "规则校验与模板", next: "这里重点展示发票类型、税率、固定开票内容，以及发票申请及签收单模板。" },
  { view: "review", title: "合规复核", next: "合规只复核系统提示项，不再人工全量从头核对。" },
  { view: "approval", title: "主管线上审批", next: "主管看到校验结果、模板预览和合规意见后线上审批。" },
  { view: "financeBack", title: "财务回传/签收", next: "财务开票后上传发票；流程进入会计审核、财务经理、发票回传和发票签收。" },
  { view: "ledger", title: "台账归档", next: "台账记录大主体、开票主体、发票号和状态，后续按客户/合同追溯。" },
];

const $ = (selector) => document.querySelector(selector);

function setMeta(title, breadcrumb, role = state.role) {
  $("#pageTitle").textContent = title;
  $("#breadcrumb").textContent = breadcrumb;
  $("#roleBadge").textContent = `当前：${role}`;
}

function toast(message) {
  let node = $(".toast");
  if (!node) {
    node = document.createElement("div");
    node.className = "toast";
    document.body.appendChild(node);
  }
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 1800);
}

function setView(view, menu = state.activeMenu, step = state.step, role = state.role) {
  state.view = view;
  state.activeMenu = menu;
  state.step = step;
  state.role = role;
  render();
}

function flowIndex() {
  return demoFlow.findIndex((item) => item.view === state.view);
}

function stopAutoDemo() {
  state.autoDemo = false;
  if (state.autoTimer) {
    window.clearInterval(state.autoTimer);
    state.autoTimer = null;
  }
}

function nextDemoStep() {
  const next = {
    finance: ["apply", "财务管理", 0, "合规"],
    apply: ["fetch", "财务管理", 1, "合规"],
    fetch: ["validate", "财务管理", 2, "合规"],
    validate: ["review", "财务管理", 3, "合规"],
    review: ["approval", "待办任务中心", 4, "主管"],
    approval: ["financeBack", "财务管理", 5, "财务"],
    financeBack: ["ledger", "财务管理", 5, "合规"],
  }[state.view];

  if (!next) {
    stopAutoDemo();
    toast("演示已完成");
    return;
  }

  if (state.view === "review") state.approved = false;
  if (state.view === "approval") state.approved = true;
  if (state.view === "financeBack") state.archived = true;
  setView(...next);
}

function startAutoDemo() {
  stopAutoDemo();
  state.autoDemo = true;
  toast("自动演示已开始");
  state.autoTimer = window.setInterval(nextDemoStep, 2200);
  renderGuide();
}

function renderNav() {
  const nav = $("#navList");
  nav.innerHTML = navItems
    .map(([icon, label, arrow]) => {
      const active = label === state.activeMenu ? "active" : "";
      return `
        <button class="nav-item ${active}" type="button" data-menu="${label}">
          <span class="nav-icon">${icon}</span>
          <span class="nav-label">${label}</span>
          <span class="nav-arrow">${arrow ? "›" : ""}</span>
        </button>
      `;
    })
    .join("");

  nav.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const menu = btn.dataset.menu;
      if (menu === "财务管理") setView("finance", "财务管理", -1, "合规");
      else if (menu === "待办任务中心") setView("approval", "待办任务中心", 4, "主管");
      else if (menu === "台账管理") setView("ledger", "台账管理", 5, "合规");
      else {
        state.activeMenu = menu;
        renderNav();
        toast(`${menu}：本演示聚焦线上开票流程`);
      }
    });
  });
}

function statusBadge(value) {
  if (value.includes("通过") || value.includes("完成") || value.includes("归档") || value.includes("已上传") || value.includes("配置")) {
    return `<span class="badge green">${value}</span>`;
  }
  if (value.includes("提醒") || value.includes("待") || value.includes("拆分")) {
    return `<span class="badge amber">${value}</span>`;
  }
  if (value.includes("异常") || value.includes("退回")) return `<span class="badge red">${value}</span>`;
  return `<span class="badge blue">${value}</span>`;
}

function table(headers, rows, statusIndex = -1, extraClass = "") {
  return `
    <table class="data-table ${extraClass}">
      <thead><tr>${headers.map((item) => `<th>${item}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>${row.map((cell, index) => `<td>${index === statusIndex ? statusBadge(cell) : cell}</td>`).join("")}</tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function stepper(active) {
  return `
    <div class="stepper">
      ${stepLabels
        .map((label, index) => {
          const status = index < active ? "done" : index === active ? "active" : "";
          return `
            <div class="step ${status}">
              <span class="step-dot">${index < active ? "✓" : index + 1}</span>
              <span>${label}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function panel(title, body, right = "") {
  return `
    <div class="panel panel-pad">
      <div class="section-head compact-head">
        <div><h2>${title}</h2></div>
        ${right}
      </div>
      ${body}
    </div>
  `;
}

function selectOptions(items, selected) {
  return items.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function financeView() {
  setMeta("财务管理", "首页 / 财务管理", "合规");
  return `
    <section class="section">
      ${panel(
        "财务管理",
        `
          <div class="grid-2">
            <button class="tile selected" type="button" data-next="apply">
              <div class="tile-title">▣ 开票申请中心</div>
              <div class="tile-desc">新增申请、客户查询、开票项目选择、规则校验。</div>
            </button>
            <button class="tile" type="button" data-next="ledger">
              <div class="tile-title">▥ 发票台账</div>
              <div class="tile-desc">查看开票主体、发票号、回传与签收状态。</div>
            </button>
          </div>
        `
      )}
    </section>
  `;
}

function applyView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 新增", "合规");
  return `
    <section class="section">
      ${stepper(0)}
      ${panel(
        "新增开票申请",
        `
          <div class="filter-card">
            <div class="field">
              <label>ebsName查询</label>
              <input value="ZHANG_SAN_EBS" />
            </div>
            <div class="field">
              <label>客户名称（开票客户信息）</label>
              <input value="张某某" />
            </div>
            <div class="field">
              <label>车架号</label>
              <input value="LGBH52E08RY202605" />
            </div>
            <div class="field">
              <label>大主体</label>
              <input value="盈信" />
            </div>
            <div class="field">
              <label>开票类型</label>
              <select id="invoiceType">${selectOptions(invoiceTypeOptions, state.invoiceType)}</select>
            </div>
            <div class="field">
              <label>附件</label>
              <button class="secondary-btn inline-btn" type="button" data-action="upload">上传附件</button>
            </div>
          </div>
          <div class="mini-title">开票项目</div>
          <div class="chip-grid">
            ${invoiceProjects
              .map(([name, source, adjustable]) => {
                const selected = state.selectedProjects.includes(name);
                return `
                  <button class="project-chip ${selected ? "selected" : ""}" type="button" data-project="${name}">
                    <strong>${name}</strong>
                    <span>${source}</span>
                    <em>${adjustable ? "可选" : "低频"}</em>
                  </button>
                `;
              })
              .join("")}
          </div>
          <div class="actions">
            <button class="primary-btn" type="button" data-next="fetch">查询并添加</button>
          </div>
        `,
        '<span class="badge blue">合规发起</span>'
      )}
    </section>
  `;
}

function fetchView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 自动取数", "合规");
  return `
    <section class="section">
      ${stepper(1)}
      ${panel(
        "自动取数",
        `
          ${table(["来源", "字段", "结果", "口径"], sourceRows, 3)}
          <div class="split-row">
            <div>
              <div class="mini-title">主体规则</div>
              ${table(["大主体", "开票主体", "适用规则"], subjectRows)}
            </div>
            <div>
              <div class="mini-title">发票类型/税率</div>
              ${table(["业务类型", "发票类型", "税率", "固定开票内容"], taxRuleRows)}
            </div>
          </div>
          <div class="mini-title">发票信息</div>
          ${table(["序号", "开票类型", "发票类型", "税率", "客户名称", "身份证号码/统一征信代码", "车架号EBS", "开票内容", "金额"], invoiceRows, -1, "wide-table")}
          <div class="actions">
            <button class="secondary-btn" type="button" data-next="apply">返回</button>
            <button class="primary-btn" type="button" data-next="validate">规则校验</button>
          </div>
        `,
        '<span class="badge green">已添加</span>'
      )}
    </section>
  `;
}

function invoiceTemplate() {
  return `
    <div class="invoice-template">
      <div class="template-title">厦门象屿金象融资租赁有限公司<br />发票申请及签收单</div>
      ${table(["序号", "发票类型", "税率", "客户名称", "身份证号码/统一征信代码", "车架号EBS", "开票内容", "金额"], templateRows, -1, "wide-table template-grid")}
      <div class="template-note">发票备注：客户投诉开票；备注内容同步至发票模板。</div>
      ${table(["创建时间", "当前流程", "处理人", "操作内容", "更新时间", "备注"], [
        ["", "申请人", "合规", "提交申请", "", ""],
        ["", "部门经理", "", "审批", "", ""],
        ["", "会计审核", "", "审核发票信息", "", ""],
        ["", "财务经理", "", "确认开票", "", ""],
        ["", "发票回传", "", "上传发票PDF", "", ""],
        ["", "发票签收", "", "申请人下载签收", "", ""],
      ])}
    </div>
  `;
}

function validateView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 规则校验", "合规");
  return `
    <section class="section">
      ${stepper(2)}
      ${panel(
        "规则校验",
        `
          ${table(["校验项", "系统判断", "结果"], checkRows, 2)}
          <div class="mini-title">发票模板预览</div>
          ${invoiceTemplate()}
          <div class="actions">
            <button class="secondary-btn" type="button" data-next="fetch">返回</button>
            <button class="primary-btn" type="button" data-next="review">进入复核</button>
          </div>
        `,
        '<span class="badge amber">2项提醒</span>'
      )}
    </section>
  `;
}

function reviewView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 合规复核", "合规");
  return `
    <section class="section">
      ${stepper(3)}
      ${panel(
        "合规复核",
        `
          <div class="review-layout">
            <div class="plain-box">
              <h3>提醒项</h3>
              <p>盈信子主体：GPS1980归盈信融租，GPS1000/200归盈信科技。</p>
              <p>滞纳金：126.00已按结清申请和费用入账合并去重。</p>
              <p>低频项目：结清类费用已作为可选开票项目保留。</p>
            </div>
            <div class="plain-box">
              <h3>复核意见</h3>
              <div class="field">
                <textarea id="reviewText">${state.reviewText}</textarea>
              </div>
            </div>
          </div>
          <div class="actions">
            <button class="secondary-btn" type="button" data-next="validate">返回</button>
            <button class="primary-btn" type="button" data-action="submitApproval">提交审批</button>
          </div>
        `,
        '<span class="badge amber">待审批</span>'
      )}
    </section>
  `;
}

function approvalView() {
  setMeta("待办任务中心", "待办任务中心 / 开票审批", "主管");
  return `
    <section class="section">
      ${stepper(4)}
      ${panel(
        "主管线上审批",
        `
          <div class="plain-box">
            <p><strong>申请单号：</strong>KP202605210086</p>
            <p><strong>申请人：</strong>合规</p>
            <p><strong>校验结果：</strong>发票类型、税率、客户信息来源、固定开票内容已通过；主体拆分和滞纳金为提醒项。</p>
            <p><strong>合规意见：</strong>${state.reviewText}</p>
          </div>
          <div class="actions">
            <button class="secondary-btn" type="button" data-action="reject">退回</button>
            <button class="primary-btn" type="button" data-action="approve">审批通过</button>
          </div>
        `,
        state.approved ? '<span class="badge green">已通过</span>' : '<span class="badge amber">待审批</span>'
      )}
    </section>
  `;
}

function financeBackView() {
  setMeta("财务回传", "财务管理 / 财务回传", "财务");
  return `
    <section class="section">
      ${stepper(5)}
      ${panel(
        "财务回传",
        `
          <div class="filter-card">
            <div class="field">
              <label>盈信融租发票号</label>
              <input value="FQ202605210086-RZ" />
            </div>
            <div class="field">
              <label>盈信科技发票号</label>
              <input value="FQ202605210087-KJ" />
            </div>
            <div class="field">
              <label>发票PDF</label>
              <button class="secondary-btn inline-btn" type="button" data-action="upload">上传发票</button>
            </div>
          </div>
          ${table(["节点", "处理说明", "状态"], [
            ["会计审核", "审核发票信息", "完成"],
            ["财务经理", "确认开票", "完成"],
            ["发票回传", "会计人员上传发票", "完成"],
            ["发票签收", "申请人下载即签收", "待签收"],
          ], 2)}
          <div class="actions">
            <button class="secondary-btn" type="button" data-next="approval">返回</button>
            <button class="primary-btn" type="button" data-action="archive">回传并归档</button>
          </div>
        `,
        '<span class="badge blue">财务处理</span>'
      )}
    </section>
  `;
}

function ledgerView() {
  setMeta("发票台账", "财务管理 / 发票台账", "合规");
  const rows = ledgerRowsBase.map((row) => [...row, state.archived ? "已归档" : "待归档"]);
  return `
    <section class="section">
      ${panel(
        "发票台账",
        `
          <div class="metrics">
            <div class="metric" style="background: var(--blueSoft)"><div>待合规复核</div><strong style="color: var(--blue)">3</strong></div>
            <div class="metric" style="background: var(--amberSoft)"><div>待主管审批</div><strong style="color: var(--amber)">${state.approved ? "1" : "2"}</strong></div>
            <div class="metric" style="background: var(--purpleSoft)"><div>待财务开票</div><strong style="color: var(--purple)">${state.archived ? "3" : "5"}</strong></div>
            <div class="metric" style="background: var(--greenSoft)"><div>已开票归档</div><strong style="color: var(--green)">${state.archived ? "130" : "128"}</strong></div>
            <div class="metric" style="background: var(--redSoft)"><div>异常/超期</div><strong style="color: var(--red)">1</strong></div>
          </div>
          ${table(["申请单号", "客户名称", "大主体", "开票主体", "开票项目", "发票号", "状态"], rows, 6)}
          <div class="actions">
            <button class="secondary-btn" type="button" data-next="finance">返回财务管理</button>
            <button class="primary-btn" type="button" data-next="apply">新增申请</button>
          </div>
        `,
        state.archived ? '<span class="badge green">闭环完成</span>' : '<span class="badge amber">待归档</span>'
      )}
    </section>
  `;
}

function bindContentEvents() {
  $("#content").querySelectorAll("[data-next]").forEach((node) => {
    node.addEventListener("click", () => {
      const route = {
        finance: ["finance", "财务管理", -1, "合规"],
        apply: ["apply", "财务管理", 0, "合规"],
        fetch: ["fetch", "财务管理", 1, "合规"],
        validate: ["validate", "财务管理", 2, "合规"],
        review: ["review", "财务管理", 3, "合规"],
        approval: ["approval", "待办任务中心", 4, "主管"],
        financeBack: ["financeBack", "财务管理", 5, "财务"],
        ledger: ["ledger", "财务管理", 5, "合规"],
      }[node.dataset.next];
      setView(...route);
    });
  });

  $("#content").querySelectorAll("[data-project]").forEach((node) => {
    node.addEventListener("click", () => {
      const project = node.dataset.project;
      if (state.selectedProjects.includes(project)) {
        state.selectedProjects = state.selectedProjects.filter((item) => item !== project);
      } else {
        state.selectedProjects = [...state.selectedProjects, project];
      }
      render();
    });
  });

  $("#content").querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", () => {
      const action = node.dataset.action;
      if (action === "upload") toast("附件已加入演示队列");
      if (action === "submitApproval") {
        const text = $("#reviewText");
        if (text && text.value.trim()) state.reviewText = text.value.trim();
        toast("已提交主管审批");
        setView("approval", "待办任务中心", 4, "主管");
      }
      if (action === "approve") {
        state.approved = true;
        toast("审批已通过");
        setView("financeBack", "财务管理", 5, "财务");
      }
      if (action === "reject") {
        toast("已退回合规补充");
        setView("review", "财务管理", 3, "合规");
      }
      if (action === "archive") {
        state.archived = true;
        toast("发票已回传并归档");
        setView("ledger", "财务管理", 5, "合规");
      }
    });
  });

  const invoiceSelect = $("#invoiceType");
  if (invoiceSelect) {
    invoiceSelect.addEventListener("change", (event) => {
      state.invoiceType = event.target.value;
    });
  }
}

function renderGuide() {
  const guide = $("#demoGuide");
  const index = flowIndex();
  const item = demoFlow[index] || demoFlow[0];
  const done = state.view === "ledger" && state.archived;
  guide.innerHTML = `
    <div class="guide-kicker">领导演示助手</div>
    <h2>${item.title}</h2>
    <p class="guide-text">${item.next}</p>
    <div class="guide-step">
      <strong>讲解主线</strong>
      <p class="guide-mini">页面只展示操作项；解释放这里讲：系统自动取数、自动判断规则，合规只看提醒和异常。</p>
    </div>
    <div class="guide-actions">
      <button id="guideNext" class="primary-btn" type="button">${done ? "演示已完成" : "下一步演示"}</button>
      <button id="guideAuto" class="secondary-btn" type="button">${state.autoDemo ? "停止自动演示" : "一键自动演示"}</button>
    </div>
    <ol class="guide-flow">
      ${demoFlow.map((step, i) => `<li class="${i === index ? "current" : ""}">${step.title}</li>`).join("")}
    </ol>
  `;

  $("#guideNext").addEventListener("click", nextDemoStep);
  $("#guideAuto").addEventListener("click", () => {
    if (state.autoDemo) {
      stopAutoDemo();
      toast("自动演示已停止");
      renderGuide();
    } else {
      startAutoDemo();
    }
  });
}

function render() {
  renderNav();
  const views = {
    finance: financeView,
    apply: applyView,
    fetch: fetchView,
    validate: validateView,
    review: reviewView,
    approval: approvalView,
    financeBack: financeBackView,
    ledger: ledgerView,
  };
  $("#content").innerHTML = views[state.view]();
  bindContentEvents();
  renderGuide();
}

$("#resetBtn").addEventListener("click", () => {
  stopAutoDemo();
  state.view = "finance";
  state.activeMenu = "财务管理";
  state.step = -1;
  state.role = "合规";
  state.invoiceType = "服务费发票";
  state.selectedProjects = ["直营月租金", "GPS管理费", "公证费", "滞纳金", "结清其他法律事务费"];
  state.reviewText = "已核对主体层级、客户信息来源、发票类型税率、固定开票内容及GPS费用拆分规则；本单可提交主管审批。";
  state.approved = false;
  state.archived = false;
  toast("演示流程已重置");
  render();
});

render();
