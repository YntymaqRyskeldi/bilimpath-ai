/* Анимациялық видео сабақтар: әр сабаққа автоматты құрастырылатын сахналар + арнайы анимациялар */
(function () {
  const split = (txt) => (txt || '').replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+/g) || [txt];
  const chunk = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n).join(' ')); return o; };

  // Арнайы анимациялар (тақырыпқа байланысты)
  const special = {
    binary: () => ({ dur: 9000, cap: 'Әр шам — бір бит. Жанса 1, сөнсе 0. Салмақтары: 8, 4, 2, 1.', html: `<div><h2 class="pop">Екілік код — шамдар тілі</h2><div style="margin:26px 0" class="pop d1" id="lamps">${[8, 4, 2, 1].map(w => `<span class="binlamp" data-w="${w}">${w}</span>`).join('')}</div><div class="vt pop d2" id="lampv" style="font-family:var(--head);font-weight:900;font-size:clamp(20px,3.2vw,34px)">0000₂ = 0</div></div>`, run: (el) => { const seq = [5, 9, 13, 15, 10]; let k = 0; return setInterval(() => { const n = seq[k++ % seq.length]; el.querySelectorAll('.binlamp').forEach(b => b.classList.toggle('on', !!(n & +b.dataset.w))); el.querySelector('#lampv').textContent = n.toString(2).padStart(4, '0') + '₂ = ' + n; }, 1500); } }),
    array: () => ({ dur: 9000, cap: 'Массив элементтері қатар тұрады. Индекс 0-ден басталады: a[0] = 5.', html: `<div><h2 class="pop">Массив және индекс</h2><div class="pop d1" style="margin:24px 0"><div class="arr">${[5, 4, 3, 5, 4].map((v, i) => `<div><div class="cell" data-i="${i}">${v}</div><div class="idx">[${i}]</div></div>`).join('')}</div></div><div class="vt pop d2" id="ai" style="font-family:var(--mono)">a[0] = 5</div></div>`, run: (el) => { let i = 0; const a = [5, 4, 3, 5, 4]; return setInterval(() => { el.querySelectorAll('.cell').forEach(c => c.classList.toggle('hi', +c.dataset.i === i)); el.querySelector('#ai').textContent = `a[${i}] = ${a[i]}`; i = (i + 1) % 5; }, 1200); } }),
    sort: () => ({ dur: 12000, cap: 'Көпіршіктік сұрыптау: іргелес екі элементті салыстырып, үлкенін оңға ауыстырамыз.', html: `<div style="width:100%"><h2 class="pop">Көпіршіктік сұрыптау</h2><div class="sortviz pop d1" id="sv" style="max-width:640px;margin:20px auto 0"></div></div>`, run: (el) => { const a = [7, 3, 9, 2, 6, 4, 8, 1]; const sv = el.querySelector('#sv'); const draw = (x, y, done) => { sv.innerHTML = a.map((v, k) => `<div class="${k === x || k === y ? 'cmp' : ''} ${k >= done ? 'ok' : ''}" style="height:${v * 11 + 20}%">${v}</div>`).join(''); }; let i = 0, j = 0; draw(); return setInterval(() => { const n = a.length; if (i >= n - 1) { draw(-1, -1, 0); return; } if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]]; draw(j, j + 1, n - i); j++; if (j >= n - 1 - i) { j = 0; i++; } }, 380); } }),
    loop: () => ({ dur: 9000, cap: 'for циклі блокты бірнеше рет қайталайды: i = 1, 2, 3, 4, 5.', html: `<div><h2 class="pop">Цикл: қайталау күші</h2><pre class="code pop d1" style="display:inline-block;text-align:left;font-size:clamp(13px,1.8vw,19px)">${hl('for i in range(1, 6):\n    print("7 x", i, "=", 7 * i)')}</pre><div class="out pop d2" id="lo" style="display:inline-block;min-width:240px;text-align:left;font-size:clamp(13px,1.8vw,18px)"></div></div>`, run: (el) => { let i = 1; const o = el.querySelector('#lo'); return setInterval(() => { if (i > 5) { i = 1; o.textContent = ''; } o.textContent += `7 x ${i} = ${7 * i}\n`; i++; }, 900); } }),
    robot: () => ({ dur: 9000, cap: 'Робот: датчик сезеді → контроллер шешеді → мотор әрекет етеді.', html: `<div><h2 class="pop">Сезу → Ойлау → Әрекет</h2><div class="row pop d1" style="justify-content:center;gap:14px;margin-top:24px">${[['radar', 'Датчик', 'ib-cyan'], ['cpu', 'Контроллер', 'ib-violet'], ['robot', 'Мотор', 'ib-lime']].map((x, k) => `<div class="card rb" data-k="${k}" style="padding:18px 22px;transition:.3s"><div class="iconbox ${x[2]}" style="margin:0 auto 8px;width:64px;height:64px">${ic(x[0])}</div><b>${x[1]}</b></div>${k < 2 ? ic('right') : ''}`).join('')}</div></div>`, run: (el) => { let k = 0; return setInterval(() => { el.querySelectorAll('.rb').forEach(b => { b.style.transform = +b.dataset.k === k ? 'scale(1.12)' : ''; b.style.borderColor = +b.dataset.k === k ? 'var(--lime)' : ''; }); k = (k + 1) % 3; }, 1000); } }),
    ifelse: () => ({ dur: 9000, cap: 'if шарты ақиқат болса — бір жол, жалған болса — else жолы.', html: `<div><h2 class="pop">Шарт: егер … әйтпесе</h2><div class="pop d1" style="margin-top:20px;font-family:var(--head);font-size:clamp(16px,2.4vw,26px);font-weight:800">ұпай = <span id="up" style="color:var(--cyan)">90</span></div><div class="row pop d2" style="justify-content:center;gap:20px;margin-top:18px"><div class="card" id="yes" style="padding:16px 22px">ұпай ≥ 85 → «5»</div><div class="card" id="no" style="padding:16px 22px">әйтпесе → «4»</div></div></div>`, run: (el) => { const v = [90, 70, 95, 60]; let k = 0; return setInterval(() => { const n = v[k++ % 4]; el.querySelector('#up').textContent = n; el.querySelector('#yes').style.borderColor = n >= 85 ? 'var(--lime)' : ''; el.querySelector('#no').style.borderColor = n < 85 ? 'var(--amber)' : ''; }, 1500); } }),
  };
  const specialFor = { g5l4: 'binary', g8l1: 'binary', s4t1: 'array', s4t2: 'array', s4t8: 'array', s4t6: 'sort', s4t5: 'sort', g8l3: 'loop', g6l5: 'loop', g5l7: 'robot', g6l6: 'robot', g7l3: 'ifelse' };

  window.buildScenes = (l) => {
    const sc = [];
    sc.push({ dur: 5000, cap: `${l.grade}-сынып · ${l.unit.title}`, html: `<div><div class="pop" style="width:min(150px,22vw);margin:0 auto 8px">${mascot('wow')}</div><div class="chip lime pop d1">${l.grade}-сынып · ${esc(l.unit.title)}</div><h2 class="pop d2" style="margin-top:12px">${esc(l.title)}</h2><p class="vt pop d3">${esc(l.goal || '')}</p></div>` });
    if (l.keyTerms && l.keyTerms.length) {
      const kt = l.keyTerms.slice(0, 4);
      sc.push({ dur: 4000 + kt.length * 1800, cap: 'Негізгі ұғымдар: ' + kt.map(k => k.term).join(', '), html: `<div style="width:100%"><h2 class="pop">Негізгі ұғымдар</h2><div class="grid g2" style="margin-top:18px;text-align:left">${kt.map((k, i) => `<div class="term pop d${i + 1}"><b>${esc(k.term)}</b><br><span style="font-size:clamp(12px,1.5vw,16px)">${esc(k.def)}</span></div>`).join('')}</div></div>` });
    }
    const sp = specialFor[l.id] && special[specialFor[l.id]];
    if (sp) sc.push(sp());
    chunk(split(l.theory), 2).slice(0, 4).forEach((t, i) => sc.push({ dur: Math.max(6000, t.length * 55), cap: t, html: `<div><div class="kicker pop">Түсіндірме · ${i + 1}</div><p class="vt pop d1" style="font-size:clamp(16px,2.4vw,26px);font-weight:600;line-height:1.45;margin-top:10px">${esc(t)}</p></div>` }));
    const ex = (l.examples || []).find(e => e.code);
    if (ex) sc.push({ dur: 9000, cap: 'Мысал: ' + ex.title, html: `<div style="width:100%"><h2 class="pop">Мысал: ${esc(ex.title)}</h2><pre class="code pop d1" style="text-align:left;display:inline-block;max-width:100%;font-size:clamp(12px,1.7vw,17px)">${hl(ex.code, ex.code.trim().startsWith('<') ? 'html' : 'py')}</pre>${ex.output ? `<div class="out pop d3" style="display:inline-block;text-align:left;min-width:200px">${esc(ex.output)}</div>` : ''}</div>` });
    if (l.realLife) sc.push({ dur: Math.max(6000, l.realLife.length * 50), cap: l.realLife, html: `<div><div class="iconbox ib-amber pop" style="margin:0 auto 12px;width:64px;height:64px">${ic('bulb')}</div><h2 class="pop d1">Өмірде қалай?</h2><p class="vt pop d2">${esc(l.realLife)}</p></div>` });
    sc.push({ dur: 6000, cap: 'Қорытынды: ' + (l.summary || ''), html: `<div><div class="pop" style="width:min(120px,18vw);margin:0 auto">${mascot()}</div><div class="kicker pop d1" style="color:var(--lime)">Есте сақта</div><h2 class="pop d2" style="margin-top:8px">${esc(l.summary || '')}</h2><p class="vt pop d3">Енді тестке өтіп, білімді тексер!</p></div>` });
    return sc;
  };

  window.videoPlayer = (host, l) => {
    const scenes = buildScenes(l);
    const total = scenes.reduce((a, s) => a + s.dur, 0);
    host.innerHTML = `<div class="vplayer"><div class="vbg"></div><div class="vtag chip violet">${ic('video')} Видео сабақ · ${Math.round(total / 1000 / 60 * 10) / 10 || 1} мин</div>
      ${scenes.map((s, i) => `<div class="vscene" data-i="${i}"></div>`).join('')}
      <div class="vcap"></div>
      <div class="vctrl"><button class="pp" aria-label="Ойнату">${ic('play')}</button><div class="bar"><i style="width:0"></i></div><span class="tm" style="font-size:12px;font-family:var(--mono)">0:00</span></div>
      <div class="vbig"><button aria-label="Ойнату">${ic('play')}</button></div></div>`;
    const V = host.querySelector('.vplayer');
    let t = 0, playing = false, cur = -1, timer = null, anim = null, last = 0;
    const fmt = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
    const show = (i) => {
      if (i === cur) return; cur = i;
      if (anim) { clearInterval(anim); anim = null; }
      V.querySelectorAll('.vscene').forEach((e, k) => { e.classList.toggle('on', k === i); if (k === i) { e.innerHTML = scenes[k].html; if (scenes[k].run) anim = scenes[k].run(e); } else e.innerHTML = ''; });
      V.querySelector('.vcap').textContent = scenes[i].cap;
    };
    const at = (ms) => { let a = 0; for (let i = 0; i < scenes.length; i++) { if (ms < a + scenes[i].dur) return i; a += scenes[i].dur; } return scenes.length - 1; };
    const tick = (now) => {
      if (!playing) return;
      t += now - last; last = now;
      if (t >= total) { t = total; playing = false; V.querySelector('.pp').innerHTML = ic('refresh'); if (!V.dataset.done) { V.dataset.done = 1; addXP(10); toast('Видео сабақ көрілді: +10 XP'); } }
      show(at(t)); V.querySelector('.bar i').style.width = (t / total * 100) + '%'; V.querySelector('.tm').textContent = fmt(t) + ' / ' + fmt(total);
      if (playing) timer = requestAnimationFrame(tick);
    };
    const play = () => { if (t >= total) { t = 0; cur = -1; } playing = true; last = performance.now(); V.querySelector('.vbig').style.display = 'none'; V.querySelector('.pp').innerHTML = ic('pause'); timer = requestAnimationFrame(tick); };
    const pause = () => { playing = false; cancelAnimationFrame(timer); V.querySelector('.pp').innerHTML = ic('play'); };
    V.querySelector('.vbig button').onclick = play;
    V.querySelector('.pp').onclick = () => (playing ? pause() : play());
    V.querySelector('.vctrl .bar').onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); t = (e.clientX - r.left) / r.width * total; show(at(t)); V.querySelector('.bar i').style.width = (t / total * 100) + '%'; };
    show(0);
    const obs = new MutationObserver(() => { if (!document.body.contains(V)) { pause(); if (anim) clearInterval(anim); obs.disconnect(); } });
    obs.observe(document.body, { childList: true, subtree: true });
    return { play, pause };
  };
})();
