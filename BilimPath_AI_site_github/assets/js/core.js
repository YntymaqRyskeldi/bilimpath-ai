/* BilimPath AI 2.0 — өзек: иконкалар, дерек қоймасы, көмекші функциялар */
(function () {
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>',
    code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
    gamepad: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5M15 11h.01M18 14h.01"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a6.5 6.5 0 0 1 4 6.5"/>',
    teacher: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M7 9l3 3 6-5"/>',
    flame: '<path d="M12 22c4 0 7-2.7 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8 0 4.3 3 7 7 7z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    heart: '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>',
    gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9l4-6 4 6z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/><circle cx="12" cy="3" r="1"/>',
    robot: '<rect x="5" y="7" width="14" height="10" rx="3"/><path d="M12 3v4M8 21v-4M16 21v-4M2 11v3M22 11v3"/><circle cx="9.5" cy="12" r="1.2"/><circle cx="14.5" cy="12" r="1.2"/>',
    binary: '<rect x="4" y="4" width="5" height="7" rx="2"/><path d="M15 4h2v7M15 11h4M5 20h4M7 20v-7H5"/><rect x="15" y="13" width="5" height="7" rx="2"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
    box: '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
    repeat: '<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12 19 5"/>',
    server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>',
    sparkles: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    logic: '<path d="M4 6h6a6 6 0 0 1 0 12H4z"/><path d="M16 12h5M1 9h3M1 15h3"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h0a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    cards: '<rect x="2" y="6" width="14" height="16" rx="2"/><path d="M6 2h14a2 2 0 0 1 2 2v14"/>',
    video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    crown: '<path d="M3 7l4 4 5-7 5 7 4-4-2 12H5z"/>',
    medal: '<circle cx="12" cy="15" r="6"/><path d="M8 3h8l-2 6h-4z"/><path d="m12 12 1 2h2l-1.5 1.3.5 2-2-1.2-2 1.2.5-2L9 14h2z"/>',
    rotate: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pause: '<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>',
    puzzle: '<path d="M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3z"/>',
    flag: '<path d="M5 22V4M5 4h11l-2 4 2 4H5"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    wand: '<path d="m15 4 5 5L9 20l-5-5z"/><path d="M5 3v4M3 5h4M19 15v4M17 17h4"/>',
  };
  window.ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${P[n] || P.star}</svg>`;

  window.mascot = (mood = 'happy') => `
  <svg viewBox="0 0 200 220" class="mascot-svg" aria-hidden="true">
    <defs><linearGradient id="mg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a3e635"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
    <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2a6b"/><stop offset="1" stop-color="#0b1030"/></linearGradient></defs>
    <ellipse cx="100" cy="212" rx="60" ry="8" fill="rgba(0,0,0,.35)"/>
    <line x1="100" y1="28" x2="100" y2="8" stroke="#a3e635" stroke-width="6" stroke-linecap="round"/>
    <circle cx="100" cy="8" r="8" fill="#fbbf24"><animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite"/></circle>
    <rect x="28" y="26" width="144" height="104" rx="40" fill="url(#mg1)"/>
    <rect x="44" y="44" width="112" height="68" rx="28" fill="url(#mg2)"/>
    ${mood === 'wow'
      ? '<circle cx="76" cy="76" r="12" fill="#22d3ee"/><circle cx="124" cy="76" r="12" fill="#22d3ee"/><ellipse cx="100" cy="100" rx="7" ry="6" fill="#fb7185"/>'
      : '<rect x="64" y="64" width="22" height="24" rx="11" fill="#22d3ee"><animate attributeName="height" values="24;3;24" keyTimes="0;.05;.1" dur="4s" repeatCount="indefinite"/></rect><rect x="114" y="64" width="22" height="24" rx="11" fill="#22d3ee"><animate attributeName="height" values="24;3;24" keyTimes="0;.05;.1" dur="4s" repeatCount="indefinite"/></rect><path d="M84 98q16 12 32 0" stroke="#a3e635" stroke-width="5" fill="none" stroke-linecap="round"/>'}
    <circle cx="20" cy="78" r="12" fill="#8b5cf6"/><circle cx="180" cy="78" r="12" fill="#8b5cf6"/>
    <rect x="52" y="136" width="96" height="62" rx="24" fill="#8b5cf6"/>
    <rect x="76" y="152" width="48" height="26" rx="10" fill="#0b1030"/>
    <text x="100" y="171" text-anchor="middle" font-family="BPMono,monospace" font-size="15" font-weight="700" fill="#a3e635">01</text>
    <rect x="20" y="142" width="26" height="46" rx="13" fill="#7c3aed" transform="rotate(${mood === 'wow' ? -40 : 14} 33 146)"/>
    <rect x="154" y="142" width="26" height="46" rx="13" fill="#7c3aed" transform="rotate(${mood === 'wow' ? 40 : -14} 167 146)"/>
  </svg>`;

  // ---------- дерек қоймасы ----------
  const KEY = 'bilimpath2';
  const today = () => new Date().toISOString().slice(0, 10);
  const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
  const fresh = () => ({
    v: 2, user: null, xp: 0, gems: 50, hearts: 5, streak: 0, bestStreak: 0, lastDay: '',
    daily: { date: today(), xp: 0, lessons: 0, quiz: 0, code: 0 },
    lessons: {}, skills: {}, diag9: null, gap: null, badges: [], codeRuns: 0,
    games: { pc: 0, robot: 0, sort: 0 }, activity: {}, theme: 'dark', answers: { ok: 0, all: 0 }, history: [],
  });
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
  if (!S.v) S = fresh();
  window.S = S;
  window.save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  window.resetAll = () => { S = window.S = fresh(); save(); location.hash = '#/'; location.reload(); };

  function touchDay() {
    const t = today();
    if (S.daily.date !== t) S.daily = { date: t, xp: 0, lessons: 0, quiz: 0, code: 0 };
    if (S.lastDay !== t) {
      if (S.lastDay && daysBetween(S.lastDay, t) === 1) S.streak += 1; else if (!S.lastDay || daysBetween(S.lastDay, t) > 1) S.streak = 1;
      S.bestStreak = Math.max(S.bestStreak, S.streak);
      S.lastDay = t; S.hearts = 5;
    }
  }
  window.touchDay = touchDay;

  window.LEVELS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000, 5000];
  window.levelOf = (xp) => { let l = 1; LEVELS.forEach((v, i) => { if (xp >= v) l = i + 1; }); return Math.min(l, LEVELS.length); };
  window.levelProg = (xp) => { const l = levelOf(xp); const a = LEVELS[l - 1], b = LEVELS[l] || a + 1000; return { l, a, b, p: Math.min(100, ((xp - a) / (b - a)) * 100) }; };
  window.RANKS = ['Жаңа бастаушы', 'Бит', 'Байт', 'Алгоритмші', 'Кодер', 'Бағдарламашы', 'Әзірлеуші', 'Инженер', 'Архитектор', 'ЖИ-шебер', 'Гуру', 'Аңыз'];

  window.addXP = (n, ev) => {
    touchDay();
    const before = levelOf(S.xp);
    S.xp += n; S.daily.xp += n; S.gems += Math.round(n / 5);
    S.activity[today()] = (S.activity[today()] || 0) + Math.max(1, Math.round(n / 4));
    if (ev) { const r = ev.target ? ev.target.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 }; flyXP('+' + n + ' XP', r.left + r.width / 2, r.top); }
    if (levelOf(S.xp) > before) { setTimeout(() => { confetti(); toast('Жаңа деңгей! ' + levelOf(S.xp) + ' · ' + RANKS[levelOf(S.xp) - 1]); sfx('level'); }, 400); }
    checkBadges(); save(); refreshTop();
  };
  window.loseHeart = () => { S.hearts = Math.max(0, S.hearts - 1); save(); refreshTop(); };

  // дағды бағасы (экспоненциалды тегістеу — ЖИ модельдің қарапайым нұсқасы)
  window.updateSkill = (id, correct) => {
    if (!id) return;
    const old = S.skills[id] == null ? 50 : S.skills[id];
    S.skills[id] = Math.round(old * 0.7 + (correct ? 100 : 0) * 0.3);
  };

  // ---------- жетістіктер ----------
  window.BADGES = [
    { id: 'first', name: 'Алғашқы қадам', d: 'Алғашқы сабақты аяқта', ic: 'flag', c: 'var(--lime)', test: () => Object.values(S.lessons).some(l => l.done) },
    { id: 'diag', name: 'Өзіңді таны', d: 'Диагностикадан өт', ic: 'target', c: 'var(--cyan)', test: () => !!S.diag9 || !!S.gap },
    { id: 'gap', name: 'Олқылық аңшысы', d: 'Олқылық тестін тапсыр', ic: 'radar', c: 'var(--violet)', test: () => !!S.gap },
    { id: 'streak3', name: 'Үш күн қатар', d: '3 күндік серия', ic: 'flame', c: '#ff9f43', test: () => S.bestStreak >= 3 },
    { id: 'coder', name: 'Код шебері', d: '10 рет код іске қос', ic: 'code', c: 'var(--blue)', test: () => S.codeRuns >= 10 },
    { id: 'robot', name: 'Робот инженері', d: 'Робот ойынының 5 деңгейі', ic: 'robot', c: 'var(--pink)', test: () => S.games.robot >= 5 },
    { id: 'pc', name: 'Компьютер шебері', d: '3D компьютерді жина', ic: 'cpu', c: 'var(--amber)', test: () => S.games.pc >= 1 },
    { id: 'xp500', name: '500 XP', d: '500 тәжірибе ұпайы', ic: 'bolt', c: 'var(--lime)', test: () => S.xp >= 500 },
    { id: 'perfect', name: 'Мінсіз', d: 'Тестті 100% тапсыр', ic: 'star', c: 'var(--amber)', test: () => Object.values(S.lessons).some(l => l.best === 100) },
    { id: 'five', name: '5 сабақ', d: '5 сабақты аяқта', ic: 'book', c: 'var(--cyan)', test: () => Object.values(S.lessons).filter(l => l.done).length >= 5 },
    { id: 'sort', name: 'Сұрыптау сиқыршысы', d: 'Сұрыптау визуализаторы', ic: 'wand', c: 'var(--violet)', test: () => S.games.sort >= 1 },
    { id: 'polyglot', name: 'Полиглот', d: '3 тілде код іске қос', ic: 'globe', c: 'var(--coral)', test: () => (S.langs || []).length >= 3 },
  ];
  let silentBadges = false;
  function checkBadges() {
    const nw = BADGES.filter(b => !S.badges.includes(b.id) && b.test());
    if (!nw.length) return;
    nw.forEach(b => S.badges.push(b.id));
    if (silentBadges) return;
    setTimeout(() => { toast(nw.length === 1 ? 'Жаңа белгі: ' + nw[0].name : nw.length + ' жаңа белгі ашылды!'); confetti(); sfx('level'); }, 700);
  }
  window.checkBadges = checkBadges;

  // ---------- UI көмекшілері ----------
  window.$ = (s, r = document) => r.querySelector(s);
  window.$$ = (s, r = document) => [...r.querySelectorAll(s)];
  window.esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  window.toast = (m) => { let w = $('.toast-wrap'); if (!w) { w = document.createElement('div'); w.className = 'toast-wrap'; document.body.append(w); } const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; w.append(t); setTimeout(() => t.remove(), 2600); };
  window.flyXP = (txt, x, y) => { const e = document.createElement('div'); e.className = 'xpfly'; e.textContent = txt; e.style.left = x - 30 + 'px'; e.style.top = y - 10 + 'px'; document.body.append(e); setTimeout(() => e.remove(), 1100); };
  let actx;
  window.sfx = (k) => {
    if (S.mute) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const seq = { ok: [[660, .08], [880, .12]], bad: [[220, .15], [180, .2]], level: [[523, .1], [659, .1], [784, .1], [1046, .2]], click: [[440, .04]] }[k] || [[440, .05]];
      let t = actx.currentTime;
      seq.forEach(([f, d]) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.12, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); t += d * .9; });
    } catch (e) {}
  };
  window.confetti = () => {
    const c = document.createElement('canvas'); c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight; document.body.append(c);
    const x = c.getContext('2d'); const cols = ['#a3e635', '#22d3ee', '#8b5cf6', '#fbbf24', '#fb7185', '#f472b6'];
    const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35, vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 4, s: Math.random() * 8 + 4, c: cols[(Math.random() * cols.length) | 0], r: Math.random() * 6 }));
    let f = 0; (function step() { x.clearRect(0, 0, c.width, c.height); ps.forEach(p => { p.vy += .45; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); }); if (++f < 120) requestAnimationFrame(step); else c.remove(); })();
  };
  window.modal = (html) => { const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="card glow">${html}</div>`; m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.remove(); }); document.body.append(m); return m; };

  // Python синтаксисін бояу
  window.hl = (code, lang = 'py') => {
    let s = esc(code);
    const st = []; const keep = h => { st.push(h); return '\uE000' + String.fromCharCode(0xE100 + st.length - 1) + '\uE001'; };
    if (lang === 'html') {
      s = s.replace(/(&lt;\/?)([a-zA-Z0-9]+)/g, (m, a, b) => a + keep(`<span class="kw">${b}</span>`)).replace(/(&quot;[^&]*?&quot;)/g, m => keep(`<span class="st">${m}</span>`));
    } else {
      const cm = lang === 'py' ? /(#[^\n]*)/g : /(\/\/[^\n]*|--[^\n]*)/g;
      s = s.replace(cm, m => keep(`<span class="cm">${m}</span>`));
      s = s.replace(/(&quot;.*?&quot;|'[^'\n]*')/g, m => keep(`<span class="st">${m}</span>`));
      const kws = { py: 'def|return|if|elif|else|for|while|in|import|from|as|and|or|not|True|False|None|break|continue|class|try|except|with|lambda|pass', js: 'function|return|if|else|for|while|let|const|var|new|true|false|null|of|in|class|break|continue', sql: 'SELECT|FROM|WHERE|ORDER|BY|INSERT|INTO|VALUES|CREATE|TABLE|INTEGER|TEXT|AND|OR|NOT|LIMIT|DESC|ASC|GROUP|COUNT|AVG|SUM|MAX|MIN|AS|UPDATE|SET|DELETE|LIKE|REAL', cpp: 'int|float|double|char|bool|void|return|if|else|for|while|include|using|namespace|std|cout|cin|endl|string|true|false|vector' }[lang] || '';
      if (kws) s = s.replace(new RegExp('\\b(' + kws + ')\\b', lang === 'sql' ? 'gi' : 'g'), m => keep(`<span class="kw">${m}</span>`));
      s = s.replace(/\b([a-zA-Z_]\w*)(?=\()/g, m => keep(`<span class="fn">${m}</span>`));
      s = s.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="nu">$1</span>');
    }
    return s.replace(/\uE000([\uE100-\uEFFF])\uE001/g, (m, c) => st[c.charCodeAt(0) - 0xE100]);
  };

  // ---------- оқу мазмұны: 5–9 сынып ----------
  const sec9 = [
    { id: 'g9u1', title: 'Ақпаратпен жұмыс жасау', icon: 'globe', skill: 'n9s1', lessons: window.section1Lessons },
    { id: 'g9u2', title: 'Компьютер таңдаймыз', icon: 'cpu', skill: 'n9s2', lessons: window.section2Lessons },
    { id: 'g9u3', title: 'Деректер базасы', icon: 'database', skill: 'n9s3', lessons: window.section3Lessons },
    { id: 'g9u4', title: 'Python-да алгоритмдер', icon: 'code', skill: 'n9s4', lessons: window.section4Lessons },
    { id: 'g9u5', title: 'Python-да 2D ойын', icon: 'gamepad', skill: 'n9s5', lessons: window.section5Lessons },
  ];
  window.CURR = [...window.GRADES58, { grade: 9, units: sec9 }];
  window.UNIT_COLORS = [['var(--lime)', 'var(--lime-d)'], ['var(--cyan)', 'var(--cyan-d)'], ['var(--amber)', 'var(--amber-d)'], ['#c4b5fd', 'var(--violet-d)'], ['var(--coral)', 'var(--coral-d)']];
  window.ALL = [];
  CURR.forEach(g => g.units.forEach((u, ui) => u.lessons.forEach((l, li) => ALL.push(Object.assign(l, { grade: g.grade, unit: u, ui, li })))));
  window.lessonById = id => ALL.find(l => l.id === id);
  window.skillById = id => SKILLS.find(s => s.id === id);
  window.skillLessons = sid => ALL.filter(l => l.unit.skill === sid);

  // ---------- адаптивті ұсыныс (ЖИ-модуль) ----------
  // 1) әлсіз дағдыны табады; 2) оның алғышарты әлсіз болса — алдымен соны ұсынады; 3) қайталау уақыты келген сабақтарды қосады.
  window.recommend = () => {
    const g = (S.user && S.user.grade) || 9;
    const sc = id => (S.skills[id] == null ? null : S.skills[id]);
    const out = [];
    const due = Object.entries(S.lessons).filter(([id, l]) => l.review && l.review <= today()).map(([id]) => lessonById(id)).filter(Boolean);
    due.slice(0, 2).forEach(l => out.push({ l, why: 'Қайталау уақыты келді (1–3 күндік жоспар)', tag: 'Қайталау', c: 'amber' }));
    const tested = SKILLS.filter(s => sc(s.id) != null && s.g <= g).sort((a, b) => sc(a.id) - sc(b.id));
    for (const s of tested) {
      if (sc(s.id) >= 60) break;
      const weakPre = s.pre.map(skillById).filter(p => p && sc(p.id) != null && sc(p.id) < 60);
      const target = weakPre[0] || s;
      const ls = skillLessons(target.id).filter(l => !(S.lessons[l.id] && S.lessons[l.id].best >= 85));
      if (ls[0] && !out.find(o => o.l.id === ls[0].id)) out.push({ l: ls[0], why: weakPre[0] ? `«${s.name}» үшін алдымен «${target.name}» (${target.g}-сынып) олқылығын толтыру керек` : `«${s.name}» дағдысы әлсіз: ${sc(s.id)}%`, tag: weakPre[0] ? 'Олқылық' : 'Әлсіз тақырып', c: weakPre[0] ? 'violet' : 'coral' });
      if (out.length >= 4) break;
    }
    const next = ALL.filter(l => l.grade === g).find(l => !(S.lessons[l.id] && S.lessons[l.id].done));
    if (next && !out.find(o => o.l.id === next.id)) out.push({ l: next, why: 'Оқу жолындағы келесі сабақ', tag: 'Келесі қадам', c: 'lime' });
    return out.slice(0, 4);
  };
  window.levelFor = (pct) => (pct < 60 ? 'A' : pct < 85 ? 'B' : 'C');

  // демо-оқушы (жюри мен көрсетілім үшін)
  window.loadDemo = () => {
    const d = new Date(); const ds = i => { const x = new Date(d); x.setDate(d.getDate() - i); return x.toISOString().slice(0, 10); };
    Object.assign(S, fresh(), {
      user: { name: 'Демо оқушы', grade: 9, color: 1 }, xp: 1260, gems: 340, hearts: 4, streak: 6, bestStreak: 9, lastDay: today(),
      diag9: { scores: [80, 60, 72, 48, 40], percent: 60, date: ds(9) },
      gap: { date: ds(9), res: {} }, codeRuns: 14, langs: ['py', 'js', 'html'], games: { pc: 1, robot: 4, sort: 1 },
      answers: { ok: 148, all: 190 },
    });
    S.daily = { date: today(), xp: 40, lessons: 1, quiz: 2, code: 1 };
    const sk = { n5dev: 90, n5info: 85, n5graph: 80, n5algo: 92, n5robot: 70, n6net: 78, n6bits: 66, n63d: 74, n6loopblk: 70, n6sensor: 55, n7sys: 82, n7pyvar: 52, n7ai: 75, n8num: 58, n8logic: 62, n8loop: 41, n8web: 70, n8ml: 64, n9s1: 88, n9s2: 74, n9s3: 80, n9s4: 57, n9s5: 52 };
    S.skills = sk; GAP_TEST.forEach(q => S.gap.res[q.s] = sk[q.s] >= 60 ? 1 : 0);
    ['s1t1', 's1t2', 's1t3', 's1t4', 's2t1', 's2t2', 's3t1', 's3t2', 's3t3', 's4t1', 'g8l3', 'g7l2'].forEach((id, i) => S.lessons[id] = { done: true, best: [100, 90, 85, 80, 95, 70, 88, 76, 90, 64, 58, 72][i], attempts: 1 + (i % 2), review: i === 9 ? today() : ds(-3) });
    for (let i = 0; i < 14; i++) S.activity[ds(i)] = [35, 28, 40, 22, 0, 31, 45, 26, 18, 38, 30, 12, 25, 20][i];
    S.history = [{ d: ds(9), p: 60 }, { d: ds(6), p: 66 }, { d: ds(3), p: 72 }, { d: ds(0), p: 78 }];
    silentBadges = true; checkBadges(); silentBadges = false;
    save();
  };
})();
