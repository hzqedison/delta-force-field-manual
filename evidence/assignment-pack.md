# Delta Force Field Manual — Assignment Pack

Prepared for the six mandatory assignments in the AI product / overseas gaming keyword-site course.

Research snapshot date: 2026-08-26 (Asia/Shanghai; SteamDB numbers are UTC page values).

## Task 1 — Game keyword judgment

| Candidate | Trends signal | KD / competition | Long-tail opportunities | Homepage difficulty | Decision |
|---|---|---|---:|---|---|
| Delta Force | Stable high-interest signal; SteamDB showed 64,683 current players, 109,467 24-hour peak, 342,480 followers | Medium-high | 18 planned queries | High for the head term, workable for focused guides | **Do** |
| ARC Raiders | Strong active signal; SteamDB showed 12,188 current players, 30,494 24-hour peak, 452,873 followers | High | 16 planned queries | High; mature SERP and strong publisher/community footprint | Do not for this project |
| Marathon | Newer title with meaningful awareness but lower current Steam activity; 1,229 current players, 3,484 24-hour peak, 124,408 followers | Medium-high | 12 planned queries | Medium-high; needs current update coverage | Do not for this project |

Note: SteamDB is used as an observable demand/competition proxy. Google Trends was opened for a US / past-12-month comparison, but the chart did not finish rendering in the browser session, so no invented Trends index is recorded. The decision is based on the verifiable SteamDB signal plus the content fit and source availability.

**Why Delta Force:** it combines a large active audience, a clear split between extraction and large-scale warfare, enough official/platform material to build a source-led first site, and many focused player questions that are narrower than the head term.

**Reflection:** I learned that a game word is not judged by popularity alone. I need to combine demand signal, SERP difficulty, available first-party material, and the number of specific problems that can become useful pages. The biggest difficulty was separating a live activity signal from a true Google search trend, so I recorded the limitation instead of filling in a made-up number.

## Task 2 — Keyword list and page matrix

### Keyword list

| Type | Search query / intent |
|---|---|
| General | delta force guide |
| General | delta force beginner guide |
| General | delta force game modes |
| General | delta force operator roles |
| General | delta force extraction shooter |
| General | delta force system requirements |
| Specific | how to extract in delta force |
| Specific | delta force extraction tips for beginners |
| Specific | what should I carry in delta force extraction |
| Specific | delta force operations route planning |
| Specific | delta force warfare objective tips |
| Specific | delta force 64 player warfare roles |
| Specific | delta force best beginner loadout |
| Specific | delta force weapon customization guide |
| Specific | delta force PC requirements 88 GB |
| Specific | delta force minimum GPU requirements |
| Specific | delta force Steam setup |
| Specific | delta force official news and patch notes |

### Page matrix

| Page | Main keyword | User question solved | Page type | Status |
|---|---|---|---|---|
| `/` | delta force guide | Where should a new player start? | Homepage | Built |
| `/guides.html` | delta force beginner guide | Which focused guide matches my problem? | Navigation / hub | Built |
| `/guides/extraction-starter.html` | how to extract in delta force | What should I decide before and during an extraction run? | Beginner guide | Built |
| `/guides/modes-and-roles.html` | delta force game modes | How should I understand extraction vs warfare? | Orientation guide | Built |
| `/guides/pc-requirements.html` | delta force system requirements | Can my PC run the game and what should I check first? | Verified setup page | Built |
| `/sources.html` | delta force official news and patch notes | Where did the claims come from? | Source / trust page | Built |
| `/guides/loadouts.html` | delta force best beginner loadout | What should I prioritize when assembling a starter kit? | Planned guide | Planned |
| `/guides/weapon-customization.html` | delta force weapon customization guide | How should I think about weapon modifications? | Planned guide | Planned |
| `/guides/operations-routes.html` | delta force operations route planning | How do I plan a low-risk route? | Planned guide | Planned |

