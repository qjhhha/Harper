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

const sourceRows = [
  ["进件管理", "客户、合同、证件号、合同主体", "已读取"],
  ["台账管理", "租金期次、合同状态、应收记录", "已读取"],
  ["费用管理", "GPS费、公证费、请款记录", "已读取"],
  ["还款管理", "已支付利息、实收金额", "已读取"],
  ["租后管理", "结清申请、结清端滞纳金", "已读取"],
];

const invoiceRows = [
  ["已支付利息", "3,280.00", "还款管理", "正常"],
  ["GPS费", "800.00", "费用管理", "正常"],
  ["公证费", "300.00", "费用管理", "正常"],
  ["滞纳金", "126.00", "台账+结清", "待校验"],
];

const checkRows = [
  ["主体一致性", "合同主体=盈信；开票主体=盈信", "通过"],
  ["金额匹配", "已支付利息、服务费与本次开票金额一致", "通过"],
  ["重复开票", "同客户同期间无历史开票记录", "通过"],
  ["滞纳金", "结清申请新增126.00，已合并去重", "提醒"],
  ["资料完整性", "个人身份证号已带出，公司户税号不适用", "通过"],
];

const state = {
  view: "finance",
  activeMenu: "财务管理",
  step: -1,
  role: "合规",
  customerRead: true,
  reviewText: "已核对滞纳金来源，结清端新增126.00已由系统合并去重；主体、金额、重复开票校验均通过，建议提交主管审批。",
  approved: false,
  returned: false,
  invoiceNo: "FQ202605140086",
  archived: false,
  autoDemo: false,
  autoTimer: null,
};

const demoFlow = [
  { view: "finance", title: "进入财务管理", next: "点击“开票申请中心”，进入统一开票入口。", menu: "财务管理" },
  { view: "apply", title: "合规发起申请", next: "确认客户、主体、发票类型后，点击“自动取数”。", menu: "财务管理" },
  { view: "fetch", title: "系统自动取数", next: "查看系统从各模块带出的开票明细，点击“执行规则校验”。", menu: "财务管理" },
  { view: "validate", title: "规则自动校验", next: "系统显示通过项和提醒项，点击“进入合规复核”。", menu: "财务管理" },
  { view: "review", title: "合规复核提醒项", next: "合规确认滞纳金提醒并提交主管审批。", menu: "财务管理" },
  { view: "approval", title: "主管线上审批", next: "主管查看合规意见和校验结果，点击审批通过。", menu: "待办任务中心" },
  { view: "financeBack", title: "财务回传发票", next: "财务填写发票号码，上传PDF，点击回传并归档。", menu: "财务管理" },
  { view: "ledger", title: "台账闭环完成", next: "领导能看到申请、审批、发票号、PDF归档状态已经贯通。", menu: "财务管理" },
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

function flowIndex() {
  return demoFlow.findIndex((item) => item.view === state.view);
}

function guideTitle() {
  const item = demoFlow[flowIndex()] || demoFlow[0];
  return item.title;
}

function nextDemoStep() {
  if (state.view === "finance") {
    setView("apply", "财务管理", 0, "合规");
    return;
  }
  if (state.view === "apply") {
    setView("fetch", "财务管理", 1, "合规");
    return;
  }
  if (state.view === "fetch") {
    setView("validate", "财务管理", 2, "合规");
    return;
  }
  if (state.view === "validate") {
    setView("review", "财务管理", 3, "合规");
    return;
  }
  if (state.view === "review") {
    const input = $("#reviewText");
    if (input && input.value.trim()) state.reviewText = input.value.trim();
    toast("已提交主管审批");
    setView("approval", "待办任务中心", 4, "主管");
    return;
  }
  if (state.view === "approval") {
    state.approved = true;
    toast("主管审批已通过");
    setView("financeBack", "财务管理", 5, "财务");
    return;
  }
  if (state.view === "financeBack") {
    const input = $("#invoiceNo");
    if (input && input.value.trim()) state.invoiceNo = input.value.trim();
    state.archived = true;
    toast("财务回传完成，发票已归档");
    setView("ledger", "财务管理", 5, "合规");
    return;
  }
  if (state.view === "ledger") {
    stopAutoDemo();
    toast("演示已完成，可把这个链接发给领导直接体验");
  }
}

function stopAutoDemo() {
  state.autoDemo = false;
  if (state.autoTimer) {
    window.clearInterval(state.autoTimer);
    state.autoTimer = null;
  }
}

function startAutoDemo() {
  stopAutoDemo();
  state.autoDemo = true;
  toast("自动演示已开始");
  state.autoTimer = window.setInterval(() => {
    if (state.view === "ledger") {
      stopAutoDemo();
      renderGuide();
      return;
    }
    nextDemoStep();
  }, 2100);
  renderGuide();
}

function setView(view, menu = state.activeMenu, step = state.step, role = state.role) {
  state.view = view;
  state.activeMenu = menu;
  state.step = step;
  state.role = role;
  render();
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
      else if (menu === "合规预警管理") setView("validate", "合规预警管理", 2, "合规");
      else {
        state.activeMenu = menu;
        renderNav();
        toast(`${menu}：本演示聚焦线上开票流程`);
      }
    });
  });
}

