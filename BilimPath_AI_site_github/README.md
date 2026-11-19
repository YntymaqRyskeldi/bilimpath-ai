# BilimPath AI 2.0

Жасанды интеллект негізінде оқушының жеке оқу траекториясын қалыптастыратын адаптивті платформа (5–9 сынып информатикасы).

## GitHub Pages-ке жариялау (5 минут)
1. github.com → **YntymaqRyskeldi** аккаунтына кіріңіз → **New repository** → атауы дәл: `bilimpath-ai` → **Public** → Create.
2. **Add file → Upload files** → осы архивтің ішіндегі барлық файл мен папканы (index.html, assets, .nojekyll, README.md) сүйреп тастаңыз → **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → **Save**.
4. 1–2 минуттан кейін сайт ашылады: https://yntymaqryskeldi.github.io/bilimpath-ai/ (баннердегі QR осы сілтемеге апарады).

## Құрылымы
- `index.html` — кіру нүктесі (құрастыруды қажет етпейді, тек статикалық файлдар)
- `assets/js/` — өзек (core), беттер, видео-қозғалтқыш, код зертханасы, 3D ойындар, чаттар, мазмұн (5–9 сынып)
- `assets/css/style.css` — дизайн жүйесі
- `assets/fonts/` — Montserrat, Inter (SIL OFL), DejaVu Sans Mono

## Сыртқы кітапханалар (тек интернет болғанда жүктеледі)
Pyodide (Python), sql.js (SQL), Wandbox API (C++). JavaScript және HTML/CSS интернетсіз жұмыс істейді.
