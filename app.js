const state = {
  account: localStorage.getItem("sanfes-mock-account") || "student",
  page: "home",
  selectedCompetition: 1,
  toastTimer: null,
  joinedHelp: new Set([1]),
  checklist: {
    "体育着": true,
    "学生証": true,
    "タオル": false,
    "飲み物": false
  },
  confirmedScores: {
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0
  },
  judgingSaved: {
    1: true,
    2: false,
    3: true,
    4: false
  },
  muster: {
    1: [
      ["山田太郎", "PRESENT", "A-2階で確認"],
      ["佐藤花子", "PRESENT", ""],
      ["村田健", "UNCONFIRMED", ""],
      ["小川美咲", "NOT_ARRIVED", "保健室対応後に合流"]
    ],
    2: [
      ["山田太郎", "UNCONFIRMED", ""],
      ["中村海斗", "PRESENT", ""],
      ["田中葵", "ABSENT", "担任確認済み"]
    ]
  }
};

const accounts = {
  guest: {
    id: "guest",
    name: "未ログイン",
    role: "guest",
    student: null,
    committee: null,
    team: null
  },
  student: {
    id: "student",
    name: "山田太郎",
    kana: "ヤマダタロウ",
    role: "student",
    studentNumber: "S001",
    className: "IT2A",
    department: "情報処理科",
    committee: "集計委員",
    function: "SCORING",
    team: "red",
    unread: 3
  },
  sato: {
    id: "sato",
    name: "佐藤花子",
    kana: "サトウハナコ",
    role: "student",
    studentNumber: "S002",
    className: "IT2A",
    department: "情報処理科",
    committee: "招集誘導委員",
    function: "MUSTER",
    team: "blue",
    unread: 1
  },
  murata: {
    id: "murata",
    name: "村田健",
    kana: "ムラタケン",
    role: "student",
    studentNumber: "S003",
    className: "IT2B",
    department: "情報処理科",
    committee: "競技審判",
    function: "JUDGING",
    team: "yellow",
    unread: 0
  },
  ogawa: {
    id: "ogawa",
    name: "小川美咲",
    kana: "オガワミサキ",
    role: "student",
    studentNumber: "S004",
    className: "NC1A",
    department: "看護科",
    committee: "救護委員",
    function: "FIRST_AID",
    team: "green",
    unread: 2
  },
  unassigned: {
    id: "unassigned",
    name: "田中葵",
    kana: "タナカアオイ",
    role: "student",
    studentNumber: "S009",
    className: "IT1A",
    department: "情報処理科",
    committee: null,
    function: null,
    team: "red",
    unread: 0
  },
  admin: {
    id: "admin",
    name: "学校側管理者",
    role: "admin",
    committee: null,
    team: null,
    unread: 0
  }
};

const teams = {
  red: {
    id: "red",
    name: "赤団",
    color: "#d33b32",
    score: 150,
    venue: "グラウンド東側",
    entrance: "正門側入口",
    cheerSeat: "Aブロック",
    call: "燃えろ赤団",
    note: "移動時は係員の案内に従ってください。"
  },
  blue: {
    id: "blue",
    name: "青団",
    color: "#2563eb",
    score: 170,
    venue: "グラウンド西側",
    entrance: "体育館側入口",
    cheerSeat: "Bブロック",
    call: "青く高く",
    note: "応援席では水分補給をこまめに行ってください。"
  },
  yellow: {
    id: "yellow",
    name: "黄団",
    color: "#d9a21b",
    score: 80,
    venue: "体育館前",
    entrance: "中央通路",
    cheerSeat: "Cブロック",
    call: "光れ黄団",
    note: "集合時刻の10分前に移動を開始してください。"
  },
  green: {
    id: "green",
    name: "緑団",
    color: "#159765",
    score: 100,
    venue: "校舎側テント",
    entrance: "校舎側入口",
    cheerSeat: "Dブロック",
    call: "つなげ緑団",
    note: "体調不良時は救護委員へ連絡してください。"
  }
};

const competitions = [
  {
    id: 1,
    name: "綱引き",
    summary: "団対抗で力を合わせて勝敗を競う競技。",
    meetingTime: "13:20",
    meetingPlace: "A-2階",
    requiredItems: ["体育着", "タオル", "飲み物"],
    rules: "審判の合図で開始し、中央ラインを越えた団が勝利。安全確保のため手袋を着用する。",
    guide: "集合後、招集誘導委員の案内で入場口へ移動する。"
  },
  {
    id: 2,
    name: "リレー",
    summary: "各団代表によるトラック競走。",
    meetingTime: "09:30",
    meetingPlace: "グラウンド本部前",
    requiredItems: ["体育着", "学生証", "飲み物"],
    rules: "バトンパス区域内で受け渡しを行う。走者交代時は係員の指示に従う。",
    guide: "本部前で点呼後、スタート地点へ移動する。"
  },
  {
    id: 3,
    name: "台風の目",
    summary: "4人1組で棒を持ち、コーンを回って戻る団体競技。",
    meetingTime: "11:10",
    meetingPlace: "体育館前",
    requiredItems: ["体育着", "運動靴"],
    rules: "棒から手を離さず、指定されたコーンを回る。転倒時は審判が一時停止を判断する。",
    guide: "競技前に準備運動と動線確認を行う。"
  },
  {
    id: 4,
    name: "演舞合戦",
    summary: "各団の応援・演舞を披露するステージ企画。",
    meetingTime: "14:10",
    meetingPlace: "ステージ横",
    requiredItems: ["衣装", "飲み物"],
    rules: "持ち時間は5分。音響確認後、係員の合図で入場する。",
    guide: "舞台袖で待機し、前団の退場後に入場する。"
  }
];