function stepper(active) {
  return `
    <div class="stepper">
      ${stepLabels
        .map((label, index) => {
          const status = index < active ? "done" : index === active ? "active" : "";
          const mark = index < active ? "✓" : index + 1;
          return `
            <div class="step ${status}">
              <span class="step-dot">${mark}</span>
              <span>${label}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function statusBadge(value) {
  if (value.includes("通过") || value.includes("正常") || value.includes("完成") || value.includes("归档") || value.includes("已读取")) {
    return `<span class="badge green">${value}</span>`;
  }
  if (value.includes("提醒") || value.includes("待")) {
    return `<span class="badge amber">${value}</span>`;
  }
  if (value.includes("异常") || value.includes("退回")) {
    return `<span class="badge red">${value}</span>`;
  }
  return `<span class="badge blue">${value}</span>`;
}

function table(headers, rows, statusIndex = -1) {
  return `
    <table class="data-table">
      <thead>
        <tr>${headers.map((item) => `<th>${item}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
              <tr>
                ${row.map((cell, index) => `<td>${index === statusIndex ? statusBadge(cell) : cell}</td>`).join("")}
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function financeView() {
  setMeta("财务管理", "首页 / 财务管理", "合规");
  return `
    <section class="section">
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>财务管理</h2>
            <p>合规从统一入口发起开票，后续审批、回传、归档都在线完成。</p>
          </div>
        </div>
        <div class="grid-2">
          <button class="tile" type="button" data-next="apply">
            <div class="tile-title">◓ 发票登记</div>
            <div class="tile-desc">现有发票登记入口，可作为历史流程保留。</div>
          </button>
          <button class="tile selected" type="button" data-next="apply">
            <div class="tile-title">▣ 开票申请中心</div>
            <div class="tile-desc">统一发起、自动取数、规则校验、合规复核、线上审批。</div>
          </button>
          <button class="tile" type="button" data-next="ledger">
            <div class="tile-title">▥ 发票台账</div>
            <div class="tile-desc">查看待开票、已开票、异常、超期与电子归档。</div>
          </button>
          <button class="tile" type="button" data-next="financeBack">
            <div class="tile-title">▤ 财务回传</div>
            <div class="tile-desc">财务录入发票号并上传电子发票PDF。</div>
          </button>
        </div>
        <div class="hint-band">建议向领导现场演示：点击“开票申请中心”，从合规发起一路走到发票台账闭环。</div>
      </div>
    </section>
  `;
}

function applyView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 新建申请", "合规");
  return `
    <section class="section">
      ${stepper(0)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>新建开票申请</h2>
            <p>申请人：合规　申请单号：KP202605140086</p>
          </div>
          <span class="badge blue">合规发起</span>
        </div>
        <div class="form-grid">
          <div class="field">
            <label>客户/合同编号</label>
            <input id="contractNo" value="XY20260514001" />
          </div>
          <div class="field">
            <label>客户名称</label>
            <input value="张某某" />
          </div>
          <div class="field">
            <label>合同主体</label>
            <input value="盈信" />
          </div>
          <div class="field">
            <label>证件号</label>
            <input value="3502**********4816" />
          </div>
          <div class="field">
            <label>车辆信息</label>
            <input value="闽D***** / 售后回租" />
          </div>
          <div class="field">
            <label>开票场景</label>
            <input value="客户投诉要求开票" />
          </div>
          <div class="field span-3">
            <label>发票类型</label>
            <div class="type-list">
              ${["租金发票", "GPS费", "公证费", "滞纳金"].map((item) => `<label class="type-check"><input type="checkbox" checked />${item}</label>`).join("")}
            </div>
          </div>
          <div class="field span-3">
            <label>申请说明</label>
            <textarea>客户投诉要求开具租金发票；系统同步校验GPS费、公证费及滞纳金是否存在可开票记录。</textarea>
          </div>
        </div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-action="readCustomer">读取客户/合同</button>
          <button class="primary-btn" type="button" data-next="fetch">自动取数</button>
        </div>
      </div>
    </section>
  `;
}

function fetchView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 自动取数", "合规");
  return `
    <section class="section">
      ${stepper(1)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>系统自动取数</h2>
            <p>系统从现有模块读取数据，合并生成本次开票明细。</p>
          </div>
          <span class="badge green">取数完成</span>
        </div>
        <div class="flow-layout">
          <div class="module-stack">
            ${sourceRows
              .map(
                ([name, desc, status]) => `
                  <div class="module-row">
                    <strong>${name}</strong>
                    <span>${desc}</span>
                    <em class="module-status">${status}</em>
                  </div>
                `
              )
              .join("")}
          </div>
          <div>
            ${table(["费用项", "金额", "来源", "状态"], invoiceRows, 3)}
            <div class="hint-band">系统已生成开票明细，合规无需跨模块重复查询，也无需手工维护Excel。</div>
          </div>
        </div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-next="apply">返回申请</button>
          <button class="primary-btn" type="button" data-next="validate">执行规则校验</button>
        </div>
      </div>
    </section>
  `;
}