**Reflection:** The useful change was moving from “make a big game site” to “give each page one job.” General terms belong on the homepage or guide hub; specific questions deserve focused inner pages. That makes the first version smaller and gives future pages a clear reason to exist.

## Task 3 — Page material source log

| Page / topic | Source | What it can support | Reliability note |
|---|---|---|---|
| Homepage / product identity | https://www.playdeltaforce.com/zh-tw/ | Official product identity, download paths, official community/news navigation | First-party; language version shown in the browser |
| Homepage / app metadata | https://steamdb.info/app/2507950/charts/ | App ID 2507950, Team Jade, TiMi Studio Group, tags, player/follower snapshot | Platform data; time-sensitive numbers are dated |
| Extraction guide | https://store.steampowered.com/app/2507950/Delta_Force/ | Operator-based extraction framing, dynamic maps, loot, bosses, extraction routes | First-party store copy; check updates for changes |
| Modes & roles | https://store.steampowered.com/app/2507950/Delta_Force/ | Large-scale combined-arms / 64-player warfare framing, tactical tools, operators | First-party store copy |
| Modes & roles | https://www.playdeltaforce.com/zh-tw/news/ | Current announcements and patch verification path | First-party update hub; read current post before time-sensitive claims |
| PC requirements | https://store.steampowered.com/app/2507950/Delta_Force/ | Windows 10 64-bit, CPU/GPU/RAM, DirectX 12, 88 GB storage | Current Steam listing snapshot |

**Reflection:** The key lesson is that AI should receive source material before writing. I separated product facts from editorial advice and added a rule that time-sensitive details must point back to an active source.

## Task 4 — Local website evidence

- Project: `delta-force-guide`
- Local URL: `http://localhost:4173/`
- Required evidence: GitHub repository/code screenshot, homepage screenshot, guide hub screenshot, inner guide screenshot.
- SEO checks included in the source: each page has a unique title, meta description, one H1, and hierarchical H2 sections.

**Reflection:** The website is intentionally static and lightweight so it can be deployed without a database. The main challenge was keeping the site visually distinctive while keeping the information architecture obvious: Briefing → Playbook → focused guide → source log.

## Task 5 — Online deployment and data connection

This section is completed after the repository is created and the Vercel deployment URL is confirmed.

- Website URL: `TO BE FILLED AFTER DEPLOYMENT`
- GSC verification / sitemap: `TO BE FILLED FROM REAL ACCOUNT SCREENSHOT`
- GA connection: `TO BE FILLED FROM REAL ACCOUNT SCREENSHOT`

**Reflection draft:** The most useful part of this step is learning that “site online” and “site measurable” are separate checks. The deployment URL must load on desktop and mobile, while GSC and GA must be verified from the actual properties rather than inferred from a local build.

## Task 6 — Data review and next-page plan

This section is completed only with real GSC data. If the site has not accumulated useful data within the 21-day course window, the honest submission is a technical check plus scheduled day-7 and day-14 reviews.

- My site: `TO BE FILLED AFTER DEPLOYMENT`
- GSC total impressions: `0 / real value`
- GSC total clicks: `0 / real value`
- New search queries: `Only record if visible in the real GSC property`
- Next decision: `Technical check first; continue / change keyword / upgrade only after evidence`
- Reason: `No fabricated metrics; insufficient data is itself a finding`

### Planned supplemental pages

1. **Extraction route planning** — query: `delta force operations route planning`; answer the beginner’s route, threshold, and exit questions.
2. **Weapon customization** — query: `delta force weapon customization guide`; explain how to compare a modification by the problem it solves, using current official or verified in-game references.
3. **Beginner loadout checklist** — query: `delta force best beginner loadout`; publish only tested or clearly labeled community guidance, not unverified “best” claims.

**Reflection draft:** The biggest gain is learning to treat GSC as a decision tool rather than a success certificate. If there are no meaningful queries yet, the correct next action is technical validation and a dated review plan—not inventing traffic or forcing a change of topic.