const announcements = [
  {
    id: 1,
    category: "PLACE_CHANGE",
    badge: "yellow",
    title: "場所変更: 綱引き",
    body: "綱引きの集合場所がA-2階に変更されました。",
    time: "6/30 12:28",
    pinned: true
  },
  {
    id: 2,
    category: "REMIND",
    badge: "blue",
    title: "集合リマインド: 綱引き",
    body: "綱引きは13:20にA-2階集合です。遅れないようにしましょう。",
    time: "6/30 12:28",
    pinned: false
  },
  {
    id: 3,
    category: "HELP",
    badge: "green",
    title: "HELP募集中",
    body: "受付・誘導スタッフを募集しています。あと5名必要です。",
    time: "6/30 12:28",
    pinned: false
  },
  {
    id: 4,
    category: "ITEMS",
    badge: "blue",
    title: "持ち物リマインド",
    body: "タオル・飲み物を忘れずに持ってきてください。",
    time: "6/29 18:10",
    pinned: false
  }
];

const helpRequests = [
  {
    id: 1,
    title: "受付・誘導スタッフ募集",
    date: "9/12",
    time: "08:30 - 10:00",
    place: "正門前",
    required: 8,
    joined: 3,
    status: "OPEN",
    description: "来場者の受付と会場案内を担当します。"
  },
  {
    id: 2,
    title: "片付けHELP",
    date: "9/12",
    time: "16:20 - 17:10",
    place: "グラウンド本部",
    required: 10,
    joined: 7,
    status: "OPEN",
    description: "テント・机・案内表示の片付けを手伝います。"
  },
  {
    id: 3,
    title: "資料配布HELP",
    date: "9/12",
    time: "09:00 - 10:30",
    place: "体育館入口",
    required: 4,
    joined: 4,
    status: "CLOSED",
    description: "パンフレットと会場マップを配布します。"
  }
];

const documents = [
  ["競技ガイド", "全競技のルールと集合情報", "GUIDE"],
  ["会場マップ", "グラウンド・体育館・本部の位置", "MAP"],
  ["持ち物一覧", "競技別に必要な持ち物", "FORM"],
  ["けが防止ガイド", "準備運動と体調管理", "GUIDE"],
  ["HELP参加ルール", "HELP参加時の注意事項", "RULES"]
];

const committees = [
  ["招集誘導委員", "MUSTER", "集合状況を更新し、未集合者を確認する。"],
  ["集計委員", "SCORING", "競技結果を集計し、本部へ反映する。"],
  ["競技審判", "JUDGING", "競技ごとの順位と得点を記録する。"],
  ["救護委員", "FIRST_AID", "けが・体調不良者の初期対応を行う。"],
  ["放送委員", "BROADCAST", "競技案内と緊急連絡を放送する。"],
  ["受付委員", "RECEPTION", "来場者受付と案内を行う。"]
];

const schedule = [
  ["09:00", "開会式", "グラウンド", "CEREMONY", "全体集合"],
  ["09:30", "リレー", "グラウンド本部前", "COMPETITION", "各団代表"],
  ["11:10", "台風の目", "体育館前", "COMPETITION", "出場者"],
  ["12:00", "昼休憩", "各教室・テント", "GENERAL", "全員"],
  ["13:20", "綱引き", "A-2階", "COMPETITION", "出場者"],
  ["14:10", "演舞合戦", "ステージ横", "PERFORMANCE", "各団"],
  ["15:30", "閉会式", "グラウンド", "CEREMONY", "全体集合"]
];

function currentAccount() {
  return accounts[state.account] || accounts.student;
}

function isStudent() {
  return currentAccount().role === "student";
}

function isAdmin() {
  return currentAccount().role === "admin";
}

function hasStaff() {
  return isStudent() && Boolean(currentAccount().committee);
}

function teamOf(account = currentAccount()) {
  return teams[account.team] || null;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function teamBadge(team) {
  return `<span class="team-badge" style="background:${team.color}">${escapeHtml(team.name)}</span>`;
}

function badge(text, tone = "dark") {
  return `<span class="badge ${tone}">${escapeHtml(text)}</span>`;
}

function button(label, route, tone = "primary", extra = "") {
  return `<a class="btn ${tone} ${extra}" href="#/${route}" data-link>${escapeHtml(label)}</a>`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setAccount(accountId) {
  state.account = accountId;
  localStorage.setItem("sanfes-mock-account", accountId);
  document.getElementById("accountSelect").value = accountId;
  if (accountId === "admin" && state.page === "my") {
    location.hash = "#/admin";
    return;
  }
  render();
}

function setPageFromHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  state.page = raw || "home";
  if (state.page.startsWith("competition/")) {
    state.selectedCompetition = Number(state.page.split("/")[1]) || 1;
    state.page = "competition";
  }
}

function layout(content, wide = false) {
  const app = document.getElementById("app");
  app.className = wide ? "app-shell wide-shell" : "app-shell";
  app.innerHTML = content;
  app.focus({ preventScroll: true });
  updateNav();
}

function updateNav() {
  const account = currentAccount();
  document.querySelectorAll("[data-role='student']").forEach((el) => {
    el.classList.toggle("hide", account.role !== "student");
  });
  document.querySelectorAll("[data-role='staff']").forEach((el) => {
    el.classList.toggle("hide", !hasStaff());
  });
  document.querySelectorAll("[data-role='admin']").forEach((el) => {
    el.classList.toggle("hide", account.role !== "admin");
  });
  document.querySelectorAll("[data-auth='student']").forEach((el) => {
    el.classList.toggle("hide", account.role === "guest");
  });
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.classList.toggle("active", el.dataset.nav === navGroup(state.page));
  });
}