function validateView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 规则校验", "合规");
  return `
    <section class="section">
      ${stepper(2)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>自动规则校验</h2>
            <p>系统先做主体、金额、重复开票、资料完整性和滞纳金校验。</p>
          </div>
          <span class="badge amber">1项提醒</span>
        </div>
        ${table(["校验项", "系统判断", "结果"], checkRows, 2)}
        <div class="hint-band">合规只需复核黄色提醒和红色异常事项，正常项可批量通过。</div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-next="fetch">返回取数</button>
          <button class="primary-btn" type="button" data-next="review">进入合规复核</button>
        </div>
      </div>
    </section>
  `;
}

function reviewView() {
  setMeta("开票申请中心", "财务管理 / 开票申请中心 / 合规复核", "合规");
  return `
    <section class="section">
      ${stepper(3)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>合规复核异常/提醒项</h2>
            <p>本次仅需复核滞纳金提醒项。</p>
          </div>
          <span class="badge amber">待提交审批</span>
        </div>
        <div class="review-layout">
          <div class="plain-box">
            <h3>提醒项</h3>
            <p><strong>滞纳金：126.00</strong></p>
            <p>来源：融租台账 + 结清申请</p>
            <p>系统处理：按实收口径合并，并对同客户、同合同、同期间记录去重。</p>
            <span class="badge green">确认无误</span>
          </div>
          <div class="plain-box">
            <h3>合规复核意见</h3>
            <div class="field">
              <textarea id="reviewText">${state.reviewText}</textarea>
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-next="validate">返回校验</button>
          <button class="primary-btn" type="button" data-action="submitApproval">提交主管审批</button>
        </div>
      </div>
    </section>
  `;
}

