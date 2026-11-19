/* Чаттар: телефон стиліндегі мессенджер — Бит (ЖИ-кеңесші), Код-дәрігер, Викторина-бот, Сынып тобы */
(function () {
  const BOTS = {
    bit: { n: 'Бит — ЖИ кеңесші', s: 'онлайн · жауап береді', av: 'linear-gradient(135deg,#a3e635,#22d3ee)', ic: 'sparkles', quick: ['Не оқуым керек?', 'Массив деген не?', 'Цикл түсіндірші', 'Олқылығым қандай?', 'Мысал келтір'] },
    doc: { n: 'Код-дәрігер', s: 'кодыңды тексереді', av: 'linear-gradient(135deg,#fb7185,#f59e0b)', ic: 'bug', quick: ['Соңғы қатемді түсіндір', 'if x > 5\n    print(x)', 'print "сәлем"', 'Жиі қателер'] },
    quiz: { n: 'Викторина-бот', s: 'ойнауға дайын', av: 'linear-gradient(135deg,#8b5cf6,#ec4899)', ic: 'trophy', quick: ['Бастау', '5-сынып', '7-сынып', '9-сынып'] },
    class: { n: '9«А» · Информатика', s: '24 қатысушы', av: 'linear-gradient(135deg,#3b82f6,#06b6d4)', ic: 'users', quick: ['Сәлем барлығына!', 'Үй тапсырмасы қандай?', 'Рақмет!'] },
  };
  const now = () => new Date().toTimeString().slice(0, 5);
  S.chats = S.chats || {};
  const hist = (b) => S.chats[b] || (S.chats[b] = initial(b));
  function initial(b) {
    const u = (S.user && S.user.name) || 'дос';
    if (b === 'bit') return [{ f: 'bot', t: `Сәлем, ${u}! 👋 Мен Битпін — сенің ЖИ-кеңесшің.\nМен дайын жауапты бірден бермеймін: бірге ойланып, өзің шешуге көмектесемін 😉` }, { f: 'bot', sticker: 1 }, { f: 'bot', t: 'Тақырыпты жаз (мысалы, «массив», «екілік код», «if») немесе төмендегі батырманы бас.' }];
    if (b === 'doc') return [{ f: 'bot', t: 'Сәлем! Мен Код-дәрігермін 🩺\nPython кодыңды немесе қате хабарламасын жібер — қай жолда не дұрыс емес екенін қазақша түсіндіремін.' }];
    if (b === 'quiz') return [{ f: 'bot', t: 'Викторинаға қош келдің! 🏆\nӘр дұрыс жауап +5 XP. Сыныпты таңда немесе «Бастау» деп жаз.' }];
    return [{ f: 'Мұғалім', t: 'Сәлеметсіздер ме! Жұма күнгі сабақта «Сұрыптау» тақырыбы бойынша шағын жоба қорғаймыз 📌', time: '08:15' }, { f: 'Аружан', t: 'Жақсы! Визуализаторда көпіршіктік сұрыптауды қарап шықтым, түсінікті екен', time: '08:21' }, { f: 'Ерасыл', t: 'Робот ойынының 7-деңгейін қалай өттіңдер? 😅', time: '08:24' }, { f: 'Дана', t: 'Алдымен төмен түс, сосын оңға бұрыл 😉', time: '08:26' }, { f: 'Мұғалім', t: 'Үй тапсырмасы: Код зертханасында Python курсының 6–7 қадамдары. Олқылық тесті тапсырмағандар — міндетті түрде тапсырыңыздар!', time: '09:02' }];
  }

  route('/chat', (v, a, q) => {
    let cur = q.get('bot') || 'bit';
    const topic = q.get('topic');
    v.innerHTML = `<h1>Чаттар</h1><p class="muted">ЖИ-кеңесші, код тексеруші және викторина — бәрі бір мессенджерде.</p>
    <div class="chat-wrap" style="margin-top:14px"><div class="clist" id="cl"></div>
    <div class="phone"><div class="scr"><div class="notch"></div><div class="sbar"><span>${now()}</span><span style="display:flex;gap:5px;align-items:center"><svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#fff"/><rect x="5" y="5" width="3" height="6" rx="1" fill="#fff"/><rect x="10" y="2" width="3" height="9" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="11" rx="1" fill="#fff"/></svg><svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#fff" fill="none"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#a3e635"/><rect x="23.5" y="4" width="2" height="4" rx="1" fill="#fff"/></svg></span></div>
      <div class="chead" id="ch"></div><div class="msgs" id="ms"></div><div class="quick" id="qk"></div>
      <form class="cinput" id="cf"><input id="ci" placeholder="Хабарлама жаз..." autocomplete="off"><button class="send" type="submit">${ic('send')}</button></form></div></div>
    <div class="card" id="side"></div></div>`;
    const drawList = () => { $('#cl', v).innerHTML = Object.entries(BOTS).map(([k, B]) => { const h = hist(k); const last = h[h.length - 1]; return `<div class="ci ${k === cur ? 'on' : ''}" data-k="${k}"><div class="av" style="background:${B.av};color:#fff">${ic(B.ic === 'bug' ? 'bulb' : B.ic)}</div><div style="min-width:0"><b>${B.n}</b><small>${last.sticker ? 'Стикер' : esc((last.t || '').split('\n')[0])}</small></div>${k === 'class' && cur !== 'class' ? '<span class="unread">2</span>' : ''}</div>`; }).join(''); $$('#cl .ci', v).forEach(c => c.onclick = () => { cur = c.dataset.k; open(); }); };
    const msgHTML = (m) => {
      if (m.sticker) return `<div class="sticker" style="width:110px">${mascot('wow')}</div>`;
      const me = m.f === 'me';
      const body = esc(m.t).replace(/```([\s\S]*?)```/g, (x, c) => `<pre>${c}</pre>`).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
      const name = !me && cur === 'class' ? `<b style="display:block;font-size:12px;color:${m.f === 'Мұғалім' ? 'var(--amber)' : 'var(--cyan)'}">${esc(m.f)}</b>` : '';
      const link = m.link ? `<a href="${m.link[0]}" style="display:block;margin-top:6px;padding:7px 10px;border-radius:10px;background:rgba(163,230,53,.15);color:var(--lime);font-weight:700;font-size:13px">${m.link[1]} →</a>` : '';
      return `<div class="msg ${me ? 'me' : 'bot'}">${name}${body}${link}<span class="time">${m.time || ''}${me ? ' ✓✓' : ''}</span></div>`;
    };
    const drawMsgs = () => { const ms = $('#ms', v); ms.innerHTML = hist(cur).map(msgHTML).join(''); ms.scrollTop = 1e9; };
    const open = () => {
      const B = BOTS[cur];
      $('#ch', v).innerHTML = `<a href="#/chat" class="dim">${ic('left')}</a><div class="av" style="background:${B.av};color:#fff">${ic(B.ic === 'bug' ? 'bulb' : B.ic)}</div><div><b>${B.n}</b><div class="on">● ${B.s}</div></div>`;
      $('#qk', v).innerHTML = B.quick.map(x => `<button>${esc(x.split('\n')[0])}${x.includes('\n') ? '…' : ''}</button>`).join('');
      $$('#qk button', v).forEach((b, i) => b.onclick = () => send(B.quick[i]));
      drawList(); drawMsgs(); drawSide();
    };
    const send = (txt) => {
      if (!txt.trim()) return;
      hist(cur).push({ f: 'me', t: txt, time: now() }); drawMsgs(); sfx('click');
      const ms = $('#ms', v); ms.insertAdjacentHTML('beforeend', '<div class="typing" id="ty"><i></i><i></i><i></i></div>'); ms.scrollTop = 1e9;
      const replies = reply(cur, txt);
      setTimeout(() => { const t = $('#ty', v); if (t) t.remove(); replies.forEach(r => hist(cur).push(Object.assign({ f: cur === 'class' ? (r.f || 'Бит') : 'bot', time: now() }, r))); save(); drawMsgs(); drawList(); }, 650 + Math.min(1200, replies.reduce((a, r) => a + (r.t || '').length, 0) * 6));
    };
    $('#cf', v).onsubmit = (e) => { e.preventDefault(); const i = $('#ci', v); send(i.value); i.value = ''; };
    const drawSide = () => {
      const s = $('#side', v);
      const info = { bit: ['Бит қалай көмектеседі?', ['Тақырыпты қарапайым тілмен түсіндіреді', 'Дайын жауапты бермей, бағыттаушы сұрақ қояды (Khanmigo әдісі)', 'Сенің әлсіз тақырыптарыңды біліп, жоспар ұсынады', 'Қажет сабаққа сілтеме береді']], doc: ['Код-дәрігер не тексереді?', ['Қос нүкте (:) мен шегініс қателері', 'Жақшалар мен тырнақшалар жұбы', 'if ішіндегі = мен == шатасуы', 'input() мен int() қолданылуы', 'Зертханадағы соңғы қатеңді түсіндіреді']], quiz: ['Викторина ережесі', ['Сұрақтар 5–9 сынып сабақтарынан алынады', 'Жауап нұсқасын батырмамен таңда', 'Дұрыс жауап: +5 XP', 'Нәтиже дағды картаңа әсер етеді']], class: ['Сынып тобы (демо)', ['Мұғалімнің хабарландырулары', 'Сыныптастармен талқылау', 'Нақты мектепте сынып кодымен қосылады', 'Демо нұсқада хабарламалар тек осы құрылғыда сақталады']] }[cur];
      s.innerHTML = `<div style="width:120px">${mascot()}</div><h3>${info[0]}</h3><ul style="padding-left:18px;margin:0">${info[1].map(x => `<li style="margin:6px 0">${x}</li>`).join('')}</ul><hr class="sep"><p class="dim" style="font-size:12.5px">Кеңесші интернетсіз жұмыс істейді: жауаптар сабақ базасы, терминдер сөздігі және сенің прогресіңді талдайтын ережелерге негізделген.</p><button class="btn ghost sm" id="clr">${ic('trash')} Чатты тазалау</button>`;
      $('#clr', s).onclick = () => { delete S.chats[cur]; save(); open(); };
    };
    open();
    if (topic) { const l = lessonById(topic); if (l) setTimeout(() => send(`«${l.title}» тақырыбын түсіндірші`), 300); }
  });

  // ---------- жауап логикасы ----------
  let quizState = null;
  const norm = s => s.toLowerCase().replace(/[«»"'.,!?()]/g, ' ');
  function findLesson(t) {
    const words = norm(t).split(/\s+/).filter(w => w.length > 3);
    let best = null, bs = 0;
    ALL.forEach(l => { const hay = norm(l.title + ' ' + (l.keyTerms || []).map(k => k.term).join(' ')); let s = 0; words.forEach(w => { if (hay.includes(w.slice(0, Math.max(4, w.length - 2)))) s += w.length; }); if (s > bs) { bs = s; best = l; } });
    return bs >= 4 ? best : null;
  }
  function findTerm(t) {
    const n = norm(t);
    const all = [...glossary, ...ALL.flatMap(l => (l.keyTerms || []).map(k => ({ term: k.term, def: k.def })))];
    return all.find(g => { const k = norm(g.term).trim().split(' ')[0]; return k.length > 2 && n.includes(k.slice(0, Math.max(4, k.length - 2))); });
  }
  function reply(bot, txt) {
    const t = norm(txt);
    if (bot === 'bit') {
      if (/сәлем|салем|привет|hello|hi\b/.test(t)) return [{ t: 'Сәлем! Бүгін не үйренгің келеді? 😊' }];
      if (/не оқу|не істе|ұсын|жоспар|келесі/.test(t)) { const r = recommend(); return r.length ? [{ t: 'Сенің нәтижелеріңді талдадым 🧠 Мына ретпен оқуды ұсынамын:\n' + r.map((x, i) => `${i + 1}. **${x.l.title}** — ${x.why}`).join('\n') }, { t: 'Біріншісінен бастайық па?', link: ['#/lesson/' + r[0].l.id, r[0].l.title] }] : [{ t: 'Алдымен диагностикадан өтейік — сонда жеке жол құрамын.', link: ['#/diag', 'Диагностика'] }]; }
      if (/олқылық|әлсіз|қиын/.test(t)) { const g = SKILLS.filter(s => S.skills[s.id] != null && S.skills[s.id] < 60); return g.length ? [{ t: `Сенде ${g.length} олқылық бар:\n` + g.slice(0, 5).map(s => `• ${s.g}-сынып: ${s.name} — ${S.skills[s.id]}%`).join('\n') + '\n\nЕсіңде болсын: олқылық — кемшілік емес, жай ғана өтпей қалған тақырып 💪' }, { t: 'Картаны қарап шық:', link: ['#/gap', 'Олқылық картасы'] }] : [{ t: 'Әзірге олқылық табылмады. Олқылық тестін тапсырып көр — 8 минут қана!', link: ['#/diag/gap', 'Олқылық тесті'] }]; }
      if (/мысал/.test(t)) { const last = [...hist('bit')].reverse().find(m => m.lesson); const l = last ? lessonById(last.lesson) : ALL.find(x => x.id === 's4t1'); const ex = (l.examples || []).find(e => e.code) || l.examples[0]; return ex ? [{ t: `«${l.title}» бойынша мысал:\n` + (ex.code ? '```' + ex.code + '```' : ex.text) + (ex.output ? '\nНәтижесі:\n```' + ex.output + '```' : '') }, { t: 'Енді өзің өзгертіп көр: бір санды ауыстырсаң, нәтиже қалай өзгереді? 🤔', link: ['#/lab?lang=py&code=' + encodeURIComponent(ex.code || ''), 'Зертханада ашу'] }] : [{ t: 'Бұл тақырыпта код мысалы жоқ, бірақ сабақта видео бар!' }]; }
      if (/рақмет|рахмет|спасибо/.test(t)) return [{ t: 'Әрқашан көмектесемін! Тағы сұрақ болса — жаз 🙌' }];
      const l = findLesson(txt);
      if (l) { const k = (l.keyTerms || [])[0]; return [{ t: `**${l.title}** (${l.grade}-сынып) 📘\n${(l.summary || '')}\n\n${k ? `Негізгі ұғым — **${k.term}**: ${k.def}` : ''}`, lesson: l.id }, { t: `Ойланып көр: ${guideQ(l)}\n\nЖауабыңды жаз, немесе «мысал келтір» де.` , link: ['#/lesson/' + l.id, 'Видео сабақты көру'] }]; }
      const g = findTerm(txt);
      if (g) return [{ t: `**${g.term}** — ${g.def}` }, { t: 'Түсінікті ме? Флэш-карталармен қайталап алуға болады.', link: ['#/cards', 'Флэш-карталар'] }];
      const qk = [...hist('bit')].reverse().find(m => m.lesson);
      if (qk) return [{ t: 'Жақсы ой! 👍 Енді өзіңді тексер: сабақтағы тестті тапсырып көр — деңгейіңе қарай сұрақтар іріктеледі.', link: ['#/lesson/' + qk.lesson, 'Тестке өту'] }];
      return [{ t: 'Хм, мұны әлі түсінбедім 🤖 Тақырып атауын нақтылап жаз: «екілік код», «массив», «цикл», «деректер базасы», «PyGame»...' }];
    }
    if (bot === 'doc') {
      if (/соңғы|последн/.test(t)) { const c = sessionStorage.getItem('bp-lastcode'), e = sessionStorage.getItem('bp-lasterr'); if (!c) return [{ t: 'Зертханада әлі код іске қосылмаған. Кодты осында жапсырып жібер!', link: ['#/lab', 'Код зертханасы'] }]; return diagnose(c, e); }
      if (/жиі қате/.test(t)) return [{ t: 'Python-дағы ең жиі 5 қате:\n1. if/for/def соңында `:` жоқ\n2. Шегініс (4 бос орын) жоқ\n3. `=` орнына `==` керек (салыстыруда)\n4. input() мәтін қайтарады — санға `int()` керек\n5. Индекс 0-ден басталады, a[len(a)] — қате' }];
      return diagnose(txt, '');
    }
    if (bot === 'quiz') {
      const g = (t.match(/([5-9])/) || [])[1];
      if (/бастау|ойна|[5-9]/.test(t) && !(quizState && quizState.wait && /^[аәбв1-4]/.test(t.trim()))) { quizState = { g: g ? +g : null, n: 0, ok: 0 }; return askQ(); }
      if (quizState && quizState.wait) {
        const Q = quizState.wait; const map = { а: 0, ә: 1, б: 2, в: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
        let k = map[t.trim()[0]]; if (k == null) k = Q.options.findIndex(o => norm(o).trim() === t.trim());
        const good = k === Q.answer; quizState.n++; if (good) { quizState.ok++; addXP(5); } updateSkill(Q.skill, good);
        const fb = { t: (good ? '✅ Дұрыс! +5 XP\n' : `❌ Дұрыс жауап: **${Q.options[Q.answer]}**\n`) + (Q.explain || '') };
        if (quizState.n >= 5) { const r = [fb, { t: `Викторина аяқталды! Нәтиже: ${quizState.ok}/5 🏁\n${quizState.ok >= 4 ? 'Керемет! Сен — нағыз чемпион! 🏆' : 'Жақсы! Қайталау үшін «Бастау» деп жаз.'}` }]; quizState = null; return r; }
        return [fb, ...askQ()];
      }
      return [{ t: 'Ойынды бастау үшін «Бастау» деп жаз немесе сыныпты таңда 🎯' }];
    }
    if (/үй тапсырма/.test(t)) return [{ f: 'Мұғалім', t: 'Python курсының 6–7 қадамдары және Олқылық тесті. Мерзімі — жұма 📅' }];
    if (/сәлем/.test(t)) return [{ f: 'Аружан', t: 'Сәлем! 👋' }];
    return [{ f: 'Дана', t: '👍' }];
  }
  function guideQ(l) {
    const qs = { s4t1: 'a = [3, 8, 5] болса, a[1] неге тең? Неліктен a[3] деп жазуға болмайды?', g5l4: '0110 екілік санында қай шамдар жанып тұр? Ол нешеге тең?', g8l3: 'range(2, 10, 2) қандай сандарды береді?', g7l3: 'Егер ұпай = 85 болса, «ұпай > 85» шарты ақиқат па, жалған ба?', s4t6: '[4, 1, 3] массивін көпіршіктік сұрыптауда бірінші қандай ауыстыру жасалады?' };
    if (qs[l.id]) return qs[l.id];
    const Q = (l.quiz || [])[0]; return Q ? Q.q + ' (жауап нұсқаларын сабақтың тестінде көресің)' : 'Бұл тақырып күнделікті өмірде қайда кездеседі?';
  }
  function askQ() {
    const pool = ALL.filter(l => !quizState.g || l.grade === quizState.g).flatMap(l => (l.quiz || []).map(q => ({ ...q, skill: l.unit.skill, lt: l.title, g: l.grade })));
    const Q = pool[Math.floor(Math.random() * pool.length)];
    quizState.wait = Q;
    const L = ['А', 'Ә', 'Б', 'В'];
    setTimeout(() => { const qk = $('#qk'); if (qk && Q) { qk.innerHTML = Q.options.map((o, i) => `<button>${L[i]}) ${esc(o)}</button>`).join(''); $$('#qk button').forEach((b, i) => b.onclick = () => { const inp = $('#ci'); inp.value = L[i].toLowerCase(); $('#cf').requestSubmit(); }); } }, 1500);
    return [{ t: `**${quizState.n + 1}/5 сұрақ** · ${Q.g}-сынып · ${Q.lt}\n\n${Q.q}\n\n` + Q.options.map((o, i) => `${L[i]}) ${o}`).join('\n') }];
  }
  function diagnose(code, err) {
    const lines = code.split('\n'); const out = [];
    let par = 0, br = 0;
    lines.forEach((ln, i) => {
      const s = ln.replace(/#.*$/, ''); const tr = s.trim(); const n = i + 1;
      if (/^(if|elif|else|for|while|def|class|try|except)\b/.test(tr) && !/:\s*$/.test(tr)) out.push(`${n}-жол: \`${tr}\` соңында қос нүкте \`:\` жетіспейді.`);
      if (/:\s*$/.test(tr) && lines[i + 1] != null && lines[i + 1].trim() && (lines[i + 1].match(/^\s*/)[0].length <= (ln.match(/^\s*/)[0].length))) out.push(`${n + 1}-жол: блок ішіндегі жол 4 бос орынмен шегінуі керек.`);
      if (/^(if|elif|while)\b[^=!<>]*[^=!<>]=[^=]/.test(tr)) out.push(`${n}-жол: салыстыру үшін \`==\` жаз, \`=\` — меншіктеу.`);
      if (/^print\s+["'\w]/.test(tr)) out.push(`${n}-жол: Python 3-те \`print(...)\` жақшамен жазылады.`);
      if (/input\(\)\s*[+\-*/]|[+\-*/]\s*input\(\)/.test(tr)) out.push(`${n}-жол: input() мәтін қайтарады — есептеу үшін \`int(input())\` қолдан.`);
      if (/\b(Print|Input|If|For)\b/.test(tr)) out.push(`${n}-жол: Python үлкен-кіші әріпті ажыратады: \`print\`, \`input\`, \`if\` кіші әріппен.`);
      par += (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length; br += (s.match(/\[/g) || []).length - (s.match(/\]/g) || []).length;
      if (((s.match(/"/g) || []).length % 2) === 1) out.push(`${n}-жол: тырнақша \`"\` жабылмаған.`);
    });
    if (par > 0) out.push('Жабылмаған жақша `(` бар.'); if (par < 0) out.push('Артық жабылатын жақша `)` бар.'); if (br) out.push('Шаршы жақшалар `[ ]` жұбы сәйкес емес.');
    if (err && /Error/.test(err)) out.unshift('Соңғы қате: `' + (err.split('\n').find(x => /Error/.test(x)) || '').trim() + '`');
    if (!out.length) return [{ t: 'Синтаксистік қате таппадым ✅\nЕгер нәтиже күткендей болмаса — логиканы тексер: циклдың шекарасы (range), шарттың белгісі (< немесе <=), индекстер.' }, { t: 'Кодты зертханада іске қосып көр:', link: ['#/lab?lang=py&code=' + encodeURIComponent(code), 'Зертханада ашу'] }];
    return [{ t: '🩺 Диагноз:\n' + out.slice(0, 6).map(x => '• ' + x).join('\n') }, { t: 'Түзетіп, қайта іске қосып көр. Түзетілген нұсқаны маған қайта жіберсең, тағы тексеремін 😉', link: ['#/lab?lang=py&code=' + encodeURIComponent(code), 'Зертханада түзету'] }];
  }
})();
