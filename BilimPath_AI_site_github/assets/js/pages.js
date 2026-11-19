/* BilimPath AI 2.0 — беттер және маршрутизатор */
(function () {
  const NAV = [
    ['grp', 'Оқу'],
    ['#/', 'home', 'Басты бет'],
    ['#/learn', 'map', 'Оқу жолы'],
    ['#/gap', 'radar', 'Олқылық картасы', 'ЖАҢА'],
    ['#/diag', 'target', 'Диагностика'],
    ['#/videos', 'video', 'Видео сабақтар'],
    ['grp', 'Практика'],
    ['#/lab', 'code', 'Код зертханасы'],
    ['#/courses', 'book', 'Тілдер курсы'],
    ['#/games', 'gamepad', '3D ойындар', 'ЖАҢА'],
    ['#/chat', 'chat', 'Чаттар'],
    ['#/cards', 'cards', 'Флэш-карталар'],
    ['grp', 'Жетістік'],
    ['#/progress', 'chart', 'Менің прогресім'],
    ['#/league', 'trophy', 'Лига және белгілер'],
    ['#/teacher', 'teacher', 'Мұғалім панелі'],
    ['#/about', 'info', 'Жоба туралы'],
  ];
  const TABS = [['#/', 'home', 'Басты'], ['#/learn', 'map', 'Оқу'], ['#/lab', 'code', 'Код'], ['#/games', 'gamepad', 'Ойын'], ['#/chat', 'chat', 'Чат']];

  function shell() {
    document.body.innerHTML = `<div class="app">
      <aside class="side"><a class="brand" href="#/"><span class="logo">${ic('sparkles')}</span><span>BilimPath AI<small>Информатика және ЖИ · 5–9</small></span></a>
      <nav class="nav">${NAV.map(n => n[0] === 'grp' ? `<div class="grp">${n[1]}</div>` : `<a href="${n[0]}">${ic(n[1])}<span>${n[2]}</span>${n[3] ? `<span class="badge-new">${n[3]}</span>` : ''}</a>`).join('')}</nav>
      <div class="card" style="margin-top:18px;padding:14px"><div class="row"><b style="font-size:13px">Түн режимі</b><span class="sp"></span><button class="btn ghost sm" id="themeBtn">${ic('sun')}</button></div></div></aside>
      <div class="main"><header class="top"><div class="crumb" id="crumb"></div><div id="topstats" class="row" style="gap:8px"></div></header><div id="view"></div></div></div>
      <nav class="tabbar">${TABS.map(t => `<a href="${t[0]}">${ic(t[1])}<span>${t[2]}</span></a>`).join('')}<a href="javascript:void 0" id="moreBtn">${ic('layout')}<span>Мәзір</span></a></nav>`;
    $('#moreBtn').onclick = () => { const m = modal(`<div class="row"><h3 style="margin:0">Барлық бөлімдер</h3><span class="sp"></span><button class="btn ghost sm" data-close>${ic('x')}</button></div><nav class="nav" style="margin-top:10px">${NAV.filter(n => n[0] !== 'grp').map(n => `<a href="${n[0]}" data-close>${ic(n[1])}<span>${n[2]}</span>${n[3] ? `<span class="badge-new">${n[3]}</span>` : ''}</a>`).join('')}</nav>`); };
    $('#themeBtn').onclick = () => { S.theme = S.theme === 'light' ? 'dark' : 'light'; save(); applyTheme(); };
    applyTheme();
  }
  function applyTheme() { document.body.classList.toggle('light', S.theme === 'light'); }
  window.refreshTop = () => {
    const t = $('#topstats'); if (!t) return;
    const u = S.user || { name: 'Қонақ' };
    t.innerHTML = `<span class="stat fire" title="Күндік серия">${ic('flame')}${S.streak}</span><span class="stat xp" title="Тәжірибе ұпайы">${ic('bolt')}${S.xp}</span><span class="stat heart" title="Өмір">${ic('heart')}${S.hearts}</span><span class="stat gem" title="Кристалдар">${ic('gem')}${S.gems}</span><a href="#/progress" class="avatar" title="${esc(u.name)}">${esc(u.name[0] || 'Қ')}</a>`;
  };

  // ---------- маршруттар ----------
  const routes = {};
  window.route = (p, fn) => routes[p] = fn;
  function go() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean);
    const key = '/' + (parts[0] || '');
    const fn = routes[key] || routes['/'];
    $$('.nav a, .tabbar a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + key));
    const v = $('#view'); v.className = 'page'; void v.offsetWidth;
    v.innerHTML = '';
    fn(v, parts.slice(1), new URLSearchParams(qs || ''));
    const nav = NAV.find(n => n[0] === '#' + key);
    $('#crumb').textContent = nav ? nav[2] : 'BilimPath AI';
    window.scrollTo(0, 0);
    refreshTop();
  }

  window.startApp = () => { shell(); touchDay(); save(); addEventListener('hashchange', go); go(); if (!S.user && !sessionStorage.getItem('bp-skip')) setTimeout(onboarding, 300); };

  function onboarding() {
    const m = modal(`<div style="text-align:center"><div style="width:130px;margin:0 auto">${mascot('wow')}</div><h2>Сәлем! Мен — Бит 👋</h2><p class="muted">BilimPath AI — 5–9 сынып информатикасын ойын арқылы меңгеруге көмектесетін ЖИ-көмекші. Тіркелусіз бірден көруге болады.</p></div>
      <div class="grid" style="gap:10px;margin-top:14px"><input class="inp" id="obName" placeholder="Атың (міндетті емес)"><select class="inp" id="obGrade">${[5, 6, 7, 8, 9].map(g => `<option value="${g}" ${g === 9 ? 'selected' : ''}>${g}-сынып</option>`).join('')}</select>
      <button class="btn" id="obGo">${ic('play')} Оқуды бастау</button><button class="btn violet" id="obDemo">${ic('eye')} Демо-режимде қарау (жюри үшін)</button></div>`);
    $('#obGo', m).onclick = () => { S.user = { name: $('#obName', m).value.trim() || 'Оқушы', grade: +$('#obGrade', m).value, color: 0 }; save(); m.remove(); go(); };
    $('#obDemo', m).onclick = () => { loadDemo(); m.remove(); go(); toast('Демо-оқушы жүктелді'); };
    m.addEventListener('click', e => { if (e.target === m) sessionStorage.setItem('bp-skip', 1); });
  }
  window.onboarding = onboarding;

  const lessonCard = (l, extra = '') => `<a href="#/lesson/${l.id}" class="card" style="display:flex;gap:14px;align-items:center;padding:14px 16px"><div class="iconbox ib-cyan">${ic(l.unit.icon)}</div><div style="min-width:0;flex:1"><div class="dim" style="font-size:12px;font-weight:700">${l.grade}-сынып · ${esc(l.unit.title)}</div><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(l.title)}</b>${extra}</div>${ic('right')}</a>`;

  // ---------- БАСТЫ БЕТ ----------
  route('/', (v) => {
    const u = S.user || { name: 'Қонақ', grade: 9 };
    const lp = levelProg(S.xp);
    const rec = recommend();
    const done = Object.values(S.lessons).filter(l => l.done).length;
    const quests = [
      ['Бүгін 50 XP жина', Math.min(S.daily.xp, 50), 50, 'bolt', 'lime'],
      ['1 сабақ аяқта', Math.min(S.daily.lessons, 1), 1, 'book', 'cyan'],
      ['Кодты 1 рет іске қос', Math.min(S.daily.code, 1), 1, 'code', 'violet'],
    ];
    const league = leagueData();
    v.innerHTML = `
    <section class="hero"><div class="mascot">${mascot()}</div><div class="hero-inner">
      <div class="chip lime">${ic('flame')} ${S.streak} күндік серия · ${RANKS[lp.l - 1]}</div>
      <h1 style="margin-top:12px">Сәлем, ${esc(u.name)}! Бүгін не үйренеміз?</h1>
      <p style="color:#dbe1ff;max-width:520px">ЖИ сенің жауаптарыңды талдап, ${u.grade}-сыныпқа дейінгі өтпей қалған тақырыптарды тауып, жеке оқу жолын құрады.</p>
      <div class="row" style="margin-top:16px"><a class="btn" href="#/lesson/${(rec[0] && rec[0].l.id) || 's1t1'}">${ic('play')} Жалғастыру</a><a class="btn ghost" href="#/gap">${ic('radar')} Олқылық картасы</a></div>
      <div style="margin-top:18px;max-width:420px"><div class="row" style="font-size:13px;font-weight:700;margin-bottom:6px"><span>Деңгей ${lp.l}</span><span class="sp"></span><span>${S.xp} / ${lp.b} XP</span></div><div class="bar"><i style="width:${lp.p}%"></i></div></div>
    </div></section>

    <div class="grid g4" style="margin-top:16px">
      ${[['flame', 'Серия', S.streak + ' күн', 'ib-amber'], ['bolt', 'Барлық XP', S.xp, 'ib-lime'], ['book', 'Аяқталған сабақ', done + ' / ' + ALL.length, 'ib-cyan'], ['target', 'Дұрыс жауап', (S.answers.all ? Math.round(S.answers.ok / S.answers.all * 100) : 0) + '%', 'ib-violet']].map(k => `<div class="card kpi"><div class="iconbox ${k[3]}">${ic(k[0])}</div><div><div class="dim" style="font-size:12.5px;font-weight:700">${k[1]}</div><div class="big-num" style="font-size:24px">${k[2]}</div></div></div>`).join('')}
    </div>

    <div class="grid" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);margin-top:16px" id="homeGrid">
      <div class="card"><div class="row"><div class="iconbox ib-violet">${ic('sparkles')}</div><div><h3 style="margin:0">ЖИ ұсынысы: сенің жеке жолың</h3><div class="dim" style="font-size:13px">Жауаптарың, қателерің және қайталау кестесі бойынша</div></div></div>
        <div class="grid" style="gap:10px;margin-top:14px">${rec.length ? rec.map(r => lessonCard(r.l, `<div class="row" style="gap:6px;margin-top:4px"><span class="chip ${r.c}">${r.tag}</span><span class="dim" style="font-size:12.5px">${esc(r.why)}</span></div>`)).join('') : '<p class="muted">Алдымен диагностикадан өт — ЖИ жеке жол құрады.</p>'}</div>
        ${!S.diag9 && !S.gap ? `<a class="btn cyan" style="margin-top:14px" href="#/diag">${ic('target')} Диагностикадан өту</a>` : ''}
      </div>
      <div class="grid" style="gap:16px">
        <div class="card"><h3>${ic('target')} Күнделікті тапсырмалар</h3>${quests.map(q => `<div class="quest"><div class="iconbox ib-${q[4]}" style="width:38px;height:38px">${ic(q[3])}</div><div style="flex:1"><b style="font-size:14px">${q[0]}</b><div class="row" style="gap:8px"><div class="bar" style="height:9px"><i style="width:${q[1] / q[2] * 100}%"></i></div><span class="dim" style="font-size:12px">${q[1]}/${q[2]}</span></div></div></div>`).join('')}</div>
        <div class="card league"><div class="row"><h3 style="margin:0">${ic('crown')} Апталық лига</h3><span class="sp"></span><span class="chip amber">Алтын</span></div><ol style="margin-top:10px">${league.slice(0, 5).map((p, i) => `<li class="${p.me ? 'me' : ''}"><span class="pos">${i + 1}</span><span class="ava" style="background:${p.c}">${p.n[0]}</span><b style="flex:1;font-size:14px">${esc(p.n)}</b><span style="font-weight:800;color:var(--lime)">${p.xp} XP</span></li>`).join('')}</ol></div>
      </div>
    </div>

    <div class="sec-title"><h2>Не істегің келеді?</h2></div>
    <div class="grid g4">
      ${[['#/games', 'gamepad', '3D ойындар', 'Компьютер жина, робот басқар', 'linear-gradient(135deg,#7c3aed,#db2777)'], ['#/lab', 'code', 'Код зертханасы', 'Python, JS, HTML, SQL, C++', 'linear-gradient(135deg,#0891b2,#2563eb)'], ['#/chat', 'chat', 'Чаттар', 'Бит, Код-дәрігер, Викторина', 'linear-gradient(135deg,#65a30d,#0d9488)'], ['#/videos', 'video', 'Видео сабақтар', ALL.length + ' анимациялық сабақ', 'linear-gradient(135deg,#d97706,#dc2626)']].map(c => `<a href="${c[0]}" class="gcard" style="background:${c[4]};min-height:170px"><div class="iconbox" style="background:rgba(255,255,255,.2);color:#fff;margin-bottom:auto">${ic(c[1])}</div><h3 style="color:#fff;margin:12px 0 2px">${c[2]}</h3><div style="color:rgba(255,255,255,.85);font-size:13.5px">${c[3]}</div></a>`).join('')}
    </div>`;
    if (innerWidth < 1000) $('#homeGrid').style.gridTemplateColumns = '1fr';
  });

  function leagueData() {
    const names = [['Әлішер', '#f472b6'], ['Дана', '#22d3ee'], ['Нұрлан', '#fbbf24'], ['Аружан', '#8b5cf6'], ['Ерасыл', '#fb7185'], ['Томирис', '#34d399'], ['Санжар', '#60a5fa'], ['Мадина', '#a3e635'], ['Бекзат', '#f97316']];
    const wk = Math.max(S.daily.xp, Object.entries(S.activity).filter(([d]) => (new Date() - new Date(d)) < 7 * 864e5).reduce((a, [, m]) => a + m * 4, 0));
    const base = [420, 365, 310, 280, 240, 190, 150, 120, 80];
    const arr = names.map((n, i) => ({ n: n[0], c: n[1], xp: base[i] }));
    arr.push({ n: (S.user && S.user.name) || 'Сен', c: 'linear-gradient(135deg,#8b5cf6,#f472b6)', xp: wk, me: true });
    return arr.sort((a, b) => b.xp - a.xp);
  }
  window.leagueData = leagueData;

  // ---------- ОҚУ ЖОЛЫ ----------
  route('/learn', (v, a, q) => {
    const g = +(q.get('g') || (S.user && S.user.grade) || 9);
    const G = CURR.find(x => x.grade === g);
    let k = 0, firstOpen = null;
    v.innerHTML = `<div class="row"><div><h1>Оқу жолы</h1><p class="muted" style="margin:0">Сыныпты таңда. Өтпей қалған тақырыптарды кез келген сыныптан аша аласың.</p></div><span class="sp"></span><div class="grade-pick">${CURR.map(x => `<button class="${x.grade === g ? 'on' : ''}" data-g="${x.grade}">${x.grade}</button>`).join('')}</div></div>
      ${G.units.map((u, ui) => {
        const [c, d] = UNIT_COLORS[ui % 5];
        const sk = S.skills[u.skill];
        return `<div class="unit-band" style="background:${c}"><div class="iconbox" style="background:rgba(0,0,0,.15)">${ic(u.icon)}</div><div style="flex:1"><small>${g}-сынып · ${ui + 1}-бөлім</small><h3>${esc(u.title)}</h3></div>${sk != null ? `<span class="chip" style="background:rgba(0,0,0,.2);color:#0a0e24;border:0;font-weight:900">${sk}%</span>` : ''}<a class="btn ghost sm" style="--c:rgba(0,0,0,.18);--t:#0a0e24;border:0" href="#/cards?u=${u.id}">${ic('cards')}</a></div>
        <div class="path">${u.lessons.map((l, li) => {
          const st = S.lessons[l.id] || {};
          const pos = Math.sin(k++ * 0.9) * 110;
          let cls = st.done ? 'done' : '';
          if (!st.done && !firstOpen) { firstOpen = l.id; cls = 'cur'; }
          const side = pos > 0 ? 'right' : 'left';
          return `<a href="#/lesson/${l.id}" class="node ${cls} ${side}" style="${st.done ? '' : `--c:${c};--d:${d};`}transform:translateX(${pos}px)">${st.done ? ic('star') : ic(li === u.lessons.length - 1 ? 'trophy' : (l.examples && l.examples.some(e => e.code) ? 'code' : 'book'))}<span class="lbl">${esc(l.title)}${st.best != null ? ` · ${st.best}%` : ''}</span></a>`;
        }).join('')}</div>`;
      }).join('')}`;
    $$('.grade-pick button', v).forEach(b => b.onclick = () => location.hash = '#/learn?g=' + b.dataset.g);
  });

  // ---------- САБАҚ ----------
  route('/lesson', (v, a) => {
    const l = lessonById(a[0]); if (!l) { v.innerHTML = '<p>Сабақ табылмады</p>'; return; }
    const st = S.lessons[l.id] || {};
    const sk = S.skills[l.unit.skill];
    const lvl = sk == null ? 'A' : levelFor(sk);
    const idx = ALL.indexOf(l); const nx = ALL[idx + 1];
    v.innerHTML = `<div class="row" style="margin-bottom:10px"><a class="btn ghost sm" href="#/learn?g=${l.grade}">${ic('left')} Оқу жолы</a><span class="chip">${l.grade}-сынып</span><span class="chip cyan">${esc(l.unit.title)}</span><span class="chip lvl-chip">Сенің деңгейің: <span class="lvl ${lvl}" style="width:20px;height:20px;font-size:11px">${lvl}</span></span></div>
      <h1>${esc(l.title)}</h1><p class="muted">${esc(l.goal || '')}</p>
      <div class="tabs" id="ltabs">${['Видео', 'Теория', 'Мысалдар', 'Тест', 'Тапсырма'].map((t, i) => `<button data-t="${i}" class="${i === 0 ? 'on' : ''}">${t}</button>`).join('')}</div>
      <div id="lbody" style="margin-top:16px"></div>
      <div class="row" style="margin-top:22px"><a class="btn ghost sm" href="#/chat?bot=bit&topic=${l.id}">${ic('chat')} Биттен сұрау</a><a class="btn ghost sm" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(l.title + ' информатика қазақша')}">${ic('video')} YouTube-тан қосымша видео</a><span class="sp"></span>${nx ? `<a class="btn sm" href="#/lesson/${nx.id}">Келесі сабақ ${ic('right')}</a>` : ''}</div>`;
    const body = $('#lbody', v);
    const tabs = [
      () => { body.innerHTML = '<div id="vp"></div><p class="dim" style="font-size:13px;margin-top:8px">Анимациялық видео сабақ BilimPath AI командасы жасаған түпнұсқа материал. Қосымша видеолар YouTube-та авторлардың өз арнасында ашылады.</p>'; videoPlayer($('#vp', body), l); },
      () => { body.innerHTML = `<div class="grid g2">${(l.keyTerms || []).map(k => `<div class="term"><b>${esc(k.term)}</b> — ${esc(k.def)}</div>`).join('')}</div><div class="card" style="margin-top:14px"><h3>${ic('book')} Түсіндірме</h3><p style="font-size:16.5px;line-height:1.7">${esc(l.theory)}</p></div>${l.realLife ? `<div class="card" style="margin-top:14px;border-color:rgba(251,191,36,.35)"><h3 style="color:var(--amber)">${ic('bulb')} Өмірде</h3><p>${esc(l.realLife)}</p></div>` : ''}${l.steps && l.steps.length ? `<div class="card" style="margin-top:14px"><h3>Қадамдар</h3><ol>${l.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>` : ''}<div class="card" style="margin-top:14px;background:linear-gradient(135deg,rgba(163,230,53,.12),rgba(34,211,238,.08))"><b>Қорытынды:</b> ${esc(l.summary || '')}</div>`; },
      () => { body.innerHTML = (l.examples || []).length ? l.examples.map(e => `<div class="card" style="margin-bottom:12px"><h3>${esc(e.title)}</h3>${e.text ? `<p style="white-space:pre-wrap">${esc(e.text)}</p>` : ''}${e.code ? `<pre class="code">${hl(e.code, e.code.trim().startsWith('<') ? 'html' : 'py')}</pre>${e.output ? `<div class="out">${esc(e.output)}</div>` : ''}<a class="btn cyan sm" href="#/lab?lang=${e.code.trim().startsWith('<') ? 'html' : 'py'}&code=${encodeURIComponent(e.code)}">${ic('play')} Зертханада іске қосу</a>` : ''}</div>`).join('') : '<p class="muted">Бұл сабақта мысал жоқ — видео мен теорияны қара.</p>'; },
      () => quizRunner(body, l),
      () => { body.innerHTML = `${(l.practice || []).map(p => `<div class="card" style="margin-bottom:12px"><div class="row"><span class="lvl ${p.level}">${p.level}</span><h3 style="margin:0">${esc(p.title)}</h3></div><p>${esc(p.task)}</p><details><summary class="dim" style="cursor:pointer">${ic('bulb')} Кеңес</summary><p>${esc(p.hint)}</p></details></div>`).join('') || ''}${l.errorTask ? `<div class="card" style="border-color:rgba(251,113,133,.4)"><h3 style="color:var(--coral)">${ic('x')} Қатені тап</h3><p>Қай жолда қате бар? Жолды бас.</p><div id="errt">${l.errorTask.code.split('\n').map((ln, i) => `<button class="opt" data-ln="${i + 1}" style="font-family:var(--mono);margin:4px 0;padding:8px 12px"><span class="dim">${i + 1}</span>&nbsp;&nbsp;${esc(ln)}</button>`).join('')}</div><div id="errm"></div></div>` : ''}${l.creative ? `<div class="card" style="margin-top:12px"><h3>${ic('wand')} Шығармашылық тапсырма</h3><p>${esc(l.creative)}</p></div>` : ''}${!l.practice?.length && !l.errorTask && !l.creative ? '<p class="muted">Тапсырмалар «Тест» бөлімінде.</p>' : ''}`;
        $$('#errt .opt', body).forEach(b => b.onclick = (e) => { const ok = +b.dataset.ln === l.errorTask.wrongLine; b.classList.add(ok ? 'ok' : 'bad'); $('#errm', body).innerHTML = `<p style="margin-top:10px">${ok ? '✔ Дұрыс! ' : '✘ Жоқ. '}${esc(l.errorTask.explanation)}</p>`; sfx(ok ? 'ok' : 'bad'); if (ok) addXP(15, e); }); },
    ];
    $$('#ltabs button', v).forEach(b => b.onclick = () => { $$('#ltabs button', v).forEach(x => x.classList.toggle('on', x === b)); tabs[+b.dataset.t](); });
    tabs[0]();
  });

  // ---------- АДАПТИВТІ ТЕСТ ----------
  window.quizRunner = (host, l) => {
    const sk = S.skills[l.unit.skill];
    const want = sk == null ? 'A' : levelFor(sk);
    const order = { A: ['A', 'B', 'C'], B: ['B', 'A', 'C'], C: ['C', 'B', 'A'] }[want];
    const qs = [...l.quiz].sort((a, b) => order.indexOf(a.level || 'A') - order.indexOf(b.level || 'A')).slice(0, 6);
    let i = 0, ok = 0, picked = null;
    const draw = () => {
      if (i >= qs.length) return finish();
      const Q = qs[i];
      host.innerHTML = `<div class="card"><div class="row"><div class="bar" style="flex:1"><i style="width:${i / qs.length * 100}%"></i></div><span class="stat heart" style="padding:4px 10px">${ic('heart')}${S.hearts}</span></div>
        <div class="row" style="margin-top:16px"><span class="lvl ${Q.level || 'A'}">${Q.level || 'A'}</span><span class="dim" style="font-size:13px">${i + 1} / ${qs.length} сұрақ</span></div>
        <h2 style="margin-top:10px">${esc(Q.q)}</h2><div id="opts">${Q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>
        <div class="row" style="margin-top:12px"><span class="sp"></span><button class="btn" id="chk" disabled>Тексеру</button></div><div id="fb"></div></div>`;
      $$('#opts .opt', host).forEach(b => b.onclick = () => { if ($('#fb', host).innerHTML) return; picked = +b.dataset.k; $$('#opts .opt', host).forEach(x => x.classList.toggle('sel', x === b)); $('#chk', host).disabled = false; });
      $('#chk', host).onclick = (e) => {
        const good = picked === Q.answer; S.answers.all++; if (good) { ok++; S.answers.ok++; }
        updateSkill(l.unit.skill, good);
        $$('#opts .opt', host).forEach(x => { const k = +x.dataset.k; if (k === Q.answer) x.classList.add('ok'); else if (k === picked) x.classList.add('bad'); });
        sfx(good ? 'ok' : 'bad'); if (good) addXP(5, e); else loseHeart();
        $('#chk', host).remove();
        $('#fb', host).innerHTML = `<div class="feedback ${good ? 'ok' : 'bad'}"><div class="iconbox ${good ? 'ib-lime' : 'ib-coral'}">${ic(good ? 'check' : 'x')}</div><div style="flex:1"><b style="font-size:17px">${good ? ['Керемет!', 'Дәл таптың!', 'Жарайсың!'][i % 3] : 'Ештеңе етпейді!'}</b><div>${esc(Q.explain || '')}</div></div><button class="btn ${good ? '' : 'coral'}" id="nx">Әрі қарай</button></div>`;
        $('#nx', host).onclick = () => { i++; picked = null; draw(); };
        save();
      };
    };
    const finish = () => {
      const pct = Math.round(ok / qs.length * 100);
      const prev = S.lessons[l.id] || { attempts: 0 };
      const d = new Date(); d.setDate(d.getDate() + (pct >= 85 ? 3 : 1));
      S.lessons[l.id] = { done: pct >= 50 || prev.done, best: Math.max(prev.best || 0, pct), attempts: (prev.attempts || 0) + 1, review: d.toISOString().slice(0, 10) };
      if (pct >= 50 && !prev.done) S.daily.lessons++;
      S.daily.quiz++;
      addXP(pct === 100 ? 30 : 15);
      if (pct >= 85) confetti();
      const nl = levelFor(pct);
      const advice = pct < 60 ? 'ЖИ кеңесі: видео мен теорияны қайта қарап, А деңгейлі жеңіл тапсырмалардан баста. Ертең осы тақырып қайталауға қойылды.' : pct < 85 ? 'ЖИ кеңесі: жақсы! B деңгейіндегі жаттығуларды орында. 1 күннен кейін қысқа қайталау бар.' : 'ЖИ кеңесі: тамаша! C деңгейі ашылды — шығармашылық тапсырма мен код зертханасына өт.';
      host.innerHTML = `<div class="card" style="text-align:center"><div style="width:140px;margin:0 auto">${mascot(pct >= 85 ? 'wow' : 'happy')}</div><h1>${pct}%</h1><p class="muted">${ok} / ${qs.length} дұрыс · келесі деңгей: <span class="lvl ${nl}">${nl}</span></p><div class="card" style="text-align:left;background:var(--card2)">${ic('sparkles')} ${advice}</div><div class="row" style="justify-content:center;margin-top:16px"><button class="btn ghost" id="again">${ic('refresh')} Қайта тапсыру</button><a class="btn" href="#/learn?g=${l.grade}">Оқу жолына ${ic('right')}</a></div></div>`;
      $('#again', host).onclick = () => quizRunner(host, l);
      save();
    };
    draw();
  };

  // ---------- ДИАГНОСТИКА ----------
  route('/diag', (v, a) => {
    const mode = a[0];
    if (mode === 'gap' || mode === 'g9') return runDiag(v, mode);
    v.innerHTML = `<h1>Диагностика</h1><p class="muted">Екі тест бар. Біріншісі 5–8 сыныптан қалған олқылықтарды табады, екіншісі 9-сынып бөлімдерін тексереді.</p>
    <div class="grid g2" style="margin-top:16px">
      <div class="card"><div class="iconbox ib-violet">${ic('radar')}</div><h2 style="margin-top:12px">Олқылық тесті</h2><p class="muted">${GAP_TEST.length} сұрақ · 5–8 сынып · шамамен 8 минут. Бағдарлама ауысқанда өтпей қалған тақырыптарды анықтайды.</p>${S.gap ? `<span class="chip lime">${ic('check')} Тапсырылды</span>` : ''}<div style="margin-top:12px"><a class="btn violet" href="#/diag/gap">${ic('play')} Бастау</a></div></div>
      <div class="card"><div class="iconbox ib-cyan">${ic('target')}</div><h2 style="margin-top:12px">9-сынып диагностикасы</h2><p class="muted">25 сұрақ · 5 бөлім · А/В/С деңгейлері. Нәтижесі бойынша жеке оқу траекториясы құрылады.</p>${S.diag9 ? `<span class="chip lime">${ic('check')} Нәтиже: ${S.diag9.percent}%</span>` : ''}<div style="margin-top:12px"><a class="btn cyan" href="#/diag/g9">${ic('play')} Бастау</a></div></div>
    </div>`;
  });
  function runDiag(v, mode) {
    const qs = mode === 'gap' ? GAP_TEST.map(x => ({ ...x, sid: x.s })) : diagnosticQuestions.map(x => ({ ...x, sid: 'n9s' + x.sectionId }));
    let i = 0; const res = []; const t0 = Date.now();
    const draw = () => {
      if (i >= qs.length) return done();
      const Q = qs[i]; const sk = skillById(Q.sid);
      v.innerHTML = `<div class="card" style="max-width:760px;margin:0 auto"><div class="row"><span class="chip violet">${mode === 'gap' ? 'Олқылық тесті' : '9-сынып диагностикасы'}</span><span class="sp"></span><span class="dim">${i + 1}/${qs.length}</span></div><div class="bar" style="margin:12px 0"><i style="width:${i / qs.length * 100}%"></i></div>
      <div class="dim" style="font-size:13px;font-weight:700">${sk ? sk.g + '-сынып · ' + esc(sk.name) : ''}</div><h2 style="margin-top:6px">${esc(Q.q)}</h2>${Q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}<p class="dim" style="font-size:13px">Диагностикада дұрыс жауап бірден көрсетілмейді — бұл бағалау емес, жолды анықтау.</p></div>`;
      $$('.opt', v).forEach(b => b.onclick = () => { res.push(+b.dataset.k === Q.answer ? 1 : 0); sfx('click'); i++; draw(); });
    };
    const done = () => {
      if (mode === 'gap') {
        S.gap = { date: new Date().toISOString().slice(0, 10), res: {} };
        qs.forEach((Q, k) => { S.gap.res[Q.sid] = res[k]; S.skills[Q.sid] = res[k] ? 85 : 30; });
      } else {
        const sc = [1, 2, 3, 4, 5].map(s => { const idx = qs.map((q, k) => q.sectionId === s ? k : -1).filter(k => k >= 0); return Math.round(idx.reduce((a, k) => a + res[k], 0) / idx.length * 100); });
        const pct = Math.round(res.reduce((a, b) => a + b, 0) / res.length * 100);
        S.diag9 = { scores: sc, percent: pct, date: new Date().toISOString().slice(0, 10), min: Math.round((Date.now() - t0) / 6e4) };
        sc.forEach((s, k) => S.skills['n9s' + (k + 1)] = s);
        S.history = S.history || []; S.history.push({ d: S.diag9.date, p: pct });
      }
      addXP(40); confetti(); save();
      location.hash = mode === 'gap' ? '#/gap' : '#/progress';
    };
    draw();
  }

  // ---------- ОЛҚЫЛЫҚ КАРТАСЫ ----------
  route('/gap', (v) => {
    const W = 1010, colX = g => 95 + (g - 5) * 205, H = 560;
    const byG = {}; SKILLS.forEach(s => (byG[s.g] = byG[s.g] || []).push(s));
    const pos = {}; Object.entries(byG).forEach(([g, arr]) => arr.forEach((s, k) => pos[s.id] = { x: colX(+g), y: 70 + k * ((H - 100) / Math.max(arr.length - 1, 1)) * (arr.length > 1 ? 1 : 0) + (arr.length === 1 ? H / 2 - 30 : 0) }));
    const col = id => { const v = S.skills[id]; return v == null ? ['#2a3366', '#8a93c4', 'Тексерілмеген'] : v >= 75 ? ['#a3e635', '#0a0e24', 'Меңгерілген'] : v >= 60 ? ['#22d3ee', '#0a0e24', 'Орташа'] : ['#fb7185', '#fff', 'Олқылық']; };
    const rec = recommend().filter(r => r.tag === 'Олқылық' || r.tag === 'Әлсіз тақырып');
    const gaps = SKILLS.filter(s => S.skills[s.id] != null && S.skills[s.id] < 60);
    v.innerHTML = `<div class="row"><div><h1>Олқылық картасы</h1><p class="muted" style="margin:0;max-width:720px">Бағдарлама жыл сайын өзгергендіктен, кейбір тақырыптар өтпей қалады. Карта 5–9 сынып дағдыларының байланысын көрсетеді: жебе — «алдымен осыны біл». Қызыл түйін — олқылық.</p></div><span class="sp"></span><a class="btn violet" href="#/diag/gap">${ic('radar')} ${S.gap ? 'Қайта тексеру' : 'Олқылық тесті'}</a></div>
    <div class="legend" style="margin:14px 0"><span><i style="background:#a3e635"></i>Меңгерілген (75%+)</span><span><i style="background:#22d3ee"></i>Орташа (60–74%)</span><span><i style="background:#fb7185"></i>Олқылық (&lt;60%)</span><span><i style="background:#2a3366"></i>Тексерілмеген</span></div>
    <div class="gapmap"><svg viewBox="0 0 ${W} ${H}" width="100%">
      ${[5, 6, 7, 8, 9].map(g => `<text x="${colX(g)}" y="30" text-anchor="middle" fill="#8a93c4" font-family="Montserrat" font-weight="900" font-size="15">${g}-СЫНЫП</text>`).join('')}
      <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#4a5590"/></marker></defs>
      ${SKILLS.flatMap(s => s.pre.map(p => { const A = pos[p], B = pos[s.id]; const bad = S.skills[p] != null && S.skills[p] < 60; const d = A.x === B.x ? `M${A.x + 78} ${A.y + 8} C ${A.x + 120} ${A.y + 8}, ${B.x + 120} ${B.y - 8}, ${B.x + 82} ${B.y - 8}` : `M${A.x + 78} ${A.y} C ${A.x + 140} ${A.y}, ${B.x - 140} ${B.y}, ${B.x - 80} ${B.y}`; return `<path d="${d}" stroke="${bad ? '#fb7185' : '#3a4580'}" stroke-width="${bad ? 3 : 2}" fill="none" ${bad ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#ah)"/>`; })).join('')}
      ${SKILLS.map(s => { const [bg, fg] = col(s.id); const p = pos[s.id]; const val = S.skills[s.id]; return `<a href="#/lesson/${(skillLessons(s.id)[0] || {}).id}"><g><rect x="${p.x - 78}" y="${p.y - 22}" width="156" height="44" rx="14" fill="${bg}" stroke="rgba(255,255,255,.2)"/><text x="${p.x}" y="${p.y - 2}" text-anchor="middle" fill="${fg}" font-family="Inter" font-weight="600" font-size="11.5">${esc(s.name)}</text><text x="${p.x}" y="${p.y + 13}" text-anchor="middle" fill="${fg}" font-family="Montserrat" font-weight="900" font-size="11">${val == null ? '—' : val + '%'}</text></g></a>`; }).join('')}
    </svg></div>
    <div class="grid g2" style="margin-top:16px">
      <div class="card"><h3>${ic('radar')} Табылған олқылықтар: ${gaps.length}</h3>${gaps.length ? gaps.map(s => `<div class="row" style="padding:8px 0;border-bottom:1px dashed var(--line)"><span class="chip coral">${s.g}-сынып</span><b style="flex:1">${esc(s.name)}</b><span style="color:var(--coral);font-weight:800">${S.skills[s.id]}%</span></div>`).join('') : '<p class="muted">Олқылық табылмады немесе тест әлі тапсырылмаған.</p>'}</div>
      <div class="card"><h3>${ic('sparkles')} ЖИ құрған толтыру жоспары</h3>${rec.length ? rec.map((r, i) => `<a href="#/lesson/${r.l.id}" class="row" style="padding:10px 0;border-bottom:1px dashed var(--line)"><span class="big-num" style="font-size:20px;color:var(--violet);width:26px">${i + 1}</span><div style="flex:1"><b>${esc(r.l.title)}</b><div class="dim" style="font-size:12.5px">${esc(r.why)}</div></div>${ic('right')}</a>`).join('') : '<p class="muted">Тест тапсырғаннан кейін жоспар пайда болады.</p>'}</div>
    </div>`;
  });

  // ---------- ВИДЕО САБАҚТАР ----------
  route('/videos', (v, a, q) => {
    const g = +(q.get('g') || (S.user && S.user.grade) || 9);
    const list = ALL.filter(l => l.grade === g);
    v.innerHTML = `<div class="row"><div><h1>Видео сабақтар</h1><p class="muted" style="margin:0">Әр сабаққа анимациялық түсіндірме. Көрген соң +10 XP.</p></div><span class="sp"></span><div class="grade-pick">${CURR.map(x => `<button class="${x.grade === g ? 'on' : ''}" data-g="${x.grade}">${x.grade}</button>`).join('')}</div></div>
    <div id="vfeat" style="margin:16px 0"></div>
    <div class="grid g3">${list.map((l, i) => `<button class="card vitem" data-id="${l.id}" style="text-align:left;padding:0;overflow:hidden"><div style="aspect-ratio:16/9;display:grid;place-items:center;background:linear-gradient(135deg,${['#4c1d95,#1e3a8a', '#0e7490,#1e3a8a', '#9a3412,#831843', '#166534,#0e7490', '#6d28d9,#be185d'][l.ui % 5]});position:relative"><div class="iconbox" style="background:rgba(255,255,255,.18);color:#fff;width:56px;height:56px;border-radius:50%">${ic('play')}</div><span class="chip" style="position:absolute;left:10px;top:10px;background:rgba(0,0,0,.35);border:0;color:#fff">${ic(l.unit.icon)} ${esc(l.unit.title)}</span></div><div style="padding:12px 14px"><b>${esc(l.title)}</b><div class="dim" style="font-size:12.5px">${l.grade}-сынып · ${i + 1}-сабақ</div></div></button>`).join('')}</div>`;
    $$('.grade-pick button', v).forEach(b => b.onclick = () => location.hash = '#/videos?g=' + b.dataset.g);
    const feat = id => { const l = lessonById(id); $('#vfeat', v).innerHTML = `<div class="card"><div class="row" style="margin-bottom:10px"><h3 style="margin:0">${esc(l.title)}</h3><span class="sp"></span><a class="btn sm" href="#/lesson/${l.id}">Сабаққа өту ${ic('right')}</a></div><div id="vp"></div></div>`; videoPlayer($('#vp', v), l); };
    $$('.vitem', v).forEach(b => b.onclick = () => { feat(b.dataset.id); scrollTo({ top: 0, behavior: 'smooth' }); });
    if (list[0]) feat((list.find(l => ['s4t6', 'g8l3', 'g7l3', 'g6l6', 'g5l4'].includes(l.id)) || list[0]).id);
  });

  // ---------- ПРОГРЕСС ----------
  route('/progress', (v) => {
    const lp = levelProg(S.xp);
    const days = [...Array(14)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); const k = d.toISOString().slice(0, 10); return { k, m: S.activity[k] || 0, w: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'][d.getDay()] }; });
    const mx = Math.max(30, ...days.map(d => d.m));
    const d9 = S.diag9;
    const secNames = ['Ақпарат', 'Компьютер', 'Деректер базасы', 'Python', '2D ойын'];
    const cur = [1, 2, 3, 4, 5].map(i => S.skills['n9s' + i]);
    const hist = S.history || [];
    v.innerHTML = `<h1>Менің прогресім</h1>
    <div class="grid g3"><div class="card"><div class="dim">Деңгей</div><div class="big-num">${lp.l} <span style="font-size:16px;color:var(--muted)">${RANKS[lp.l - 1]}</span></div><div class="bar" style="margin-top:10px"><i style="width:${lp.p}%"></i></div><div class="dim" style="font-size:12px;margin-top:6px">${S.xp} / ${lp.b} XP</div></div>
    <div class="card"><div class="dim">Ең ұзын серия</div><div class="big-num" style="color:#ff9f43">${S.bestStreak} күн</div><div class="dim" style="font-size:13px;margin-top:8px">Қазір: ${S.streak} күн</div></div>
    <div class="card"><div class="dim">Код іске қосу</div><div class="big-num" style="color:var(--cyan)">${S.codeRuns}</div><div class="dim" style="font-size:13px;margin-top:8px">Тілдер: ${(S.langs || []).join(', ') || '—'}</div></div></div>
    <div class="grid g2" style="margin-top:16px">
      <div class="card"><h3>1-диаграмма. Соңғы 14 күндегі белсенділік (минут)</h3><svg viewBox="0 0 560 200" width="100%">${days.map((d, i) => { const h = d.m / mx * 150; return `<rect x="${i * 40 + 6}" y="${170 - h}" width="28" height="${Math.max(h, 2)}" rx="7" fill="${d.m ? 'url(#gb)' : '#2a3366'}"/><text x="${i * 40 + 20}" y="190" text-anchor="middle" font-size="11" fill="#8a93c4">${d.w}</text>${d.m ? `<text x="${i * 40 + 20}" y="${164 - h}" text-anchor="middle" font-size="11" font-weight="700" fill="#cfd6ff">${d.m}</text>` : ''}`; }).join('')}<defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3e635"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs></svg></div>
      <div class="card"><h3>2-диаграмма. 9-сынып бөлімдері бойынша меңгеру, %</h3>${secNames.map((n, i) => { const b = d9 ? d9.scores[i] : null, c = cur[i]; return `<div style="margin:10px 0"><div class="row" style="font-size:13.5px"><b>${n}</b><span class="sp"></span>${b != null ? `<span class="dim">бастапқы ${b}% →</span>` : ''}<b style="color:${c == null ? 'var(--dim)' : c >= 75 ? 'var(--lime)' : c >= 60 ? 'var(--cyan)' : 'var(--coral)'}">${c == null ? '—' : c + '%'}</b></div><div class="bar" style="height:10px;margin-top:4px">${b != null ? `<i style="width:${b}%;position:absolute;background:rgba(255,255,255,.18)"></i>` : ''}<i style="width:${c || 0}%"></i></div></div>`; }).join('')}</div>
    </div>
    ${hist.length > 1 ? `<div class="card" style="margin-top:16px"><h3>3-диаграмма. Білім көрсеткішінің өсуі, %</h3><svg viewBox="0 0 600 180" width="100%">${(() => { const pts = hist.map((h, i) => [40 + i * (520 / (hist.length - 1)), 160 - h.p * 1.4]); return `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="#a3e635" stroke-width="4" stroke-linecap="round"/>${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#0a0e24" stroke="#a3e635" stroke-width="3"/><text x="${p[0]}" y="${p[1] - 14}" text-anchor="middle" fill="#eef1ff" font-weight="800" font-size="14">${hist[i].p}%</text>`).join('')}`; })()}</svg></div>` : ''}
    <div class="row" style="margin-top:16px"><a class="btn ghost" href="#/diag">${ic('target')} Диагностика</a><button class="btn ghost" id="rst">${ic('trash')} Прогресті тазалау</button><button class="btn violet" id="dm">${ic('eye')} Демо-оқушы</button></div>`;
    $('#rst', v).onclick = () => { if (confirm('Барлық прогресс өшіріледі. Жалғастырамыз ба?')) resetAll(); };
    $('#dm', v).onclick = () => { loadDemo(); go(); toast('Демо-оқушы жүктелді'); };
  });

  // ---------- ЛИГА ЖӘНЕ БЕЛГІЛЕР ----------
  route('/league', (v) => {
    const L = leagueData();
    v.innerHTML = `<h1>Лига және белгілер</h1><div class="grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1.2fr)" id="lg">
    <div class="card league"><div class="row"><div class="iconbox ib-amber">${ic('crown')}</div><div><h3 style="margin:0">Алтын лига</h3><div class="dim" style="font-size:13px">Аптаның соңында үздік 3 оқушы Гауһар лигасына өтеді</div></div></div><ol style="margin-top:12px">${L.map((p, i) => `<li class="${p.me ? 'me' : ''}"><span class="pos" style="${i < 3 ? 'color:var(--amber)' : ''}">${i + 1}</span><span class="ava" style="background:${p.c}">${p.n[0]}</span><b style="flex:1">${esc(p.n)}${p.me ? ' (сен)' : ''}</b><span style="font-weight:800;color:var(--lime)">${p.xp} XP</span></li>`).join('')}</ol><p class="dim" style="font-size:12px">Лигадағы басқа есімдер — үлгі (демо). Мектепте сынып оқушыларымен ортақ лига ашылады.</p></div>
    <div class="card"><h3>${ic('medal')} Белгілер: ${S.badges.length} / ${BADGES.length}</h3><div class="grid g3" style="margin-top:12px">${BADGES.map(b => { const has = S.badges.includes(b.id); return `<div style="text-align:center;padding:10px"><div class="badge3d ${has ? '' : 'locked'}" style="background:${b.c};color:#0a0e24">${ic(has ? b.ic : 'lock')}</div><b style="font-size:13.5px">${b.name}</b><div class="dim" style="font-size:12px">${b.d}</div></div>`; }).join('')}</div></div></div>`;
    if (innerWidth < 1000) $('#lg').style.gridTemplateColumns = '1fr';
  });

  // ---------- ФЛЭШ-КАРТАЛАР ----------
  route('/cards', (v, a, q) => {
    const uid = q.get('u');
    let terms = uid ? ALL.filter(l => l.unit.id === uid).flatMap(l => l.keyTerms || []) : glossary.map(g => ({ term: g.term, def: g.def }));
    if (!uid) terms = [...terms, ...ALL.filter(l => l.grade < 9).flatMap(l => l.keyTerms || [])];
    terms = terms.sort(() => Math.random() - .5).slice(0, 30);
    let i = 0, known = 0;
    const draw = () => {
      if (i >= terms.length) { v.innerHTML = `<div class="card" style="text-align:center;max-width:560px;margin:0 auto"><h1>Дайын!</h1><p>${known} / ${terms.length} ұғымды білесің.</p><a class="btn" href="#/cards">${ic('refresh')} Тағы</a></div>`; addXP(10); return; }
      const T = terms[i];
      v.innerHTML = `<h1>Флэш-карталар</h1><p class="muted">Картаны бас — анықтамасы ашылады. Аралықты қайталау әдісі: білмегенің кейін қайта шығады.</p><div style="max-width:560px;margin:16px auto"><div class="row dim" style="font-size:13px"><span>${i + 1} / ${terms.length}</span><span class="sp"></span><span>Білемін: ${known}</span></div><div class="bar" style="margin:8px 0 16px"><i style="width:${i / terms.length * 100}%"></i></div>
      <div class="flash" id="fc"><div class="in"><div class="f">${esc(T.term)}</div><div class="b">${esc(T.def)}</div></div></div>
      <div class="row" style="justify-content:center;margin-top:16px"><button class="btn coral" id="no">${ic('refresh')} Қайталау керек</button><button class="btn" id="yes">${ic('check')} Білемін</button></div></div>`;
      $('#fc', v).onclick = () => $('#fc', v).classList.toggle('flip');
      $('#yes', v).onclick = () => { known++; i++; sfx('ok'); draw(); };
      $('#no', v).onclick = () => { terms.push(T); i++; draw(); };
    };
    draw();
  });

  // ---------- МҰҒАЛІМ ПАНЕЛІ ----------
  route('/teacher', (v) => {
    const st = demoStudents;
    const secN = ['Ақпарат', 'Компьютер', 'ДБ', 'Python', '2D ойын'];
    const avg = [0, 1, 2, 3, 4].map(k => Math.round(st.reduce((a, s) => a + s.scores[k], 0) / st.length));
    const gapsCnt = SKILLS.filter(s => s.g < 9).map(s => ({ s, n: (s.id.charCodeAt(2) + s.id.length * 7) % 5 })).sort((a, b) => b.n - a.n).slice(0, 5);
    v.innerHTML = `<h1>Мұғалім панелі</h1><p class="muted">Сынып аналитикасы (демо деректер, аты-жөндер жасырылған).</p>
    <div class="grid g4">${[['users', 'Оқушылар', st.length, 'ib-cyan'], ['chart', 'Орташа нәтиже', Math.round(avg.reduce((a, b) => a + b) / 5) + '%', 'ib-lime'], ['radar', 'Жиі олқылық', 'Цикл', 'ib-coral'], ['check', 'Тапсырма орындалуы', '91%', 'ib-violet']].map(k => `<div class="card kpi"><div class="iconbox ${k[3]}">${ic(k[0])}</div><div><div class="dim" style="font-size:12.5px">${k[1]}</div><div class="big-num" style="font-size:22px">${k[2]}</div></div></div>`).join('')}</div>
    <div class="grid g2" style="margin-top:16px"><div class="card"><h3>4-диаграмма. Сынып бойынша бөлімдер нәтижесі, %</h3><svg viewBox="0 0 500 220" width="100%">${avg.map((a, i) => `<rect x="${i * 98 + 18}" y="${190 - a * 1.6}" width="62" height="${a * 1.6}" rx="10" fill="${['#a3e635', '#22d3ee', '#fbbf24', '#8b5cf6', '#fb7185'][i]}"/><text x="${i * 98 + 49}" y="${180 - a * 1.6}" text-anchor="middle" fill="#eef1ff" font-weight="800" font-size="14">${a}%</text><text x="${i * 98 + 49}" y="210" text-anchor="middle" fill="#8a93c4" font-size="12">${secN[i]}</text>`).join('')}</svg></div>
    <div class="card"><h3>Сыныптағы жиі олқылықтар (5–8 сынып)</h3>${gapsCnt.map(x => `<div class="row" style="padding:8px 0;border-bottom:1px dashed var(--line)"><span class="chip">${x.s.g}-сынып</span><b style="flex:1">${esc(x.s.name)}</b><span class="chip coral">${x.n + 1} оқушы</span></div>`).join('')}</div></div>
    <div class="card" style="margin-top:16px;overflow:auto"><h3>Оқушылар</h3><table class="t"><tr><th>Оқушы</th><th>Деңгей</th>${secN.map(n => `<th>${n}</th>`).join('')}<th>Әлсіз тақырып</th><th>ЖИ ұсынысы</th></tr>${st.map(s => `<tr><td><b>${esc(s.name)}</b></td><td><span class="chip ${s.level === 'Жоғары' ? 'lime' : s.level === 'Орта' ? 'cyan' : 'coral'}">${s.level}</span></td>${s.scores.map(x => `<td style="color:${x >= 75 ? 'var(--lime)' : x >= 60 ? 'var(--cyan)' : 'var(--coral)'};font-weight:800">${x}</td>`).join('')}<td>${esc(s.weakTopics.join(', '))}</td><td class="dim" style="font-size:13px">${esc(s.recommendation)}</td></tr>`).join('')}</table></div>`;
  });

  // ---------- ЖОБА ТУРАЛЫ ----------
  route('/about', (v) => {
    v.innerHTML = `<div class="hero"><div class="mascot">${mascot('wow')}</div><div class="hero-inner"><div class="chip lime">Ғылыми жоба · Креативті индустрия</div><h1 style="margin-top:10px">BilimPath AI 2.0</h1><p style="color:#dbe1ff">Жасанды интеллект негізінде оқушының жеке оқу траекториясын қалыптастыратын адаптивті жүйе. Жаңа нұсқа 5–9 сынып информатикасын қамтиды және бағдарлама ауысуынан қалған олқылықтарды табады.</p></div></div>
    <div class="grid g3" style="margin-top:16px">${[['radar', 'Олқылық картасы', '23 дағдының алғышарттар графы. Әлсіз дағдының түбіріндегі тақырыпты тауып, соны бірінші ұсынады.'], ['sparkles', 'Адаптивті алгоритм', '0–59% → А деңгей, 60–84% → В, 85–100% → С. Қайталау: 1 және 3 күннен кейін.'], ['gamepad', 'Геймификация', 'XP, деңгей, серия, өмір, кристалл, апталық лига, 12 белгі, күнделікті тапсырма.'], ['code', 'Онлайн компиляторлар', 'Python, JavaScript, HTML/CSS, SQL, C++ — браузердің ішінде.'], ['box', '3D ойындар', 'Компьютер жина 3D, Робот-бағдарламашы, сұрыптау визуализаторы.'], ['chat', 'Чаттар', 'Бит-кеңесші, Код-дәрігер, Викторина-бот — телефон стиліндегі интерфейс.']].map(c => `<div class="card"><div class="iconbox ib-violet">${ic(c[0])}</div><h3 style="margin-top:10px">${c[1]}</h3><p class="muted">${c[2]}</p></div>`).join('')}</div>
    <div class="card" style="margin-top:16px"><h3>Тәжірибе нәтижелері (1-нұсқа)</h3><div class="grid g4" style="margin-top:10px">${[['58% → 82%', 'орташа білім көрсеткіші'], ['+24 п.т.', 'өсім'], ['91%', 'тапсырма орындалуы'], ['57,1%', 'қалыпқа келтірілген тиімділік']].map(k => `<div><div class="big-num" style="color:var(--lime);font-size:26px">${k[0]}</div><div class="dim">${k[1]}</div></div>`).join('')}</div></div>
    <div class="card" style="margin-top:16px"><h3>Авторлық құқық</h3><p class="muted">Сабақ мәтіндері, анимациялық видеолар, ойындар және иллюстрациялар жоба авторларының түпнұсқа жұмысы. Қаріптер: Montserrat, Inter, DejaVu Sans Mono (SIL Open Font License / тегін лицензия). Python компиляторы — Pyodide (MPL 2.0), SQL — sql.js (MIT), C++ — Wandbox ашық сервисі. Сыртқы видеолар YouTube-та авторлардың арнасында ашылады, сайтқа көшірілмейді.</p><div class="row"><button class="btn ghost sm" id="thm">${ic('sun')} Жарық / түнгі режим</button><button class="btn ghost sm" id="mut">${S.mute ? 'Дыбысты қосу' : 'Дыбысты өшіру'}</button></div></div>`;
    $('#thm', v).onclick = () => { S.theme = S.theme === 'light' ? 'dark' : 'light'; save(); applyTheme(); };
    $('#mut', v).onclick = (e) => { S.mute = !S.mute; save(); e.target.textContent = S.mute ? 'Дыбысты қосу' : 'Дыбысты өшіру'; };
  });
  window.go = go;
})();