function approvalView() {
  setMeta("待办任务中心", "待办任务中心 / 开票审批", "主管");
  const approvedClass = state.approved ? "done" : "";
  return `
    <section class="section">
      ${stepper(4)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>主管线上审批</h2>
            <p>申请单号：KP202605140086　申请人：合规　发票类型：租金 + GPS费 + 公证费 + 滞纳金</p>
          </div>
          ${state.approved ? '<span class="badge green">已通过</span>' : '<span class="badge amber">待审批</span>'}
        </div>
        <div class="plain-box">
          <p><strong>系统校验：</strong>4项通过，1项提醒。</p>
          <p><strong>合规意见：</strong>${state.reviewText}</p>
        </div>
        <div class="timeline">
          <div class="timeline-item done">
            <div class="timeline-dot">✓</div>
            <div>
              <div class="timeline-title">合规提交</div>
              <div class="timeline-desc">已提交审批，附系统校验结果与合规复核意见。</div>
            </div>
          </div>
          <div class="timeline-item ${approvedClass}">
            <div class="timeline-dot">${state.approved ? "✓" : "2"}</div>
            <div>
              <div class="timeline-title">主管审批</div>
              <div class="timeline-desc">${state.approved ? "已审批通过，流转至财务开票。" : "等待审批处理。"}</div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot">3</div>
            <div>
              <div class="timeline-title">财务开票</div>
              <div class="timeline-desc">审批通过后进入财务回传环节。</div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-action="reject">退回</button>
          <button class="primary-btn" type="button" data-action="approve">审批通过</button>
        </div>
      </div>
    </section>
  `;
}

function financeBackView() {
  setMeta("财务回传", "财务管理 / 财务回传", "财务");
  return `
    <section class="section">
      ${stepper(5)}
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>财务开票回传</h2>
            <p>财务开票后回填发票号码并上传电子发票PDF。</p>
          </div>
          <span class="badge blue">财务处理</span>
        </div>
        <div class="form-grid">
          <div class="field">
            <label>申请单号</label>
            <input value="KP202605140086" />
          </div>
          <div class="field">
            <label>发票号码</label>
            <input id="invoiceNo" value="${state.invoiceNo}" />
          </div>
          <div class="field">
            <label>开票状态</label>
            <input value="已开票" />
          </div>
          <div class="plain-box span-3">
            <h3>电子发票PDF</h3>
            <p>FQ202605140086.pdf　${statusBadge("已上传")}</p>
          </div>
        </div>
        <div class="hint-band">回传后，系统自动把发票PDF、审批记录、开票明细关联至客户和合同维度。</div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-next="approval">返回审批</button>
          <button class="primary-btn" type="button" data-action="archive">回传并归档</button>
        </div>
      </div>
    </section>
  `;
}