function navGroup(page) {
  if (["competition"].includes(page)) return "competitions";
  if (page.startsWith("admin-")) return "admin";
  if (page.startsWith("staff-")) return "staff";
  return page;
}

function pageTitle(title, lead = "", actions = "") {
  return `
    <div class="page-head">
      <div>
        <h1 class="section-title">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ""}
      </div>
      ${actions ? `<div class="button-row">${actions}</div>` : ""}
    </div>
  `;
}

function renderHome() {
  const account = currentAccount();
  const teamCards = Object.values(teams)
    .map((team) => {
      const max = 220;
      return `
        <div class="list-item">
          <div class="item-main">${teamBadge(team)}</div>
          <strong>${team.score} 点</strong>
          <div class="progress" style="width:42%"><span style="width:${Math.min(100, team.score * 100 / max)}%;background:${team.color}"></span></div>
        </div>
      `;
    })
    .join("");

  layout(`
    <section class="hero">
      <div>
        <div class="hero-kicker">SCHOOL SPORTS FESTIVAL</div>
        <h1>SANFES 2026</h1>
        <p>競技、スケジュール、集合場所、持ち物、HELP募集までをまとめて確認できる公式ポータルです。</p>
        <div class="hero-actions" style="margin-top:18px">
          <span class="chip">開催日 2026/09/12</span>
          <span class="chip">公開デモ</span>
        </div>
      </div>
      <div class="hero-actions">
        ${button("スケジュール", "schedule", "accent")}
        ${button("競技ガイド", "competitions", "light")}
      </div>
    </section>

    <section class="grid four" style="margin-bottom:20px">
      ${statCard("参加生徒", "12", "ST")}
      ${statCard("競技数", "4", "CP")}
      ${statCard("HELP募集中", "2", "HP")}
      ${statCard("未読通知", account.unread || 0, "NT")}
    </section>

    <section class="grid two">
      <div class="grid">
        <div class="card">
          <div class="card-header">
            <span>お知らせ</span>
            ${button("すべて見る", "announcements", "ghost small")}
          </div>
          <div class="list">
            ${announcements.map(announcementItem).join("")}
          </div>
        </div>

        <div class="grid three">
          ${quickCard("競技ガイド", "competitions", "ルール・集合情報")}
          ${quickCard("資料", "documents", "マップ・様式")}
          ${quickCard("HELP募集", "help", "参加・キャンセル")}
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-header">
            <span>団スコア</span>
            ${button("団情報", "team/red", "ghost small")}
          </div>
          <div class="list">${teamCards}</div>
        </div>
        <div class="card accent">
          <div class="card-body">
            <h2 style="margin-top:0">現在の表示</h2>
            <p class="muted">${escapeHtml(account.name)} として画面を確認しています。</p>
            <div class="button-row">
              ${account.role === "student" ? button("マイページ", "my", "primary") : ""}
              ${hasStaff() ? button("委員業務", "staff", "accent") : ""}
              ${account.role === "admin" ? button("管理画面", "admin", "primary") : ""}
              ${account.role === "guest" ? button("ログイン", "login", "primary") : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  `);
}

function statCard(label, value, icon) {
  return `
    <div class="card stat-card">
      <span class="stat-icon">${icon}</span>
      <div>
        <div class="stat-value">${escapeHtml(value)}</div>
        <div class="stat-label">${escapeHtml(label)}</div>
      </div>
    </div>
  `;
}

function quickCard(title, route, sub) {
  return `
    <a class="card" href="#/${route}" data-link>
      <div class="card-body">
        <div class="item-title">${escapeHtml(title)}</div>
        <div class="item-sub">${escapeHtml(sub)}</div>
      </div>
    </a>
  `;
}

function announcementItem(a) {
  return `
    <a class="list-item action" href="#/announcements" data-link>
      <span>${badge(a.category, a.badge)}</span>
      <div class="item-main">
        <div class="item-title">${a.pinned ? "固定 " : ""}${escapeHtml(a.title)}</div>
        <div class="item-sub">${escapeHtml(a.body)}</div>
      </div>
      <span class="small muted">${escapeHtml(a.time)}</span>
    </a>
  `;
}

