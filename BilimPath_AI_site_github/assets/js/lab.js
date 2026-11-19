/* Код зертханасы: Python (Pyodide), JavaScript, HTML/CSS, SQL (sql.js), C++ (Wandbox) + интерактивті курстар */
(function () {
  const LANGS = {
    py: { name: 'Python', file: 'main.py', c: 'var(--lime)', start: '# Python — 7–9 сынып\naty = "BilimPath"\nfor i in range(1, 4):\n    print(i, "-қадам:", aty)\n\na = [7, 3, 9, 2]\nprint("Ең үлкені:", max(a))' },
    js: { name: 'JavaScript', file: 'main.js', c: 'var(--amber)', start: '// JavaScript — сайттардың тілі\nconst bagalar = [5, 4, 5, 3];\nlet s = 0;\nfor (const b of bagalar) s += b;\nconsole.log("Орташа баға:", s / bagalar.length);' },
    html: { name: 'HTML/CSS', file: 'index.html', c: 'var(--coral)', start: '<style>\n  body { font-family: sans-serif; background: #0f1533; color: white; text-align: center; }\n  .card { background: linear-gradient(135deg, #8b5cf6, #22d3ee); padding: 24px; border-radius: 20px; }\n  button { font-size: 18px; padding: 10px 20px; border-radius: 12px; border: 0; }\n</style>\n<div class="card">\n  <h1>Менің алғашқы сайтым</h1>\n  <p>Мен информатиканы жақсы көремін!</p>\n  <button onclick="this.textContent = \'Рақмет! 🎉\'">Бас мені</button>\n</div>' },
    sql: { name: 'SQL', file: 'query.sql', c: 'var(--cyan)', start: '-- «oqushylar» кестесі дайын тұр\nSELECT aty, synyp, informatika\nFROM oqushylar\nWHERE informatika > 80\nORDER BY informatika DESC;' },
    cpp: { name: 'C++', file: 'main.cpp', c: '#c4b5fd', start: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[] = {7, 3, 9, 2};\n    int mx = a[0];\n    for (int i = 1; i < 4; i++)\n        if (a[i] > mx) mx = a[i];\n    cout << "Max: " << mx << endl;\n    return 0;\n}' },
  };
  window.LANGS = LANGS;
  const SQL_SEED = `CREATE TABLE oqushylar (id INTEGER, aty TEXT, synyp TEXT, informatika INTEGER, matematika INTEGER);
INSERT INTO oqushylar VALUES (1,'Аружан','9А',92,85),(2,'Ерасыл','9А',74,88),(3,'Дана','9Ә',88,79),(4,'Нұрлан','9Ә',65,70),(5,'Томирис','9А',81,93),(6,'Санжар','9Б',57,62),(7,'Мадина','9Б',95,90),(8,'Бекзат','9Ә',70,66);`;

  // ---------- орындаушылар ----------
  let pyP = null, sqlP = null, sqlDB = null;
  const loadScript = (src) => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Жүктелмеді: ' + src)); document.head.append(s); });
  async function runPy(code, stdin, out) {
    if (!pyP) { out('sys', 'Python ортасы жүктелуде (алғашқы рет 5–15 секунд)...\n'); pyP = loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js').then(() => loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' })); pyP.catch(() => { pyP = null; }); }
    const py = await pyP;
    const lines = (stdin || '').split('\n');
    py.setStdout({ batched: s => out('', s + '\n') });
    py.setStderr({ batched: s => out('err', s + '\n') });
    py.setStdin({ stdin: () => (lines.length ? lines.shift() : null) });
    try { await py.runPythonAsync(code); } catch (e) { out('err', translateErr(String(e.message || e))); }
  }
  function translateErr(m) {
    const last = m.trim().split('\n').pop();
    const tips = [[/SyntaxError: expected ':'/, 'Жол соңында қос нүкте (:) жетіспейді.'], [/IndentationError/, 'Шегініс қатесі: блок ішіндегі жолдар 4 бос орынмен басталуы керек.'], [/NameError: name '(\w+)'/, 'Айнымалы немесе функция анықталмаған — атауын тексер.'], [/IndexError/, 'Индекс массив шегінен шықты: соңғы индекс = len(a) - 1.'], [/TypeError/, 'Тип қатесі: мәтін мен санды тікелей қосуға болмайды — int() немесе str() қолдан.'], [/ZeroDivisionError/, 'Нөлге бөлуге болмайды.'], [/ValueError/, 'Мән қатесі: int() тек сан жазылған мәтінді айналдырады.'], [/EOFError/, 'input() үшін «Енгізу» өрісіне мән жаз.']];
    const t = tips.find(([r]) => r.test(m));
    const lineM = m.match(/line (\d+)/g); const ln = lineM ? lineM.pop() : '';
    return last + '\n' + (t ? '💡 Код-дәрігер: ' + t[1] + (ln ? ' (' + ln.replace('line', 'жол') + ')' : '') + '\n' : '');
  }
  function runJS(code, out) {
    return new Promise((res) => {
      const src = `const fmt=a=>a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ');console.log=(...a)=>postMessage(['',fmt(a)+'\\n']);console.error=(...a)=>postMessage(['err',fmt(a)+'\\n']);onmessage=e=>{try{(new Function(e.data))();}catch(err){postMessage(['err',err.name+': '+err.message+'\\n'])}postMessage(['done'])}`;
      const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      const to = setTimeout(() => { w.terminate(); out('err', 'Уақыт бітті (5 с): шексіз цикл болуы мүмкін.\n'); res(); }, 5000);
      w.onmessage = e => { if (e.data[0] === 'done') { clearTimeout(to); w.terminate(); res(); } else out(e.data[0], e.data[1]); };
      w.postMessage(code);
    });
  }
  async function runSQL(code, out, host) {
    try {
      if (!sqlP) { out('sys', 'SQL қозғалтқышы жүктелуде...\n'); sqlP = loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js').then(() => initSqlJs({ locateFile: f => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/' + f })); sqlP.catch(() => { sqlP = null; }); }
      const SQL = await sqlP;
      if (!sqlDB) { sqlDB = new SQL.Database(); sqlDB.run(SQL_SEED); }
      const rs = sqlDB.exec(code);
      if (!rs.length) out('', 'Орындалды ✔\n');
      rs.forEach(r => host.insertAdjacentHTML('beforeend', `<table class="sqltable"><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${r.values.map(row => `<tr>${row.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table><div class="sys" style="color:#7c87c4">${r.values.length} жол</div>`));
    } catch (e) { out('err', 'SQL қатесі: ' + (e.message || e) + '\n'); }
  }
  async function runCpp(code, stdin, out) {
    out('sys', 'C++ компиляциясы (Wandbox сервері)...\n');
    try {
      const r = await fetch('https://wandbox.org/api/compile.json', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, compiler: 'gcc-head', stdin: stdin || '', options: 'warning' }) });
      const j = await r.json();
      if (j.compiler_error) out('err', j.compiler_error);
      if (j.program_output) out('', j.program_output);
      if (j.program_error) out('err', j.program_error);
      out('sys', '\nАяқталды, код: ' + j.status + '\n');
    } catch (e) { out('err', 'C++ серверіне қосылу мүмкін болмады. Интернетті тексер немесе кодты onlinegdb.com сайтында іске қос.\n'); }
  }

  // ---------- редактор ----------
  window.makeEditor = (host, lang, code) => {
    host.innerHTML = `<div class="editor"><div class="ehead"><span class="dots"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></span><span style="font-family:var(--mono);font-size:12.5px;color:#8a93c4">${LANGS[lang].file}</span></div><div class="ebody"><div class="gutter"></div><div class="ewrap"><pre></pre><textarea spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div></div></div>`;
    const ta = $('textarea', host), pre = $('pre', host), gut = $('.gutter', host);
    const hlang = lang === 'html' ? 'html' : lang;
    const sync = () => { pre.innerHTML = hl(ta.value, hlang) + '\n'; gut.textContent = ta.value.split('\n').map((_, i) => i + 1).join('\n'); pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft; gut.style.transform = `translateY(${-ta.scrollTop}px)`; };
    ta.value = code; sync();
    ta.addEventListener('input', sync); ta.addEventListener('scroll', sync);
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('    ', s, ta.selectionEnd, 'end'); sync(); }
      if (e.key === 'Enter') { const s = ta.selectionStart; const line = ta.value.slice(0, s).split('\n').pop(); let ind = line.match(/^\s*/)[0]; if (/[:{]\s*$/.test(line)) ind += '    '; e.preventDefault(); ta.setRangeText('\n' + ind, s, ta.selectionEnd, 'end'); sync(); }
    });
    return { get: () => ta.value, set: (v) => { ta.value = v; sync(); } };
  };

  window.runCode = async (lang, code, stdin, con, prev) => {
    con.innerHTML = '';
    const out = (k, s) => { const sp = document.createElement('span'); if (k) sp.className = k; sp.textContent = s; con.append(sp); con.scrollTop = 1e9; };
    S.codeRuns++; S.daily.code++; S.langs = [...new Set([...(S.langs || []), lang])]; save(); checkBadges();
    const t0 = performance.now();
    if (lang === 'py') await runPy(code, stdin, out).catch(e => out('err', 'Python жүктелмеді. Интернет байланысын тексер.\n'));
    else if (lang === 'js') await runJS(code, out);
    else if (lang === 'sql') await runSQL(code, out, con);
    else if (lang === 'cpp') await runCpp(code, stdin, out);
    else if (lang === 'html') { prev.srcdoc = code; out('sys', 'Нәтиже оң жақтағы терезеде ✔\n'); }
    if (lang !== 'html') out('sys', `\n— ${Math.round(performance.now() - t0)} мс`);
    return con.innerText;
  };

  // ---------- ЗЕРТХАНА БЕТІ ----------
  route('/lab', (v, a, q) => {
    let lang = q.get('lang') || 'py';
    const init = q.get('code');
    v.innerHTML = `<div class="row"><div><h1>Код зертханасы</h1><p class="muted" style="margin:0">Нағыз компиляторлар браузердің ішінде. Қатені Код-дәрігер қазақша түсіндіреді.</p></div></div>
      <div class="tabs" id="lt" style="margin:14px 0">${Object.entries(LANGS).map(([k, L]) => `<button data-l="${k}" class="${k === lang ? 'on' : ''}"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${L.c};margin-right:6px"></span>${L.name}</button>`).join('')}</div>
      <div class="lab"><div><div id="ed"></div><div class="row" style="margin-top:12px"><button class="btn" id="run">${ic('play')} Іске қосу</button><button class="btn ghost sm" id="rs">${ic('refresh')} Бастапқы код</button><a class="btn ghost sm" id="ask" href="#/chat?bot=doc">${ic('chat')} Код-дәрігер</a><span class="sp"></span><span class="dim" style="font-size:12px">Tab = 4 бос орын</span></div>
      <div id="stdinW" style="margin-top:12px"><label class="dim" style="font-size:13px;font-weight:700">Енгізу (input / cin) — әр мән жаңа жолда</label><textarea class="inp" id="stdin" rows="2" style="font-family:var(--mono);margin-top:4px"></textarea></div></div>
      <div><div class="row" style="margin-bottom:8px"><b>${ic('server')} Нәтиже</b><span class="sp"></span><span class="chip" id="lname"></span></div><div class="console" id="con"><span class="sys">«Іске қосу» батырмасын бас ▶</span></div><iframe class="preview" id="prev" sandbox="allow-scripts allow-modals" style="display:none;margin-top:10px"></iframe>
      <div class="card" style="margin-top:12px;padding:14px"><b>${ic('bulb')} Мысалдар</b><div class="row" id="ex" style="margin-top:8px;gap:6px"></div></div></div></div>`;
    let ed;
    const EX = {
      py: [['Көбейту кестесі', 'n = 7\nfor i in range(1, 11):\n    print(n, "x", i, "=", n * i)'], ['Көпіршіктік сұрыптау', 'a = [5, 2, 4, 1, 3]\nn = len(a)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)'], ['input() мысалы', 'aty = input()\njas = int(input())\nprint("Сәлем,", aty + "!", "10 жылдан кейін", jas + 10, "жаста боласың")'], ['Екі өлшемді массив', 'm = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nfor row in m:\n    print(*row)\nprint("Диагональ:", [m[i][i] for i in range(3)])']],
      js: [['Кездейсоқ сан', 'const n = Math.floor(Math.random() * 100);\nconsole.log("Ойлаған саным:", n);'], ['Функция', 'function kvadrat(x) { return x * x; }\nfor (let i = 1; i <= 5; i++) console.log(i, "→", kvadrat(i));']],
      html: [['Визитка', '<h1 style="color:#8b5cf6">Мен — болашақ бағдарламашы</h1>\n<ul><li>Python</li><li>HTML</li><li>Робототехника</li></ul>'], ['Анимация', '<style>.b{width:80px;height:80px;background:#a3e635;border-radius:20px;animation:s 2s infinite alternate}@keyframes s{to{transform:translateX(200px) rotate(180deg);background:#22d3ee}}</style><div class="b"></div>']],
      sql: [['Барлығы', 'SELECT * FROM oqushylar;'], ['Сынып бойынша орташа', 'SELECT synyp, ROUND(AVG(informatika), 1) AS orta\nFROM oqushylar\nGROUP BY synyp;'], ['Сүзгі: 9А', "SELECT aty, matematika FROM oqushylar WHERE synyp = '9А';"]],
      cpp: [['Цикл', '#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 5; i++)\n        cout << i << " ";\n    return 0;\n}'], ['cin', '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << "Қосынды: " << a + b;\n}']],
    };
    const setLang = (l, code) => {
      lang = l; $$('#lt button', v).forEach(b => b.classList.toggle('on', b.dataset.l === l));
      ed = makeEditor($('#ed', v), l, code || LANGS[l].start);
      $('#lname', v).textContent = LANGS[l].name;
      $('#prev', v).style.display = l === 'html' ? 'block' : 'none';
      $('#stdinW', v).style.display = l === 'py' || l === 'cpp' ? 'block' : 'none';
      $('#ex', v).innerHTML = (EX[l] || []).map((e, i) => `<button class="btn ghost sm" data-i="${i}">${e[0]}</button>`).join('');
      $$('#ex button', v).forEach(b => b.onclick = () => ed.set(EX[l][+b.dataset.i][1]));
      if (l === 'html') $('#prev', v).srcdoc = ed.get();
      if (l === 'py') $('#stdin', v).value = 'Айдана\n14';
    };
    setLang(lang, init);
    $$('#lt button', v).forEach(b => b.onclick = () => setLang(b.dataset.l));
    $('#rs', v).onclick = () => ed.set(LANGS[lang].start);
    $('#run', v).onclick = async (e) => { const b = e.currentTarget; b.disabled = true; await runCode(lang, ed.get(), $('#stdin', v).value, $('#con', v), $('#prev', v)); b.disabled = false; if (S.daily.code === 1) addXP(10, e); else addXP(2); sessionStorage.setItem('bp-lastcode', ed.get()); sessionStorage.setItem('bp-lasterr', $('#con', v).innerText); };
  });

  // ---------- КУРСТАР ----------
  const C = (t, th, code, task, expect) => ({ t, th, code, task, expect });
  window.COURSES = {
    py: { title: 'Python: нөлден ойынға дейін', lvl: '7–9 сынып', steps: [
      C('print() — алғашқы программа', 'print() жақшадағыны экранға шығарады. Мәтін тырнақшаға алынады.', 'print("Сәлем, әлем!")', 'Экранға дәл осы мәтінді шығар: Мен Python үйренемін', 'Мен Python үйренемін'),
      C('Айнымалылар', 'Айнымалы — мән сақтайтын қорап: x = 5. Есептеу: + - * / // %.', 'a = 12\nb = 5\nprint(a + b)', 'a = 12, b = 5 болса, a * b көбейтіндісін шығар.', '60'),
      C('Шарт: if / else', 'if шарт: блогы шарт ақиқат болса орындалады. Шегініс — 4 бос орын.', 'x = 15\nif x > 10:\n    print("үлкен")\nelse:\n    print("кіші")', 'n = 7. Егер n жұп болса «жұп», әйтпесе «тақ» деп шығар. (Кеңес: n % 2 == 0)', 'тақ'),
      C('for циклі', 'for i in range(1, 6): блокты i = 1..5 үшін қайталайды.', 'for i in range(1, 6):\n    print(i)', '1-ден 5-ке дейінгі сандардың қосындысын шығар.', '15'),
      C('while циклі', 'while шарт: — шарт ақиқат болғанша қайталайды. Айнымалыны өзгертуді ұмытпа!', 'n = 1\nwhile n < 100:\n    n = n * 2\nprint(n)', '1-ден бастап 3-ке көбейте бер, 50-ден асқан алғашқы санды шығар.', '81'),
      C('Тізім (массив)', 'a = [4, 7, 2] — тізім. a[0] — бірінші элемент, len(a) — ұзындық, sum(a) — қосынды.', 'a = [4, 7, 2, 9]\nprint(a[1], len(a))', 'a = [4, 7, 2, 9] тізімінің ең кіші элементін шығар.', '2'),
      C('Функция', 'def атау(параметр): ... return нәтиже', 'def kv(x):\n    return x * x\nprint(kv(6))', 'Екі санның үлкенін қайтаратын ulken(a, b) функциясын жаз да, ulken(8, 13) нәтижесін шығар.', '13'),
      C('Жобa: сұрыптау', 'Көпіршіктік сұрыптау — іргелес элементтерді салыстырып ауыстыру. sorted() дайын функциясы да бар.', 'a = [5, 1, 4]\nprint(sorted(a))', 'a = [9, 3, 7, 1] тізімін кему ретімен шығар (кеңес: reverse=True).', '[9, 7, 3, 1]'),
    ] },
    js: { title: 'JavaScript: сайтқа жан бітір', lvl: '8–9 сынып', steps: [
      C('console.log', 'console.log() — консольге шығару.', 'console.log("Сәлем!");', 'Консольге JavaScript сөзін шығар.', 'JavaScript'),
      C('let және const', 'let — өзгеретін, const — тұрақты айнымалы.', 'let x = 3;\nx = x + 4;\nconsole.log(x);', 'const a = 9, b = 4 — олардың айырмасын шығар.', '5'),
      C('if және циклдар', 'for (let i = 0; i < 3; i++) { ... }', 'for (let i = 0; i < 3; i++) console.log(i);', '2, 4, 6 сандарын әрқайсысын жаңа жолға шығар.', '2\n4\n6'),
      C('Массив әдістері', 'arr.length, arr.push(x), arr.map(f)', 'const a = [1, 2, 3];\nconsole.log(a.map(x => x * 10));', '[1, 2, 3, 4] массивінің элементтер қосындысын шығар.', '10'),
    ] },
    html: { title: 'HTML/CSS: өз сайтың', lvl: '8 сынып', steps: [
      C('Тақырып пен абзац', '<h1> — тақырып, <p> — абзац.', '<h1>Сәлем!</h1>\n<p>Бұл менің бетім.</p>', '<h1> ішіне атыңды жаз, астына <p> қос.', null),
      C('Түстер мен қаріптер', 'style атрибуты немесе <style> тегі: color, background, font-size.', '<h1 style="color:teal">Түсті тақырып</h1>', 'Фонды қара көк (background:#0f1533), мәтінді ақ қыл.', null),
      C('Батырма', '<button onclick="..."> — басқанда әрекет.', '<button onclick="alert(\'Иә!\')">Бас</button>', 'Басқанда мәтіні өзгеретін батырма жаса.', null),
    ] },
    sql: { title: 'SQL: деректер базасының тілі', lvl: '9 сынып', steps: [
      C('SELECT', 'SELECT бағандар FROM кесте — деректерді алу.', 'SELECT aty FROM oqushylar;', 'Барлық оқушылардың аты мен сыныбын шығар.', null),
      C('WHERE — сүзгі', 'WHERE шарт — тек шартқа сай жолдар (Excel-дегі сүзгі сияқты).', "SELECT * FROM oqushylar WHERE synyp = '9Ә';", 'Математикадан 85-тен жоғары алғандарды шығар.', null),
      C('ORDER BY — сұрыптау', 'ORDER BY баған DESC — кему ретімен.', 'SELECT aty, informatika FROM oqushylar ORDER BY informatika DESC;', 'Информатикадан ең жоғары 3 оқушыны шығар (LIMIT 3).', null),
      C('AVG, COUNT', 'Агрегат функциялар: COUNT(*), AVG(баған), MAX(баған).', 'SELECT COUNT(*) FROM oqushylar;', 'Информатика бағасының орташасын тап.', null),
    ] },
    cpp: { title: 'C++: олимпиадаға алғашқы қадам', lvl: '8–9 сынып', steps: [
      C('cout', 'cout << мән — шығару. Әр команда ; белгісімен аяқталады.', '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello";\n}', 'Экранға BilimPath сөзін шығар.', 'BilimPath'),
      C('Айнымалы және cin', 'int a; cin >> a; — санды енгізу.', '#include <iostream>\nusing namespace std;\nint main() {\n    int a = 6, b = 7;\n    cout << a * b;\n}', 'a = 20, b = 3 болса, a % b (бөлгендегі қалдық) шығар.', '2'),
      C('for циклі', 'for (int i = 1; i <= n; i++) { ... }', '#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 3; i++) cout << i << " ";\n}', '1-ден 10-ға дейінгі сандардың қосындысын шығар.', '55'),
    ] },
  };

  route('/courses', (v, a) => {
    S.course = S.course || {};
    const lang = a[0], step = +(a[1] || 0);
    if (!lang) {
      v.innerHTML = `<h1>Бағдарламалау тілдерінің курстары</h1><p class="muted">Қадамдық интерактивті сабақтар: оқы → кодты өзгерт → «Тексеру» батырмасы жауапты автоматты тексереді.</p>
      <div class="grid g3" style="margin-top:16px">${Object.entries(COURSES).map(([k, c]) => { const d = (S.course[k] || []).length; return `<a href="#/courses/${k}" class="card" style="border-top:4px solid ${LANGS[k].c}"><div class="row"><div class="iconbox" style="background:${LANGS[k].c};color:#0a0e24">${ic(k === 'html' ? 'layout' : k === 'sql' ? 'database' : 'code')}</div><div><h3 style="margin:0">${LANGS[k].name}</h3><div class="dim" style="font-size:12.5px">${c.lvl} · ${c.steps.length} қадам</div></div></div><p style="margin-top:12px">${c.title}</p><div class="bar"><i style="width:${d / c.steps.length * 100}%"></i></div><div class="dim" style="font-size:12px;margin-top:6px">${d} / ${c.steps.length} аяқталды</div></a>`; }).join('')}</div>`;
      return;
    }
    const c = COURSES[lang]; const s = c.steps[step];
    v.innerHTML = `<div class="row"><a class="btn ghost sm" href="#/courses">${ic('left')} Курстар</a><b>${LANGS[lang].name}</b><span class="sp"></span>${c.steps.map((_, i) => `<a href="#/courses/${lang}/${i}" style="width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-weight:800;font-size:12px;background:${(S.course[lang] || []).includes(i) ? 'var(--lime)' : i === step ? 'var(--card2)' : 'var(--card)'};color:${(S.course[lang] || []).includes(i) ? '#0a0e24' : 'var(--muted)'};border:1px solid var(--line2)">${i + 1}</a>`).join('')}</div>
    <div class="lab" style="margin-top:14px"><div><div class="card"><div class="kicker">${step + 1}-қадам</div><h2>${esc(s.t)}</h2><p>${esc(s.th)}</p><div class="card" style="background:var(--card2);border-color:rgba(163,230,53,.35)"><b style="color:var(--lime)">${ic('target')} Тапсырма:</b> ${esc(s.task)}</div></div><div id="ed" style="margin-top:12px"></div>
    <div class="row" style="margin-top:12px"><button class="btn ghost" id="run">${ic('play')} Іске қосу</button><button class="btn" id="chk">${ic('check')} Тексеру</button><span class="sp"></span>${step < c.steps.length - 1 ? `<a class="btn ghost sm" href="#/courses/${lang}/${step + 1}">Келесі ${ic('right')}</a>` : ''}</div></div>
    <div><div class="console" id="con"><span class="sys">Нәтиже осында шығады</span></div><iframe class="preview" id="prev" sandbox="allow-scripts allow-modals" style="display:${lang === 'html' ? 'block' : 'none'};margin-top:10px"></iframe><div id="verdict" style="margin-top:12px"></div></div></div>`;
    const ed = makeEditor($('#ed', v), lang, s.code);
    const run = () => runCode(lang, ed.get(), '', $('#con', v), $('#prev', v));
    $('#run', v).onclick = run;
    $('#chk', v).onclick = async (e) => {
      const outTxt = await run();
      const got = outTxt.replace(/\n?—\s*\d+\s*мс\s*$/, '').replace(/Орындалды ✔/, '').trim();
      const ok = s.expect == null ? ed.get().trim() !== s.code.trim() : got.split('\n').filter(x => !/жүктелуде|Аяқталды|компиляциясы/.test(x)).join('\n').trim().endsWith(s.expect);
      $('#verdict', v).innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><div class="iconbox ${ok ? 'ib-lime' : 'ib-coral'}">${ic(ok ? 'check' : 'x')}</div><div><b>${ok ? 'Дұрыс! Қадам аяқталды.' : 'Әзірге емес.'}</b><div>${ok ? '+20 XP' : s.expect != null ? 'Күтілетін нәтиже: ' + esc(s.expect) : 'Кодты тапсырма бойынша өзгерт.'}</div></div></div>`;
      sfx(ok ? 'ok' : 'bad');
      if (ok) { S.course[lang] = [...new Set([...(S.course[lang] || []), step])]; addXP(20, e); confetti(); }
    };
  });
})();