function ledgerView() {
  setMeta("发票台账", "财务管理 / 发票台账", "合规");
  const rows = [
    ["KP202605140086", "张某某", "租金+服务费+滞纳金", state.invoiceNo, state.archived ? "已归档" : "待归档"],
    ["KP202605140085", "李某某", "租金", "FQ202605140085", "已归档"],
    ["KP202605140084", "王某某", "滞纳金", "-", "待合规复核"],
    ["KP202605140083", "某公司户", "GPS费/公证费", "-", "待财务开票"],
  ];
  return `
    <section class="section">
      <div class="panel panel-pad">
        <div class="section-head">
          <div>
            <h2>开票台账</h2>
            <p>按申请、审批、开票、归档状态统一追踪。</p>
          </div>
          ${state.archived ? '<span class="badge green">闭环完成</span>' : '<span class="badge amber">待归档</span>'}
        </div>
        <div class="metrics">
          <div class="metric" style="background: var(--blueSoft)"><div>待合规复核</div><strong style="color: var(--blue)">3</strong></div>
          <div class="metric" style="background: var(--amberSoft)"><div>待主管审批</div><strong style="color: var(--amber)">${state.approved ? "1" : "2"}</strong></div>
          <div class="metric" style="background: var(--purpleSoft)"><div>待财务开票</div><strong style="color: var(--purple)">${state.archived ? "4" : "5"}</strong></div>
          <div class="metric" style="background: var(--greenSoft)"><div>已开票归档</div><strong style="color: var(--green)">${state.archived ? "129" : "128"}</strong></div>
          <div class="metric" style="background: var(--redSoft)"><div>异常/超期</div><strong style="color: var(--red)">1</strong></div>
        </div>
        ${table(["申请单号", "客户", "发票类型", "发票号", "状态"], rows, 4)}
        <div class="hint-band">闭环价值：合规、主管、财务在同一条线上处理，后续能按客户/合同一键追溯。</div>
        <div class="actions">
          <button class="secondary-btn" type="button" data-next="finance">返回财务管理</button>
          <button class="primary-btn" type="button" data-next="apply">再发起一单</button>
        </div>
      </div>
    </section>
  `;
}

function bindContentEvents() {
  $("#content").querySelectorAll("[data-next]").forEach((node) => {
    node.addEventListener("click", () => {
      const next = node.dataset.next;
      const route = {
        finance: ["finance", "财务管理", -1, "合规"],
        apply: ["apply", "财务管理", 0, "合规"],
        fetch: ["fetch", "财务管理", 1, "合规"],
        validate: ["validate", "财务管理", 2, "合规"],
        review: ["review", "财务管理", 3, "合规"],
        approval: ["approval", "待办任务中心", 4, "主管"],
        financeBack: ["financeBack", "财务管理", 5, "财务"],
        ledger: ["ledger", "财务管理", 5, "合规"],
      }[next];
      setView(...route);
    });
  });

  $("#content").querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", () => {
      const action = node.dataset.action;
      if (action === "readCustomer") toast("客户与合同信息已读取");
      if (action === "submitApproval") {
        state.reviewText = $("#reviewText").value.trim() || state.reviewText;
        toast("已提交主管审批");
        setView("approval", "待办任务中心", 4, "主管");
      }
      if (action === "approve") {
        state.approved = true;
        toast("主管审批已通过");
        setView("financeBack", "财务管理", 5, "财务");
      }
      if (action === "reject") {
        state.returned = true;
        toast("已退回合规补充说明");
        setView("review", "财务管理", 3, "合规");
      }
      if (action === "archive") {
        const invoice = $("#invoiceNo").value.trim();
        if (invoice) state.invoiceNo = invoice;
        state.archived = true;
        toast("财务回传完成，发票已归档");
        setView("ledger", "财务管理", 5, "合规");
      }
    });
  });
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
      <strong>建议话术</strong>
      <p class="guide-mini">这套流程不是取消审核，而是把重复查询、机械核对交给系统，合规只处理异常和风险事项。</p>
    </div>
    <div class="guide-actions">
      <button id="guideNext" class="primary-btn" type="button">${done ? "演示已完成" : "下一步演示"}</button>
      <button id="guideAuto" class="secondary-btn" type="button">${state.autoDemo ? "停止自动演示" : "一键自动演示"}</button>
    </div>
    <ol class="guide-flow">
      ${demoFlow
        .map((step, i) => `<li class="${i === index ? "current" : ""}">${step.title}</li>`)
        .join("")}
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
  state.approved = false;
  state.returned = false;
  state.archived = false;
  state.invoiceNo = "FQ202605140086";
  toast("演示流程已重置");
  render();
});

render();