function renderLogin() {
  const rows = [
    ["student", "山田太郎", "集計委員", "student / student123"],
    ["admin", "学校側管理者", "本部・管理", "admin / admin123"],
    ["sato", "佐藤花子", "招集誘導委員", "sato / student123"],
    ["murata", "村田健", "競技審判", "murata / student123"],
    ["ogawa", "小川美咲", "救護委員", "ogawa / student123"],
    ["unassigned", "田中葵", "委員未割当", "tanaka / student123"]
  ];
  layout(`
    ${pageTitle("ログイン", "デモ用の表示アカウントを選んで画面遷移を確認できます。")}
    <section class="login-grid">
      <div class="card">
        <div class="card-header">ログインフォーム</div>
        <div class="card-body">
          <div class="field"><label>ユーザー名</label><input value="student"></div>
          <div class="field" style="margin-top:12px"><label>パスワード</label><input value="student123" type="password"></div>
          <button class="btn primary" style="width:100%;margin-top:16px" data-action="fake-login">ログイン</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header">デモアカウント</div>
        <div class="card-body">
          ${rows.map(([id, name, role, credential]) => `
            <div class="account-card">
              <div>
                <strong>${escapeHtml(name)}</strong>
                <div class="item-sub">${escapeHtml(role)} / ${escapeHtml(credential)}</div>
              </div>
              <button class="btn ghost small" data-action="login-as" data-id="${id}">表示</button>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `);
}

function renderSchedule() {
  layout(`
    ${pageTitle("スケジュール", "競技・式典・演舞の時間、場所、対象を一覧で確認できます。")}
    <div class="card">
      <div class="card-body">
        <div class="timeline">
          ${schedule.map(([time, title, place, category, target]) => `
            <div class="time-row">
              <div class="time-label">${escapeHtml(time)}</div>
              <div class="card time-card">
                <div class="item-title">${escapeHtml(title)} ${badge(category, categoryTone(category))}</div>
                <div class="item-sub">場所: ${escapeHtml(place)} / 対象: ${escapeHtml(target)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `);
}

function categoryTone(category) {
  if (category === "COMPETITION") return "blue";
  if (category === "CEREMONY") return "dark";
  if (category === "PERFORMANCE") return "green";
  return "yellow";
}

function renderCompetitions() {
  layout(`
    ${pageTitle("競技ガイド", "ルール、集合場所、持ち物、会場案内を確認できます。")}
    <section class="grid two">
      ${competitions.map((c) => `
        <article class="card">
          <div class="card-header">
            <span>${escapeHtml(c.name)}</span>
            ${badge(c.meetingTime, "blue")}
          </div>
          <div class="card-body">
            <p class="muted">${escapeHtml(c.summary)}</p>
            <table>
              <tbody>
                <tr><th>集合時間</th><td>${escapeHtml(c.meetingTime)}</td></tr>
                <tr><th>集合場所</th><td>${escapeHtml(c.meetingPlace)}</td></tr>
                <tr><th>持ち物</th><td>${c.requiredItems.map(escapeHtml).join(" / ")}</td></tr>
              </tbody>
            </table>
            <div class="button-row" style="margin-top:14px">
              ${button("詳細を見る", `competition/${c.id}`, "primary small")}
            </div>
          </div>
        </article>
      `).join("")}
    </section>
  `);
}

function renderCompetitionDetail() {
  const c = competitions.find((item) => item.id === state.selectedCompetition) || competitions[0];
  layout(`
    ${pageTitle(c.name, c.summary, button("一覧へ戻る", "competitions", "ghost"))}
    <section class="grid two">
      <div class="card">
        <div class="card-header">競技情報</div>
        <div class="card-body">
          <table>
            <tbody>
              <tr><th>集合時間</th><td>${escapeHtml(c.meetingTime)}</td></tr>
              <tr><th>集合場所</th><td>${escapeHtml(c.meetingPlace)}</td></tr>
              <tr><th>必要な持ち物</th><td>${c.requiredItems.map(escapeHtml).join(" / ")}</td></tr>
              <tr><th>ルール</th><td>${escapeHtml(c.rules)}</td></tr>
              <tr><th>会場案内</th><td>${escapeHtml(c.guide)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card accent">
        <div class="card-header">確認ポイント</div>
        <div class="card-body">
          <div class="check-grid">
            ${c.requiredItems.map((item) => `<div class="check-item done"><span class="check-dot">✓</span><span>${escapeHtml(item)}</span></div>`).join("")}
            <div class="check-item"><span class="check-dot"></span><span>集合10分前に移動開始</span></div>
          </div>
        </div>
      </div>
    </section>
  `);
}

function renderAnnouncements() {
  layout(`
    ${pageTitle("お知らせ", "重要連絡、場所・時間変更、HELP募集などを確認できます。")}
    <div class="card">
      <div class="list">${announcements.map(announcementItem).join("")}</div>
    </div>
  `);
}

function renderDocuments() {
  layout(`
    ${pageTitle("資料", "ガイド、マップ、ルール、様式などの資料リンクを表示します。")}
    <section class="grid three">
      ${documents.map(([title, desc, category]) => `
        <article class="card">
          <div class="card-header">
            <span>${escapeHtml(title)}</span>
            ${badge(category, "dark")}
          </div>
          <div class="card-body">
            <p class="muted">${escapeHtml(desc)}</p>
            <button class="btn ghost small" data-action="mock-download">資料を開く</button>
          </div>
        </article>
      `).join("")}
    </section>
  `);
}

function renderHelp() {
  if (currentAccount().role === "guest") {
    layout(`
      ${pageTitle("HELP募集", "HELP募集の確認にはログイン表示が必要です。", button("ログイン", "login", "primary"))}
      <div class="card"><div class="empty">表示アカウントを学生または管理者に切り替えてください。</div></div>
    `);
    return;
  }
  layout(`
    ${pageTitle("HELP募集", "募集中のHELPを確認し、参加・キャンセルを試せます。")}
    <section class="grid">
      ${helpRequests.map((h) => {
        const joined = state.joinedHelp.has(h.id);
        const shortage = Math.max(0, h.required - h.joined - (joined && h.id !== 1 ? 1 : 0));
        return `
          <article class="card">
            <div class="card-header">
              <span>${escapeHtml(h.title)}</span>
              ${badge(h.status === "OPEN" ? "募集中" : "締切", h.status === "OPEN" ? "green" : "dark")}
            </div>
            <div class="card-body">
              <p class="muted">${escapeHtml(h.description)}</p>
              <div class="grid four">
                ${miniInfo("日時", `${h.date} ${h.time}`)}
                ${miniInfo("場所", h.place)}
                ${miniInfo("参加", `${h.joined}/${h.required}`)}
                ${miniInfo("不足", `${shortage}名`)}
              </div>
              <div class="button-row" style="margin-top:14px">
                <button class="btn ${joined ? "ghost" : "accent"} small" data-action="toggle-help" data-id="${h.id}" ${h.status !== "OPEN" ? "disabled" : ""}>${joined ? "参加をキャンセル" : "参加する"}</button>
              </div>
            </div>
          </article>
        `;
      }).join("")}
    </section>
  `);
}

function miniInfo(label, value) {
  return `<div><div class="stat-label">${escapeHtml(label)}</div><div class="item-title">${escapeHtml(value)}</div></div>`;
}

function renderMyPage() {
  if (!isStudent()) {
    layout(`${pageTitle("マイページ", "学生アカウントで表示する画面です。", button("ログイン", "login", "primary"))}<div class="card"><div class="empty">学生アカウントに切り替えてください。</div></div>`);
    return;
  }
  const account = currentAccount();
  const team = teamOf(account);
  const checklist = Object.entries(state.checklist).map(([item, done]) => `
    <button class="check-item ${done ? "done" : ""}" data-action="toggle-check" data-item="${escapeHtml(item)}">
      <span class="check-dot">✓</span>
      <span class="item-title">${escapeHtml(item)}</span>
      <span class="badge ${done ? "success" : "dark"}" style="margin-left:auto">${done ? "準備OK" : "未準備"}</span>
    </button>
  `).join("");

  layout(`
    ${pageTitle("マイページ")}
    <section class="card accent" style="margin-bottom:22px">
      <div class="card-body">
        <div class="card-header" style="margin:-18px -18px 18px">今見るべき情報 ${account.unread ? badge(`未読${account.unread}`, "danger") : ""}</div>
        <div class="grid two">
          <div class="list">
            ${announcements.slice(0, 3).map(announcementItem).join("")}
          </div>
          <div class="card">
            <div class="card-body">
              <div class="stat-label">次に参加する競技</div>
              <div class="item-title">リレー</div>
              <div class="item-sub">09:30 / グラウンド本部前</div>
              <div class="button-row" style="margin-top:12px">
                ${button("競技詳細", "competition/2", "primary small")}
                ${button("会場案内", "documents", "ghost small")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid two">
      <div class="grid">
        <div class="card">
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:14px">
              <span class="stat-icon">人</span>
              <div>
                <div class="stat-value" style="font-size:1.6rem">${escapeHtml(account.name)}</div>
                <div class="muted">${escapeHtml(account.kana)}</div>
              </div>
              <div style="margin-left:auto">${team ? teamBadge(team) : ""}</div>
            </div>
            <hr style="border:0;border-top:1px solid var(--sf-border);margin:16px 0">
            <div class="grid three">
              ${miniInfo("学籍番号", account.studentNumber)}
              ${miniInfo("クラス", account.className)}
              ${miniInfo("所属団", team ? team.name : "未設定")}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">出場競技と集合情報</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>競技</th><th>集合時間</th><th>集合場所</th><th></th></tr></thead>
              <tbody>
                ${competitions.slice(0, 2).map((c) => `<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${c.meetingTime}</td><td>${escapeHtml(c.meetingPlace)}</td><td>${button("ガイド", `competition/${c.id}`, "ghost small")}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header">持ち物チェックリスト</div>
          <div class="card-body"><div class="check-grid">${checklist}</div></div>
        </div>
      </div>

      <div class="grid">
        ${committeeCard(account)}
        <div class="card">
          <div class="card-header">HELP参加状況 ${button("募集一覧", "help", "ghost small")}</div>
          <div class="list">
            <div class="list-item"><div class="item-main"><div class="item-title">受付・誘導スタッフ募集</div><div class="item-sub">9/12 08:30 / 正門前</div></div>${badge("参加中", "green")}</div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">通知</div>
          <div class="list">${announcements.map(announcementItem).join("")}</div>
        </div>
      </div>
    </section>
  `);
}

function committeeCard(account) {
  if (!account.committee) {
    return `
      <div class="card">
        <div class="card-header">委員（実行委員） ${button("希望を登録", "committee", "ghost small")}</div>
        <div class="card-body">
          <div class="empty" style="padding:14px">まだ委員に割り当てられていません。</div>
        </div>
      </div>
    `;
  }
  return `
    <div class="card">
      <div class="card-header">委員（実行委員） ${button("希望を登録", "committee", "ghost small")}</div>
      <div class="card-body">
        <div class="stat-label">担当委員</div>
        <div class="stat-value" style="font-size:1.4rem">${escapeHtml(account.committee)}</div>
        <p class="muted">${functionSummary(account.function)}</p>
        ${button("委員業務へ", "staff", "primary")}
      </div>
    </div>
  `;
}

function functionSummary(fn) {
  const map = {
    SCORING: "各競技の得点を集計し、本部に反映します。",
    MUSTER: "競技ごとの集合状況を更新します。",
    JUDGING: "順位と得点を記録します。",
    FIRST_AID: "救護に関する案内を確認します。"
  };
  return map[fn] || "委員業務の情報を確認します。";
}

function renderCommitteePreference() {
  if (!isStudent()) {
    layout(`${pageTitle("委員希望登録")}<div class="card"><div class="empty">学生アカウントに切り替えてください。</div></div>`);
    return;
  }
  layout(`
    ${pageTitle("委員希望登録", "第1希望から第3希望まで選択できます。")}
    <section class="grid two">
      <div class="card">
        <div class="card-header">希望入力</div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field"><label>第1希望</label><select><option>集計委員</option><option>招集誘導委員</option><option>競技審判</option></select></div>
            <div class="field"><label>第2希望</label><select><option>招集誘導委員</option><option>救護委員</option><option>放送委員</option></select></div>
            <div class="field"><label>第3希望</label><select><option>受付委員</option><option>巡回委員</option><option>美術委員</option></select></div>
            <div class="field"><label>備考</label><input value="当日は午前中の対応可能"></div>
          </div>
          <div class="button-row" style="margin-top:16px">
            <button class="btn accent" data-action="save">希望を保存</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">委員一覧</div>
        <div class="list">
          ${committees.map(([name, fn, desc]) => `<div class="list-item"><div class="item-main"><div class="item-title">${escapeHtml(name)}</div><div class="item-sub">${escapeHtml(desc)}</div></div>${badge(fn, "dark")}</div>`).join("")}
        </div>
      </div>
    </section>
  `);
}

function renderStaff() {
  if (!isStudent()) {
    layout(`${pageTitle("委員業務")}<div class="card"><div class="empty">学生アカウントに切り替えてください。</div></div>`, true);
    return;
  }
  const account = currentAccount();
  const content = account.committee
    ? `
      <div class="card accent">
        <div class="card-body">
          <div class="stat-label">担当委員</div>
          <div class="stat-value" style="font-size:1.6rem">${escapeHtml(account.committee)}</div>
          <p class="muted">${functionSummary(account.function)}</p>
          ${staffPanelAction(account.function)}
        </div>
      </div>
      ${account.function === "FIRST_AID" ? firstAidPanel() : ""}
    `
    : `<div class="card"><div class="empty"><h2>未割り当て</h2><p>委員が確定すると、ここに担当業務のパネルが表示されます。</p>${button("委員希望登録", "committee", "accent")}</div></div>`;

  layout(`
    <section class="grid admin">
      ${staffSidebar("dashboard")}
      <div>
        ${pageTitle("委員業務", `${escapeHtml(account.name)} さんの担当業務を表示しています。`)}
        ${content}
      </div>
    </section>
  `, true);
}

function staffPanelAction(fn) {
  if (fn === "MUSTER") return button("招集誘導パネルを開く", "staff-muster", "primary");
  if (fn === "JUDGING") return button("競技審判パネルを開く", "staff-judging", "primary");
  if (fn === "SCORING") return button("集計パネルを開く", "staff-scoring", "primary");
  return "";
}

function firstAidPanel() {
  return `
    <div class="card" style="margin-top:18px">
      <div class="card-header">救護委員 情報パネル</div>
      <div class="card-body">
        <div class="check-grid">
          <div class="check-item done"><span class="check-dot">✓</span><span>救護テント: 体育館入口</span></div>
          <div class="check-item done"><span class="check-dot">✓</span><span>本部連絡: 内線 204</span></div>
          <div class="check-item"><span class="check-dot"></span><span>専用入力パネルはありません</span></div>
        </div>
      </div>
    </div>
  `;
}

function staffSidebar(active) {
  return `
    <aside class="card sidebar">
      <div class="side-title">委員メニュー</div>
      <a class="side-link ${active === "dashboard" ? "active" : ""}" href="#/staff" data-link>ダッシュボード</a>
      <a class="side-link ${active === "muster" ? "active" : ""}" href="#/staff-muster" data-link>招集誘導</a>
      <a class="side-link ${active === "judging" ? "active" : ""}" href="#/staff-judging" data-link>競技審判</a>
      <a class="side-link ${active === "scoring" ? "active" : ""}" href="#/staff-scoring" data-link>集計</a>
    </aside>
  `;
}

function renderMuster() {
  layout(`
    <section class="grid admin">
      ${staffSidebar("muster")}
      <div>
        ${pageTitle("招集誘導", "競技ごとの出場者名簿を確認し、集合状況を更新します。")}
        <div class="card">
          <div class="card-header">綱引き / 集合状況</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>生徒</th><th>状態</th><th>メモ</th><th></th></tr></thead>
              <tbody>
                ${state.muster[1].map(([name, status, memo], index) => `
                  <tr>
                    <td><strong>${escapeHtml(name)}</strong></td>
                    <td>${badge(status, statusTone(status))}</td>
                    <td>${escapeHtml(memo || "-")}</td>
                    <td class="number"><button class="btn ghost small" data-action="muster-present" data-index="${index}">集合済みにする</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `, true);
}

function statusTone(status) {
  if (status === "PRESENT") return "green";
  if (status === "NOT_ARRIVED") return "yellow";
  if (status === "ABSENT") return "danger";
  return "dark";
}

function renderJudging() {
  layout(`
    <section class="grid admin">
      ${staffSidebar("judging")}
      <div>
        ${pageTitle("競技審判", "競技ごとの順位と得点を記録します。")}
        <div class="card">
          <div class="card-header">競技一覧</div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>競技</th><th>記録状況</th><th></th></tr></thead>
              <tbody>
                ${competitions.map((c) => `
                  <tr>
                    <td><strong>${escapeHtml(c.name)}</strong></td>
                    <td>${state.judgingSaved[c.id] ? badge("記録済み", "green") : badge("未記録", "dark")}</td>
                    <td class="number"><button class="btn primary small" data-action="open-judging" data-id="${c.id}">結果を記録</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div id="judgingDetail"></div>
      </div>
    </section>
  `, true);
}

function renderJudgingDetail(id) {
  const c = competitions.find((item) => item.id === id) || competitions[0];
  const target = document.getElementById("judgingDetail");
  if (!target) return;
  target.innerHTML = `
    <div class="card" style="margin-top:18px">
      <div class="card-header">${escapeHtml(c.name)} / 結果入力</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>団</th><th>順位</th><th>得点</th></tr></thead>
          <tbody>
            ${Object.values(teams).map((team, index) => `
              <tr>
                <td>${teamBadge(team)}</td>
                <td><input value="${index + 1}" style="width:90px"></td>
                <td><input value="${[100, 80, 60, 40][index]}" style="width:90px"></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="card-body"><button class="btn accent" data-action="save-judging" data-id="${c.id}">保存</button></div>
    </div>
  `;
}

function renderScoring() {
  const rows = Object.values(teams).map((team) => {
    const confirmed = state.confirmedScores[team.id];
    const dirty = confirmed !== team.score;
    return `
      <tr>
        <td>${teamBadge(team)}</td>
        <td class="number"><strong>${team.score}</strong></td>
        <td class="number">${confirmed}</td>
        <td>${dirty ? badge("未反映", "yellow") : badge("反映済み", "green")}</td>
      </tr>
    `;
  }).join("");

  layout(`
    <section class="grid admin">
      ${staffSidebar("scoring")}
      <div>
        ${pageTitle("集計", "競技審判が記録した結果から団別の得点を集計します。")}
        <section class="grid two">
          <div class="card">
            <div class="card-header">
              <span>団別集計</span>
              <button class="btn accent small" data-action="confirm-scoring">確定して本部に反映</button>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>団</th><th class="number">暫定合計</th><th class="number">確定スコア</th><th>状態</th></tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </div>
          <div class="card">
            <div class="card-header">競技別 記録状況</div>
            <div class="list">
              ${competitions.map((c) => `<div class="list-item"><div class="item-main"><div class="item-title">${escapeHtml(c.name)}</div></div>${state.judgingSaved[c.id] ? badge("記録済み", "green") : badge("未記録", "dark")}</div>`).join("")}
            </div>
          </div>
        </section>
      </div>
    </section>
  `, true);
}

function renderAdmin(section = "dashboard") {
  if (!isAdmin()) {
    layout(`${pageTitle("管理画面", "管理者アカウントで表示する画面です。", button("ログイン", "login", "primary"))}<div class="card"><div class="empty">学校側管理者に切り替えてください。</div></div>`, true);
    return;
  }
  const body = section === "dashboard" ? adminDashboard() : adminList(section);
  layout(`
    <section class="grid admin">
      ${adminSidebar(section)}
      <div>${body}</div>
    </section>
  `, true);
}

function adminSidebar(active) {
  const links = [
    ["dashboard", "ダッシュボード"],
    ["students", "学生・クラス"],
    ["teams", "団管理"],
    ["committees", "委員管理"],
    ["competitions", "競技管理"],
    ["schedules", "日程管理"],
    ["announcements", "お知らせ管理"],
    ["help", "HELP管理"],
    ["documents", "資料管理"]
  ];
  return `
    <aside class="card sidebar">
      <div class="side-title">管理メニュー</div>
      ${links.map(([id, label]) => `<a class="side-link ${active === id ? "active" : ""}" href="#/${id === "dashboard" ? "admin" : `admin-${id}`}" data-link>${label}</a>`).join("")}
    </aside>
  `;
}

function adminDashboard() {
  return `
    ${pageTitle("管理ダッシュボード")}
    <section class="grid four" style="margin-bottom:18px">
      ${statCard("登録生徒数", "12", "ST")}
      ${statCard("競技数", competitions.length, "CP")}
      ${statCard("HELP不足", "5", "HP")}
      ${statCard("お知らせ数", announcements.length, "NT")}
    </section>
    <section class="grid two">
      <div class="card">
        <div class="card-header">HELP募集状況 ${button("新規募集", "admin-help", "accent small")}</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>タイトル</th><th>日時</th><th>参加</th><th>不足</th><th>状態</th></tr></thead>
            <tbody>${helpRequests.map((h) => `<tr><td><strong>${escapeHtml(h.title)}</strong></td><td>${h.date} ${h.time}</td><td>${h.joined}/${h.required}</td><td>${Math.max(0, h.required - h.joined)}</td><td>${badge(h.status, h.status === "OPEN" ? "green" : "dark")}</td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">団スコア ${button("編集", "admin-teams", "ghost small")}</div>
        <div class="list">${Object.values(teams).map((team) => `<div class="list-item"><div class="item-main">${teamBadge(team)}</div><strong>${team.score} 点</strong><div class="progress" style="width:45%"><span style="width:${team.score / 2.2}%;background:${team.color}"></span></div></div>`).join("")}</div>
      </div>
    </section>
  `;
}

function adminList(section) {
  const map = {
    students: ["学生・クラス管理", ["学籍番号", "氏名", "クラス", "団", "委員"], [
      ["S001", "山田太郎", "IT2A", "赤団", "集計委員"],
      ["S002", "佐藤花子", "IT2A", "青団", "招集誘導委員"],
      ["S003", "村田健", "IT2B", "黄団", "競技審判"]
    ]],
    teams: ["団管理", ["団", "色", "スコア", "応援席", "入口"], Object.values(teams).map((t) => [t.name, t.color, `${t.score}点`, t.cheerSeat, t.entrance])],
    committees: ["委員管理", ["委員", "機能", "説明"], committees.map(([n, f, d]) => [n, f, d])],
    competitions: ["競技管理", ["競技", "集合時間", "集合場所", "持ち物"], competitions.map((c) => [c.name, c.meetingTime, c.meetingPlace, c.requiredItems.join(" / ")])],
    schedules: ["日程管理", ["時刻", "タイトル", "場所", "カテゴリ", "対象"], schedule],
    announcements: ["お知らせ管理", ["カテゴリ", "タイトル", "本文", "公開日時"], announcements.map((a) => [a.category, a.title, a.body, a.time])],
    help: ["HELP管理", ["タイトル", "日時", "場所", "必要人数", "状態"], helpRequests.map((h) => [h.title, `${h.date} ${h.time}`, h.place, h.required, h.status])],
    documents: ["資料管理", ["タイトル", "説明", "カテゴリ"], documents]
  };
  const [title, cols, rows] = map[section] || map.students;
  return `
    ${pageTitle(title, "", `<button class="btn accent" data-action="save">新規作成</button>`)}
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr>${cols.map((col) => `<th>${escapeHtml(col)}</th>`).join("")}<th></th></tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}<td class="number"><button class="btn ghost small" data-action="save">編集</button></td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTeamDetail(id = "red") {
  const team = teams[id] || teams.red;
  layout(`
    ${pageTitle(team.name, "団の場所、応援情報、現在スコアを確認できます。", button("ホームへ戻る", "home", "ghost"))}
    <section class="grid two">
      <div class="card accent">
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:14px">${teamBadge(team)}<div class="stat-value">${team.score} 点</div></div>
          <div style="margin-top:16px" class="progress"><span style="width:${team.score / 2.2}%;background:${team.color}"></span></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">応援情報</div>
        <div class="card-body">
          <table><tbody>
            <tr><th>場所</th><td>${escapeHtml(team.venue)}</td></tr>
            <tr><th>入口</th><td>${escapeHtml(team.entrance)}</td></tr>
            <tr><th>応援席</th><td>${escapeHtml(team.cheerSeat)}</td></tr>
            <tr><th>応援コール</th><td>${escapeHtml(team.call)}</td></tr>
            <tr><th>注意事項</th><td>${escapeHtml(team.note)}</td></tr>
          </tbody></table>
        </div>
      </div>
    </section>
  `);
}

function render() {
  setPageFromHash();
  const page = state.page;
  if (page === "home") renderHome();
  else if (page === "login") renderLogin();
  else if (page === "schedule") renderSchedule();
  else if (page === "competitions") renderCompetitions();
  else if (page === "competition") renderCompetitionDetail();
  else if (page === "announcements") renderAnnouncements();
  else if (page === "documents") renderDocuments();
  else if (page === "help") renderHelp();
  else if (page === "my") renderMyPage();
  else if (page === "committee") renderCommitteePreference();
  else if (page === "staff") renderStaff();
  else if (page === "staff-muster") renderMuster();
  else if (page === "staff-judging") renderJudging();
  else if (page === "staff-scoring") renderScoring();
  else if (page === "admin") renderAdmin("dashboard");
  else if (page.startsWith("admin-")) renderAdmin(page.replace("admin-", ""));
  else if (page.startsWith("team/")) renderTeamDetail(page.split("/")[1]);
  else {
    location.hash = "#/home";
  }
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (!action) return;
  const type = action.dataset.action;

  if (type === "toggle-nav") {
    document.getElementById("mainNav").classList.toggle("open");
  } else if (type === "switch-account") {
    setAccount(action.value);
  } else if (type === "login-as") {
    setAccount(action.dataset.id);
    location.hash = action.dataset.id === "admin" ? "#/admin" : "#/my";
  } else if (type === "fake-login") {
    setAccount("student");
    location.hash = "#/my";
  } else if (type === "toggle-help") {
    const id = Number(action.dataset.id);
    if (state.joinedHelp.has(id)) {
      state.joinedHelp.delete(id);
      showToast("HELP参加をキャンセルしました。");
    } else {
      state.joinedHelp.add(id);
      showToast("HELPに参加しました。");
    }
    renderHelp();
  } else if (type === "toggle-check") {
    const item = action.dataset.item;
    state.checklist[item] = !state.checklist[item];
    showToast("持ち物チェックを更新しました。");
    renderMyPage();
  } else if (type === "muster-present") {
    const index = Number(action.dataset.index);
    state.muster[1][index][1] = "PRESENT";
    state.muster[1][index][2] = "更新済み";
    showToast("集合状況を更新しました。");
    renderMuster();
  } else if (type === "open-judging") {
    renderJudgingDetail(Number(action.dataset.id));
  } else if (type === "save-judging") {
    state.judgingSaved[Number(action.dataset.id)] = true;
    showToast("競技結果を保存しました。");
    renderJudging();
  } else if (type === "confirm-scoring") {
    Object.values(teams).forEach((team) => {
      state.confirmedScores[team.id] = team.score;
    });
    showToast("団スコアを本部に反映しました。");
    renderScoring();
  } else if (type === "mock-download") {
    showToast("資料表示のデモです。");
  } else if (type === "save") {
    showToast("保存しました。");
  }
});

document.addEventListener("change", (event) => {
  const action = event.target.closest("[data-action]");
  if (action?.dataset.action === "switch-account") {
    setAccount(action.value);
  }
});

window.addEventListener("hashchange", render);

document.getElementById("accountSelect").value = state.account;
render();
