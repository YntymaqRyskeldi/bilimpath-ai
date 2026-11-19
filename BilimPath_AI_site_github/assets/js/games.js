/* 3D ойындар: Компьютер жина 3D, Робот-бағдарламашы 3D, Сұрыптау визуализаторы, Екілік шамдар */
(function () {
  // CSS 3D қорап
  const box = (w, h, d, col, o = {}) => {
    const f = (tr, W, H, extra = '') => `<div style="width:${W}px;height:${H}px;margin:${-H / 2}px 0 0 ${-W / 2}px;transform:${tr};background:${extra || col}"></div>`;
    const sh = (c, k) => `linear-gradient(rgba(0,0,0,${k}),rgba(0,0,0,${k})),${c}`;
    return `<div class="cube ${o.cls || ''}" style="transform:translate3d(${o.x || 0}px,${o.y || 0}px,${o.z || 0}px) ${o.rot || ''};${o.style || ''}" ${o.attr || ''}>
      ${o.noFront ? '' : f(`translateZ(${d / 2}px)`, w, h, o.front)}
      ${f(`rotateY(180deg) translateZ(${d / 2}px)`, w, h, sh(col, .25))}
      ${f(`rotateY(90deg) translateZ(${w / 2}px)`, d, h, o.right || sh(col, .15))}
      ${o.noLeft ? '' : f(`rotateY(-90deg) translateZ(${w / 2}px)`, d, h, o.left || sh(col, .3))}
      ${f(`rotateX(90deg) translateZ(${h / 2}px)`, w, d, o.top || sh(col, -.0))}
      ${f(`rotateX(-90deg) translateZ(${h / 2}px)`, w, d, sh(col, .4))}</div>`;
  };
  const dragRotate = (el, world, st) => {
    let down = false, sx = 0, sy = 0;
    const apply = () => world.style.transform = `rotateX(${st.rx}deg) rotateY(${st.ry}deg) scale(${st.s || 1})`;
    el.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sy = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => { if (!down) return; st.ry += (e.clientX - sx) * .5; st.rx = Math.max(-60, Math.min(10, st.rx - (e.clientY - sy) * .3)); sx = e.clientX; sy = e.clientY; apply(); });
    el.addEventListener('pointerup', () => down = false);
    apply(); return apply;
  };

  route('/games', (v, a) => {
    const g = a[0];
    if (g === 'pc') return pcGame(v);
    if (g === 'robot') return robotGame(v);
    if (g === 'sort') return sortGame(v);
    if (g === 'bits') return bitsGame(v);
    const cards = [
      ['pc', 'Компьютер жина 3D', 'Тапсырыс берушінің мақсаты мен бюджетіне сай компьютер құрастыр. Корпусты 360° айналдыр.', 'linear-gradient(135deg,#7c3aed,#db2777)', 'cpu', '9-сынып · Компьютер таңдаймыз', S.games.pc ? 'Жиналды ✔' : ''],
      ['robot', 'Робот-бағдарламашы 3D', 'Роботқа команда жаз: алға, бұрыл, шамды жақ. Циклмен қысқа программа құр. 10 деңгей.', 'linear-gradient(135deg,#0891b2,#4f46e5)', 'robot', '5–7 сынып · Алгоритм, робототехника', S.games.robot ? S.games.robot + '/10 деңгей' : ''],
      ['sort', 'Сұрыптау визуализаторы', 'Көпіршіктік, таңдау және кірістіру сұрыптауларын қадам-қадаммен көр.', 'linear-gradient(135deg,#d97706,#dc2626)', 'chart', '9-сынып · Python массивтері', S.games.sort ? 'Ашылды ✔' : ''],
      ['bits', 'Екілік шамдар', 'Шамдарды жағып, берілген санды екілік кодпен жина. Уақытқа қарсы!', 'linear-gradient(135deg,#65a30d,#0d9488)', 'binary', '5–8 сынып · Екілік код', S.games.bits ? 'Рекорд: ' + S.games.bits : ''],
    ];
    v.innerHTML = `<h1>3D ойындар</h1><p class="muted">Ойнай отырып үйрен: әр ойын нақты тақырыпқа байланысты және XP береді.</p>
    <div class="grid g2" style="margin-top:16px">${cards.map(c => `<a href="#/games/${c[0]}" class="gcard" style="background:${c[3]};min-height:250px"><div class="art">${gameArt(c[0])}</div><span class="chip" style="background:rgba(0,0,0,.3);border:0;color:#fff;align-self:flex-start;margin-bottom:auto">${c[5]}</span><div class="row" style="margin-top:80px"><div class="iconbox" style="background:rgba(255,255,255,.2);color:#fff">${ic(c[4])}</div><div style="flex:1"><h2 style="color:#fff;margin:0">${c[1]}</h2><div style="color:rgba(255,255,255,.85);font-size:14px">${c[2]}</div></div></div>${c[6] ? `<span class="chip lime" style="position:absolute;right:16px;top:16px;background:rgba(0,0,0,.35)">${c[6]}</span>` : ''}</a>`).join('')}</div>`;
  });
  function gameArt(k) {
    if (k === 'pc') return `<svg viewBox="0 0 400 250" style="position:absolute;right:-10px;top:10px;width:60%;opacity:.55"><g transform="translate(230 30)"><path d="M0 40 80 0 150 35 70 75z" fill="#fff" opacity=".35"/><path d="M0 40 70 75 70 210 0 175z" fill="#fff" opacity=".2"/><path d="M70 75 150 35 150 170 70 210z" fill="#fff" opacity=".28"/><rect x="88" y="70" width="40" height="40" fill="#a3e635" transform="skewY(-26)"/><rect x="88" y="140" width="50" height="10" fill="#22d3ee" transform="skewY(-26)"/></g></svg>`;
    if (k === 'robot') return `<svg viewBox="0 0 400 250" style="position:absolute;right:0;top:0;width:60%;opacity:.5">${[0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => `<path d="M${200 + (i - j) * 34} ${40 + (i + j) * 18}l34 18-34 18-34-18z" fill="${(i + j) % 3 ? 'rgba(255,255,255,.18)' : 'rgba(251,191,36,.7)'}"/>`).join('')).join('')}<rect x="186" y="70" width="30" height="34" rx="8" fill="#a3e635"/><circle cx="196" cy="84" r="3" fill="#0a0e24"/><circle cx="207" cy="84" r="3" fill="#0a0e24"/></svg>`;
    if (k === 'sort') return `<svg viewBox="0 0 400 250" style="position:absolute;right:20px;top:20px;width:50%;opacity:.5">${[3, 7, 2, 9, 5, 8, 4, 6].map((h, i) => `<rect x="${i * 24}" y="${180 - h * 18}" width="18" height="${h * 18}" rx="4" fill="#fff"/>`).join('')}</svg>`;
    return `<svg viewBox="0 0 400 250" style="position:absolute;right:20px;top:30px;width:55%;opacity:.55">${[1, 0, 1, 1].map((b, i) => `<circle cx="${i * 46 + 30}" cy="60" r="18" fill="${b ? '#fde047' : 'rgba(255,255,255,.25)'}"/><text x="${i * 46 + 30}" y="104" text-anchor="middle" fill="#fff" font-size="16" font-weight="800">${b}</text>`).join('')}</svg>`;
  }

  // ================= КОМПЬЮТЕР ЖИНА 3D =================
  const PARTS = {
    cpu: { n: 'Процессор', ic: 'cpu', opts: [['Intel Core i3', 45000, 4, 'Оқу мен кеңсе үшін жеткілікті'], ['AMD Ryzen 5', 75000, 7, 'Ойын мен бағдарламалауға тамаша баланс'], ['Intel Core i9', 210000, 10, 'Ең күшті: видео монтаж, 3D']] },
    ram: { n: 'Жедел жад', ic: 'server', opts: [['8 ГБ', 15000, 4, 'Браузер мен Word үшін'], ['16 ГБ', 28000, 7, 'Ойын мен бірнеше программа'], ['32 ГБ', 55000, 10, 'Видео, 3D, көп тапсырма']] },
    gpu: { n: 'Бейнекарта', ic: 'layout', opts: [['Кірістірілген', 0, 2, 'Процессордың ішінде — ойынға әлсіз'], ['GeForce RTX 3050', 110000, 6, 'Орташа ойындар'], ['GeForce RTX 4070', 290000, 10, 'Заманауи ойындар, ЖИ, 3D']] },
    ssd: { n: 'SSD диск', ic: 'database', opts: [['256 ГБ', 14000, 4, 'Жүйе мен құжаттарға'], ['512 ГБ', 22000, 7, 'Ойындар мен жобаларға'], ['1 ТБ', 38000, 10, 'Видео мен үлкен файлдарға']] },
    psu: { n: 'Қуат блогы', ic: 'bolt', opts: [['450 Вт', 18000, 4, 'Бейнекартасыз жүйеге'], ['650 Вт', 30000, 7, 'Орташа бейнекартаға'], ['850 Вт', 48000, 10, 'Қуатты бейнекартаға']] },
  };
  const MISSIONS = [
    { t: 'Оқушыға оқу компьютері', who: 'Әсел, 7-сынып', need: { cpu: 4, ram: 4, gpu: 0, ssd: 4, psu: 4 }, budget: 160000, txt: 'Сабаққа, Word, браузер және Python үшін. Ойын керек емес. Бюджет: 160 000 ₸.' },
    { t: 'Ойын компьютері', who: 'Ерасыл, 9-сынып', need: { cpu: 7, ram: 7, gpu: 6, ssd: 7, psu: 7 }, budget: 420000, txt: 'Заманауи ойындар және ағынмен көрсету (стрим). Бюджет: 420 000 ₸.' },
    { t: 'Дизайнер станциясы', who: 'Мектеп медиаорталығы', need: { cpu: 10, ram: 10, gpu: 6, ssd: 10, psu: 7 }, budget: 700000, txt: 'Видео монтаж, 3D модельдеу, ЖИ құралдары. Бюджет: 700 000 ₸.' },
  ];
  function pcGame(v) {
    let mi = 0; const pick = {};
    v.innerHTML = `<div class="row"><a class="btn ghost sm" href="#/games">${ic('left')} Ойындар</a><h1 style="margin:0">Компьютер жина 3D</h1></div>
    <div class="grid" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);margin-top:14px" id="pcg">
      <div><div class="scene3d" id="sc"><div class="floor"></div><div class="world" id="w"></div><div style="position:absolute;left:14px;bottom:12px" class="chip">${ic('rotate')} Айналдыру үшін сүйре</div><div style="position:absolute;right:14px;top:12px" id="hud"></div></div>
      <div class="card" style="margin-top:12px" id="mis"></div></div>
      <div class="card" id="shop" style="max-height:640px;overflow:auto"></div></div>`;
    if (innerWidth < 1000) $('#pcg').style.gridTemplateColumns = '1fr';
    const st = { rx: -16, ry: 40, s: innerWidth < 700 ? .7 : 1 };
    const W = $('#w', v);
    const draw3d = () => {
      const glass = 'linear-gradient(135deg,rgba(150,200,255,.12),rgba(150,200,255,.04))';
      const gl = 'rgba(60,80,170,.16)';
      let h = box(190, 360, 380, gl, { x: 0, y: 0, z: 0, front: 'linear-gradient(rgba(120,140,255,.10),rgba(34,211,238,.08))', left: glass, right: 'rgba(30,38,90,.55)', top: 'repeating-linear-gradient(90deg,rgba(255,255,255,.10) 0 4px,rgba(30,38,90,.4) 4px 10px)' });
      h += [-110, 0, 110].map(z => `<div class="cube" style="transform:translate3d(-96px,${z === 0 ? -60 : z === -110 ? -60 : 60}px,${z}px) rotateY(-90deg)"><div style="width:70px;height:70px;margin:-35px 0 0 -35px;border-radius:50%;border:3px solid rgba(34,211,238,.7);box-shadow:0 0 18px rgba(34,211,238,.6),inset 0 0 14px rgba(139,92,246,.6);background:repeating-conic-gradient(rgba(34,211,238,.25) 0 20deg,transparent 20deg 60deg)"></div></div>`).join('');
      h += box(6, 300, 300, '#0f5132', { x: 82, y: -20, z: -10 }); // аналық плата
      const col = { cpu: '#a3e635', ram: '#22d3ee', gpu: '#8b5cf6', ssd: '#fbbf24', psu: '#fb7185' };
      if (pick.cpu != null) h += box(16, 54, 54, col.cpu, { x: 70, y: -90, z: 30, cls: 'pop' }) + box(40, 70, 70, '#334155', { x: 48, y: -90, z: 30, top: 'repeating-linear-gradient(90deg,#94a3b8 0 3px,#334155 3px 7px)' });
      if (pick.ram != null) h += [0, 1].map(k => box(40, 110, 8, col.ram, { x: 58, y: -80, z: -40 - k * 16 })).join('');
      if (pick.gpu != null && PARTS.gpu.opts[pick.gpu][1] > 0) h += box(44, 36, 250, col.gpu, { x: 56, y: 30, z: 10, front: `linear-gradient(90deg,${col.gpu},#4c1d95)` });
      if (pick.ssd != null) h += box(10, 50, 70, col.ssd, { x: 76, y: 90, z: 80 });
      if (pick.psu != null) h += box(150, 80, 150, col.psu, { x: 0, y: 130, z: -100 });
      W.innerHTML = h;
      const n = Object.keys(pick).length;
      $('#hud', v).innerHTML = `<span class="chip lime">${n}/5 бөлшек</span>`;
    };
    dragRotate($('#sc', v), W, st);
    let auto = setInterval(() => { if (!document.body.contains(W)) return clearInterval(auto); st.ry += .25; W.style.transform = `rotateX(${st.rx}deg) rotateY(${st.ry}deg) scale(${st.s})`; }, 30);
    $('#sc', v).addEventListener('pointerdown', () => clearInterval(auto));
    const total = () => Object.entries(pick).reduce((a, [k, i]) => a + PARTS[k].opts[i][1], 0);
    const drawShop = () => {
      const M = MISSIONS[mi];
      $('#mis', v).innerHTML = `<div class="row"><div class="iconbox ib-amber">${ic('user')}</div><div style="flex:1"><div class="dim" style="font-size:12.5px;font-weight:700">ТАПСЫРЫС ${mi + 1}/3 · ${M.who}</div><h3 style="margin:0">${M.t}</h3></div><div class="tabs">${MISSIONS.map((_, i) => `<button data-m="${i}" class="${i === mi ? 'on' : ''}">${i + 1}</button>`).join('')}</div></div><p style="margin:8px 0 0">${M.txt}</p>`;
      $$('#mis [data-m]', v).forEach(b => b.onclick = () => { mi = +b.dataset.m; Object.keys(pick).forEach(k => delete pick[k]); draw3d(); drawShop(); });
      const t = total(); const over = t > M.budget;
      $('#shop', v).innerHTML = `<div class="row"><h3 style="margin:0">Бөлшектер дүкені</h3><span class="sp"></span><span class="chip ${over ? 'coral' : 'lime'}">${t.toLocaleString('ru')} / ${M.budget.toLocaleString('ru')} ₸</span></div><div class="bar" style="margin:10px 0 14px"><i style="width:${Math.min(100, t / M.budget * 100)}%;${over ? 'background:var(--coral)' : ''}"></i></div>
      ${Object.entries(PARTS).map(([k, P]) => `<div style="margin-bottom:12px"><b style="font-size:13px;color:var(--muted)">${ic(P.ic)} ${P.n.toUpperCase()}</b><div style="margin-top:6px">${P.opts.map((o, i) => `<div class="part ${pick[k] === i ? 'on' : ''}" data-k="${k}" data-i="${i}"><div class="pi ib-cyan">${ic(P.ic)}</div><div style="flex:1"><b style="font-size:14px">${o[0]}</b><div class="dim" style="font-size:12px">${o[3]}</div></div><div style="text-align:right"><b style="font-size:13px">${o[1] ? o[1].toLocaleString('ru') + ' ₸' : 'тегін'}</b><div style="font-size:11px;color:var(--lime)">${'★'.repeat(Math.ceil(o[2] / 2))}</div></div></div>`).join('')}</div></div>`).join('')}
      <button class="btn" style="width:100%" id="chk" ${Object.keys(pick).length < 5 ? 'disabled' : ''}>${ic('check')} Тапсырысты тексеру</button><div id="res" style="margin-top:10px"></div>`;
      $$('.part', v).forEach(p => p.onclick = () => { pick[p.dataset.k] = +p.dataset.i; sfx('click'); draw3d(); drawShop(); });
      const chk = $('#chk', v); if (chk) chk.onclick = (e) => {
        const issues = [];
        Object.entries(M.need).forEach(([k, n]) => { const p = PARTS[k].opts[pick[k]][2]; if (p < n) issues.push(`${PARTS[k].n} әлсіз: «${PARTS[k].opts[pick[k]][0]}» бұл мақсатқа жеткіліксіз.`); else if (p - n >= 6) issues.push(`${PARTS[k].n} тым қымбат — артық қуат, бюджетті үнемде.`); });
        if (PARTS.gpu.opts[pick.gpu][1] >= 290000 && PARTS.psu.opts[pick.psu][2] < 10) issues.push('Қуатты бейнекартаға 850 Вт қуат блогы керек — үйлесімділік қатесі!');
        if (PARTS.gpu.opts[pick.gpu][1] >= 110000 && PARTS.psu.opts[pick.psu][2] < 7) issues.push('Бейнекартаға кемінде 650 Вт қуат блогы керек.');
        if (t > M.budget) issues.push(`Бюджеттен ${(t - M.budget).toLocaleString('ru')} ₸ асып кетті.`);
        const ok = issues.length === 0;
        $('#res', v).innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}" style="position:static"><div><b>${ok ? 'Тапсырыс беруші риза! Компьютер дайын 🎉' : 'Тағы ойлан:'}</b>${ok ? `<div>Құны: ${t.toLocaleString('ru')} ₸ · +50 XP</div>` : `<ul style="margin:6px 0 0;padding-left:18px">${issues.map(i => `<li>${i}</li>`).join('')}</ul>`}</div></div>`;
        sfx(ok ? 'level' : 'bad'); if (ok) { S.games.pc = (S.games.pc || 0) + 1; addXP(50, e); confetti(); }
      };
    };
    draw3d(); drawShop();
  }

  // ================= РОБОТ-БАҒДАРЛАМАШЫ 3D =================
  // '.' жол, '#' қабырға, 'S' старт, 'G' шам. Бағыт: 0→,1↓,2←,3↑
  const LV = [
    { m: ['S..G'], d: 0, max: 5, hint: 'Үш рет алға жүріп, шамды жақ.' },
    { m: ['S..', '..G'], d: 0, max: 6, hint: 'Алға, алға, оңға бұрыл, алға...' },
    { m: ['S...', '##.#', '...G'], d: 0, max: 8, hint: 'Қабырғаны айналып өт.' },
    { m: ['S.....G'], d: 0, max: 3, hint: 'Цикл! «алға» блогын басып, ×6 қыл.' },
    { m: ['S..#', '#..#', '#..G'], d: 0, max: 6, hint: '«алға ×2» сияқты қайталауды қолдан.' },
    { m: ['G..S'], d: 2, max: 3, hint: 'Робот солға қарап тұр.' },
    { m: ['S.#G', '.#..', '...#'], d: 1, max: 10, hint: 'Төмен түсіп, айналып жүр.' },
    { m: ['S.G.G'], d: 0, max: 5, hint: 'Екі шамды да жақ!' },
    { m: ['S...', '...G', 'G...'], d: 0, max: 10, hint: 'Бірінші шам, сосын екінші.' },
    { m: ['S.....', '#####.', 'G.....'], d: 0, max: 7, hint: 'Ұзын дәліз: циклсыз болмайды.' },
  ];
  function robotGame(v) {
    let li = Math.min(S.games.robot || 0, LV.length - 1);
    let prog = [];
    v.innerHTML = `<div class="row"><a class="btn ghost sm" href="#/games">${ic('left')} Ойындар</a><h1 style="margin:0">Робот-бағдарламашы 3D</h1><span class="sp"></span><div class="tabs" id="lvls"></div></div>
    <div class="grid" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);margin-top:14px" id="rg">
      <div class="scene3d" id="sc" style="height:460px;cursor:default"><div class="world" id="w"></div><div style="position:absolute;left:14px;top:12px" id="hint" class="chip violet"></div></div>
      <div class="card"><h3>Командалар</h3><p class="dim" style="font-size:13px;margin-top:-4px">Блокты бас — программаға қосылады. Программадағы блокты бассаң: қайталау саны артады (×2, ×3...). Ұзақ бассаң — өшеді.</p>
        <div class="row" style="gap:6px">${[['f', 'алға', 'right'], ['l', 'солға', 'left'], ['r', 'оңға', 'rotate'], ['x', 'шамды жақ', 'bulb']].map(c => `<button class="cmd ${c[0]}" data-c="${c[0]}">${ic(c[2])} ${c[1]}</button>`).join('')}</div>
        <h3 style="margin-top:16px">Программа <span class="dim" id="cnt" style="font-size:13px"></span></h3><div class="cmds" id="prog"></div>
        <div class="row" style="margin-top:12px"><button class="btn" id="go">${ic('play')} Іске қосу</button><button class="btn ghost sm" id="clr">${ic('trash')} Тазалау</button></div>
        <pre class="code" id="py" style="margin-top:14px;font-size:12.5px"></pre><div class="dim" style="font-size:12px">↑ Сенің программаң Python тілінде</div><div id="msg" style="margin-top:10px"></div></div></div>`;
    if (innerWidth < 1000) $('#rg').style.gridTemplateColumns = '1fr';
    const T = 64;
    let L, grid, rob, lit, H, Wd;
    const NAMES = { f: 'алға', l: 'солға', r: 'оңға', x: 'шамды жақ' };
    const PY = { f: 'robot.alga()', l: 'robot.solga()', r: 'robot.onga()', x: 'robot.zharyq()' };
    const load = () => {
      L = LV[li]; grid = L.m.map(r => r.split('')); H = grid.length; Wd = grid[0].length; lit = new Set(); prog = [];
      grid.forEach((r, y) => r.forEach((c, x) => { if (c === 'S') rob = { x, y, d: L.d }; }));
      $('#lvls', v).innerHTML = LV.map((_, i) => `<button class="${i === li ? 'on' : ''}" data-i="${i}" ${i > (S.games.robot || 0) ? 'disabled style="opacity:.35"' : ''}>${i + 1}</button>`).join('');
      $$('#lvls button', v).forEach(b => b.onclick = () => { li = +b.dataset.i; load(); });
      $('#hint', v).innerHTML = `${ic('bulb')} ${li + 1}-деңгей: ${L.hint}`;
      drawWorld(); drawProg(); $('#msg', v).innerHTML = '';
    };
    const drawWorld = () => {
      const ox = -Wd * T / 2, oy = -H * T / 2;
      let h = `<div style="position:absolute;transform-style:preserve-3d">`;
      grid.forEach((r, y) => r.forEach((c, x) => {
        const cls = c === '#' ? 'wall' : c === 'G' ? 'goal' + (lit.has(x + ',' + y) ? ' lit' : '') : 'path';
        h += c === '#' ? box(T - 4, T - 4, 40, '#5b21b6', { x: ox + x * T + T / 2, y: oy + y * T + T / 2, z: 20, rot: '', style: '' }).replace('class="cube "', 'class="cube"') : `<div class="tile ${cls}" style="left:${ox + x * T}px;top:${oy + y * T}px"><div class="top"></div>${c === 'G' ? `<div style="position:absolute;left:22px;top:22px;width:20px;height:20px;border-radius:50%;background:${lit.has(x + ',' + y) ? '#fde047' : '#78716c'};transform:translateZ(14px);box-shadow:${lit.has(x + ',' + y) ? '0 0 24px #fde047' : 'none'}"></div>` : ''}</div>`;
      }));
      h += `<div id="rob" style="position:absolute;transform-style:preserve-3d;transition:transform .35s ease;transform:translate3d(${ox + rob.x * T + T / 2}px,${oy + rob.y * T + T / 2}px,0) rotateZ(${rob.d * 90}deg)">${box(40, 40, 40, '#a3e635', { z: 22, front: '#a3e635', right: 'radial-gradient(circle at 30% 35%,#0a0e24 4px,transparent 5px),radial-gradient(circle at 70% 35%,#0a0e24 4px,transparent 5px),#bef264', top: 'linear-gradient(90deg,#84cc16,#a3e635)' })}</div>`;
      h += '</div>';
      const w = $('#w', v); w.innerHTML = h;
      const sc = Math.min(1.45, 7.5 / Math.max(Wd, H)) * (innerWidth < 700 ? .6 : 1);
      w.style.transform = `rotateX(58deg) rotateZ(-38deg) scale(${sc})`;
    };
    const moveRob = () => { const ox = -Wd * T / 2, oy = -H * T / 2; $('#rob', v).style.transform = `translate3d(${ox + rob.x * T + T / 2}px,${oy + rob.y * T + T / 2}px,0) rotateZ(${rob.d * 90}deg)`; };
    const drawProg = () => {
      const n = prog.length;
      $('#cnt', v).textContent = `(${n} / ${L.max} блок)`;
      $('#prog', v).innerHTML = prog.map((p, i) => `<span class="cmd ${p.c}" data-i="${i}">${NAMES[p.c]}${p.n > 1 ? ' ×' + p.n : ''}</span>`).join('') || '<span class="dim" style="font-size:13px">Блоктарды осында қос</span>';
      $$('#prog .cmd', v).forEach(b => { let tm; b.onpointerdown = () => tm = setTimeout(() => { prog.splice(+b.dataset.i, 1); tm = -1; drawProg(); }, 450); b.onpointerup = () => { if (tm !== -1) { clearTimeout(tm); const p = prog[+b.dataset.i]; p.n = p.n >= 6 ? 1 : p.n + 1; drawProg(); } }; b.oncontextmenu = e => { e.preventDefault(); prog.splice(+b.dataset.i, 1); drawProg(); }; });
      $('#py', v).innerHTML = hl(prog.length ? prog.map(p => p.n > 1 ? `for i in range(${p.n}):\n    ${PY[p.c]}` : PY[p.c]).join('\n') : '# программа бос', 'py');
    };
    $$('.cmd[data-c]', v).forEach(b => b.onclick = () => { if (prog.length >= L.max) { toast('Блок лимиті: ' + L.max + '. Қайталауды (×) қолдан!'); return; } prog.push({ c: b.dataset.c, n: 1 }); sfx('click'); drawProg(); });
    $('#clr', v).onclick = () => { prog = []; drawProg(); };
    $('#go', v).onclick = async (e) => {
      grid.forEach((r, y) => r.forEach((c, x) => { if (c === 'S') rob = { x, y, d: L.d }; })); lit = new Set(); drawWorld();
      const steps = prog.flatMap((p, i) => Array(p.n).fill([p.c, i]));
      const dx = [1, 0, -1, 0], dy = [0, 1, 0, -1];
      let fail = '';
      for (const [c, i] of steps) {
        $$('#prog .cmd', v).forEach(b => b.classList.toggle('act', +b.dataset.i === i));
        await new Promise(r => setTimeout(r, 380));
        if (c === 'f') { const nx = rob.x + dx[rob.d], ny = rob.y + dy[rob.d]; if (nx < 0 || ny < 0 || nx >= Wd || ny >= H || grid[ny][nx] === '#') { fail = 'Робот қабырғаға соғылды!'; break; } rob.x = nx; rob.y = ny; moveRob(); }
        if (c === 'l') { rob.d = (rob.d + 3) % 4; moveRob(); }
        if (c === 'r') { rob.d = (rob.d + 1) % 4; moveRob(); }
        if (c === 'x') { if (grid[rob.y][rob.x] === 'G') { lit.add(rob.x + ',' + rob.y); sfx('ok'); drawWorld(); } else { fail = 'Бұл жерде шам жоқ.'; break; } }
      }
      $$('#prog .cmd', v).forEach(b => b.classList.remove('act'));
      const goals = grid.flat().filter(c => c === 'G').length;
      const win = !fail && lit.size === goals;
      $('#msg', v).innerHTML = `<div class="feedback ${win ? 'ok' : 'bad'}" style="position:static"><b>${win ? `Деңгей өтілді! ${prog.length} блок · +25 XP` : fail || 'Барлық шам жанған жоқ. Тағы көр!'}</b>${win && li < LV.length - 1 ? `<span class="sp"></span><button class="btn sm" id="nx">Келесі ${ic('right')}</button>` : ''}</div>`;
      sfx(win ? 'level' : 'bad');
      if (win) { S.games.robot = Math.max(S.games.robot || 0, li + 1); addXP(25, e); confetti(); const nx = $('#nx', v); if (nx) nx.onclick = () => { li++; load(); }; }
    };
    load();
  }

  // ================= СҰРЫПТАУ ВИЗУАЛИЗАТОРЫ =================
  function sortGame(v) {
    v.innerHTML = `<div class="row"><a class="btn ghost sm" href="#/games">${ic('left')} Ойындар</a><h1 style="margin:0">Сұрыптау визуализаторы</h1></div>
    <div class="card" style="margin-top:14px"><div class="row"><div class="tabs" id="alg"><button data-a="bubble" class="on">Көпіршіктік</button><button data-a="select">Таңдау</button><button data-a="insert">Кірістіру</button></div><span class="sp"></span><label class="dim" style="font-size:13px">Жылдамдық <input type="range" id="sp" min="40" max="600" value="260" style="vertical-align:middle"></label></div>
    <div class="sortviz" id="sv" style="height:300px;margin-top:14px"></div>
    <div class="row" style="margin-top:12px"><button class="btn" id="go">${ic('play')} Бастау</button><button class="btn ghost" id="st">Бір қадам</button><button class="btn ghost" id="sh">${ic('refresh')} Араластыру</button><span class="sp"></span><span class="chip cyan" id="cmp">Салыстыру: 0</span><span class="chip amber" id="sw">Ауыстыру: 0</span></div></div>
    <div class="grid g2" style="margin-top:14px"><div class="card"><h3>Python коды</h3><pre class="code" id="code"></pre><a class="btn cyan sm" id="tolab" href="#">${ic('play')} Зертханада іске қосу</a></div><div class="card"><h3>Бұл қалай жұмыс істейді?</h3><p id="exp"></p></div></div>`;
    const CODE = { bubble: 'a = [5, 2, 4, 1, 3]\nn = len(a)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)', select: 'a = [5, 2, 4, 1, 3]\nn = len(a)\nfor i in range(n):\n    m = i\n    for j in range(i + 1, n):\n        if a[j] < a[m]:\n            m = j\n    a[i], a[m] = a[m], a[i]\nprint(a)', insert: 'a = [5, 2, 4, 1, 3]\nfor i in range(1, len(a)):\n    x = a[i]\n    j = i - 1\n    while j >= 0 and a[j] > x:\n        a[j + 1] = a[j]\n        j -= 1\n    a[j + 1] = x\nprint(a)' };
    const EXP = { bubble: 'Іргелес екі элементті салыстырамыз. Сол жақтағысы үлкен болса — орындарын ауыстырамыз. Әр өтуде ең үлкен элемент «көпіршік» сияқты соңына шығады.', select: 'Әр қадамда сұрыпталмаған бөліктен ең кіші элементті тауып, оны бөліктің басына қоямыз.', insert: 'Карта ойнағандағыдай: әр жаңа элементті сол жақтағы сұрыпталған бөліктің дұрыс орнына кірістіреміз.' };
    let alg = 'bubble', a, gen, timer, nc = 0, ns = 0;
    const shuffle = () => { a = Array.from({ length: 12 }, () => 1 + Math.floor(Math.random() * 20)); nc = ns = 0; gen = mk(); draw([], -1); };
    function* mk() {
      const n = a.length;
      if (alg === 'bubble') { for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - 1 - i; j++) { nc++; yield [[j, j + 1], n - i]; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; ns++; yield [[j, j + 1], n - i]; } } } }
      if (alg === 'select') { for (let i = 0; i < n; i++) { let m = i; for (let j = i + 1; j < n; j++) { nc++; yield [[m, j], -i]; if (a[j] < a[m]) m = j; } [a[i], a[m]] = [a[m], a[i]]; ns++; yield [[i, m], -i - 1]; } }
      if (alg === 'insert') { for (let i = 1; i < n; i++) { let j = i; while (j > 0) { nc++; yield [[j - 1, j], -1]; if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; ns++; j--; } else break; } } }
    }
    const draw = (cmpI, done) => { $('#sv', v).innerHTML = a.map((x, k) => `<div class="${cmpI.includes(k) ? 'cmp' : ''} ${(done > 0 && k >= done) || (done < 0 && k < -done) ? 'ok' : ''}" style="height:${x / 20 * 92 + 6}%">${x}</div>`).join(''); $('#cmp', v).textContent = 'Салыстыру: ' + nc; $('#sw', v).textContent = 'Ауыстыру: ' + ns; };
    const step = () => { const r = gen.next(); if (r.done) { clearInterval(timer); timer = null; $('#sv', v).querySelectorAll('div').forEach(d => d.className = 'ok'); if (!S.games.sort) { S.games.sort = 1; addXP(20); confetti(); } return false; } draw(r.value[0], r.value[1]); return true; };
    const setAlg = (x) => { alg = x; $$('#alg button', v).forEach(b => b.classList.toggle('on', b.dataset.a === x)); $('#code', v).innerHTML = hl(CODE[x]); $('#exp', v).textContent = EXP[x]; $('#tolab', v).href = '#/lab?lang=py&code=' + encodeURIComponent(CODE[x]); clearInterval(timer); timer = null; shuffle(); };
    $$('#alg button', v).forEach(b => b.onclick = () => setAlg(b.dataset.a));
    $('#go', v).onclick = () => { if (timer) { clearInterval(timer); timer = null; return; } timer = setInterval(() => { if (!document.body.contains($('#sv'))) return clearInterval(timer); step(); }, +$('#sp', v).value); };
    $('#st', v).onclick = step; $('#sh', v).onclick = () => { clearInterval(timer); timer = null; shuffle(); };
    setAlg('bubble');
  }

  // ================= ЕКІЛІК ШАМДАР =================
  function bitsGame(v) {
    let score = 0, target = 0, time = 60, tm;
    const W = [128, 64, 32, 16, 8, 4, 2, 1]; let on = new Set();
    v.innerHTML = `<div class="row"><a class="btn ghost sm" href="#/games">${ic('left')} Ойындар</a><h1 style="margin:0">Екілік шамдар</h1></div>
    <div class="card" style="margin-top:14px;text-align:center"><div class="row" style="justify-content:center"><span class="chip amber" id="tm">60 с</span><span class="chip lime" id="sc">Ұпай: 0</span></div>
    <div class="dim" style="margin-top:16px">Осы санды жина:</div><div class="big-num" id="tg" style="font-size:64px;color:var(--cyan)">0</div>
    <div id="lamps" style="margin:20px 0">${W.map(w => `<button class="binlamp" data-w="${w}" style="margin:4px">${w}</button>`).join('')}</div>
    <div class="out" id="bin" style="display:inline-block;font-size:22px;min-width:220px">00000000₂ = 0</div><div style="margin-top:14px"><button class="btn" id="start">${ic('play')} Бастау</button></div></div>`;
    const sum = () => [...on].reduce((a, b) => a + b, 0);
    const upd = () => { const s = sum(); $$('#lamps .binlamp', v).forEach(b => b.classList.toggle('on', on.has(+b.dataset.w))); $('#bin', v).textContent = s.toString(2).padStart(8, '0') + '₂ = ' + s; if (s === target && tm) { score++; sfx('ok'); $('#sc', v).textContent = 'Ұпай: ' + score; next(); } };
    const next = () => { target = 1 + Math.floor(Math.random() * (score < 3 ? 15 : score < 6 ? 63 : 255)); on = new Set(); $('#tg', v).textContent = target; setTimeout(upd, 150); };
    $$('#lamps .binlamp', v).forEach(b => b.onclick = () => { const w = +b.dataset.w; on.has(w) ? on.delete(w) : on.add(w); upd(); });
    $('#start', v).onclick = (e) => { score = 0; time = 60; $('#sc', v).textContent = 'Ұпай: 0'; next(); clearInterval(tm); tm = setInterval(() => { if (!document.body.contains($('#tm'))) return clearInterval(tm); time--; $('#tm', v).textContent = time + ' с'; if (time <= 0) { clearInterval(tm); tm = null; S.games.bits = Math.max(S.games.bits || 0, score); addXP(score * 3); toast('Уақыт бітті! Ұпай: ' + score); } }, 1000); };
  }
})();
