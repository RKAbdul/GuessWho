# GuessWho

A party game for playing in person with one shared phone or tablet. Pass the device around, everyone secretly reads their card, then you talk it out and try to catch the odd one out — or, in one mode, guess who wrote what.

**Live:** hosted on [Vercel](https://vercel.com) — connect this repo in the Vercel dashboard to get a URL (or point a custom domain at it).

> This README doubles as project context for AI-assisted development (Claude, etc.). It describes what's actually implemented today, not just the intended design — sections that are more "idea" than "shipped" are marked as such.

---

## Concept

GuessWho is a single-device, pass-and-play social deduction game. There's no backend, no accounts, and no network play — one person sets up players and settings on the home screen, then the device is physically handed to each player in turn so they can privately view their card. After everyone has seen their card, the group plays face-to-face (discussion, voting, guessing) and the app just tracks state and reveals results.

Three modes currently exist, all sharing the same "reveal card → play → resolve" shape but with different core mechanics:

| Mode | Route | Core idea |
|---|---|---|
| Imposter Word | `/room` | Everyone gets the same secret word except the imposter(s), who get a different (but related) word. Describe your word without saying it; find who doesn't fit. |
| Answer the Question | `/qroom` | Everyone gets the same question except the imposter, who gets a different (but related) question from the same set. Everyone answers out loud; find whose answer doesn't fit. |
| Who Answered? | `/waroom` | No imposter. Everyone privately answers the same question, one random answer is read aloud anonymously, and everyone guesses who wrote it. Scored over multiple rounds. |

---

## Game modes in detail

### 1. Imposter Word (`src/pages/room.jsx`)

- A random "word family" is picked from `src/assets/wordsData.jsx` (e.g. a pair/set of closely related words).
- All regular players are secretly assigned the **main word**; the imposter(s) are secretly assigned a different **imposter word** from the same family.
- Players pass the device around, tap to flip their card, and privately read their word.
- Once everyone has seen their card, the group enters **discussion**: players take turns describing their word out loud without saying it, trying to figure out who has a different word — while imposters try to blend in using context clues from others.
- The group can start a vote at any time and eliminate a player.
- The round ends when either all imposters are eliminated (**players win**) or the number of remaining non-imposters drops to ≤ the number of remaining imposters (**imposters win**).
- Supports **multiple imposters** (up to `floor(playerCount / 2)`), with an option to **randomize** the imposter count each game.

### 2. Answer the Question (`src/pages/questionroom.jsx`)

- A random question set is picked from `src/assets/questionsData.jsx`. Each set contains a pair of related questions.
- All regular players get the **main question**; a single imposter gets the **alternate question** from the same pair.
- Instead of just reading a word, each player privately types a short **text answer** to their question before passing the device on.
- Once everyone has answered, the group discusses each other's answers out loud and tries to spot whose answer doesn't fit the main question — while the imposter improvises to sound consistent.
- Voting/elimination works the same as Imposter Word. Currently supports exactly **one imposter** (no multi-imposter support in this mode yet).

### 3. Who Answered? (`src/pages/whoansweredroom.jsx`)

- No imposter at all — this is a "who said it" guessing game, played over a configurable number of **rounds** (3–10, set at game creation).
- Each round: a random question is pulled from `src/assets/whoAnsweredData.jsx` (never repeating until the pool is exhausted, then it reshuffles), every player privately types an answer, and then **one random player's answer** is shown anonymously to the group.
- Every other player votes on who they think wrote it (self-voting is blocked).
- **Scoring:**
  - Anyone who correctly guesses the true author gets **+1 point**.
  - If *no one* guesses correctly, the author gets **+1 point** for fooling the whole group.
- After the configured number of rounds, final standings are shown and the highest score wins.

---

## Room configuration (Home screen)

The home screen (`src/pages/home.jsx`) walks through: **Play → Select Mode → Configure Room → Start**. Configuration is mode-dependent:

- **Players** — free-text names, minimum 3 required to start, duplicates blocked.
- **Imposter count** (modes 0 & 1 only) — slider from 1 to `floor(playerCount / 2)`.
  - **Randomize imposters** — picks a random count within that range each game; optionally reveal the count (but not who) to players via **Show number of imposters**.
  - **Reveal elimination** — after a vote, show whether the eliminated player actually was an imposter (on by default).
  - **Reveal imposter status** — tell imposters they're the imposter on their own card (and who their fellow imposters are, if more than one).
- **Rounds** (Who Answered? only) — slider from 3 to 10 rounds.
- **Special roles** — see below.

Navigating "Change Mode" or "Back to Configuration" from inside a game round-trips through `/` with `location.state.returnToConfig`, which restores the full config the player had (players, mode, all toggles) rather than starting from scratch.

---

## Special roles — ⚠️ design exists, gameplay mechanics are not wired up yet

`src/assets/rolesData.jsx` defines four optional special roles that can be toggled on per-room (available in Imposter Word and Answer the Question modes; only Seraphis & Spectra are offered in Answer the Question). **Today, roles are assigned, shown on the player's card, and announced when triggered — but none of them actually change game logic or expose an in-game action.** They're currently flavor/bookkeeping only. This is the biggest open gap between "designed" and "built."

| Role | Ability | Intended behavior | Can an imposter get it? | Revealed |
|---|---|---|---|---|
| **Seraphis** | *The Final Verdict* | On elimination, immediately eliminate another player of your choice, no vote needed. | No | On death |
| **Spectra** | *The Eternal Echo* | Keep speaking and voting even after being eliminated. | No | On death |
| **Censor** | *Censorship* | Nullify a word/clue given by another player about their secret word. 2 uses/game. | Yes | On use |
| **Inquisitor** | *Question* | Force any player to answer a question at any moment. 2 uses/game. | Yes | On use |

What exists today:
- Role assignment logic (random, respecting `canBeImposter`, avoiding duplicate roles) in `room.jsx` / `questionroom.jsx`.
- Role shown privately on the player's own reveal card.
- A "role announcements" feed that fires when a role-holder is eliminated (`revealOn: 'death'` roles).
- A modal on the home screen explaining all four roles to players before the game.

What's missing (i.e. "ideas" not yet "features"):
- No UI action for Seraphis to actually pick and eliminate a second player after being voted out.
- No mechanism letting Spectra actually vote again once marked eliminated (the eliminated list currently just excludes them from voting UI like anyone else).
- No button/flow for Censor to nullify a clue, and no tracking of remaining uses.
- No button/flow for Inquisitor to force a question, and no tracking of remaining uses.
- `revealOn: 'use'` (Censor, Inquisitor) is defined in the data model but nothing currently triggers a "use" event.

If/when this gets built, the natural next step is turning the two "use"-triggered roles into explicit in-game buttons with a use counter, and giving Seraphis a follow-up elimination prompt immediately after their own elimination fires.

---

## Tech stack

- **React 18** + **Vite 6** (`@vitejs/plugin-react`)
- **React Router v7** (`BrowserRouter`, served from domain root — no `basename` needed)
- **Framer Motion** — card flip animations, list-item stagger-in, phase transitions
- **ESLint 9** (flat config) with `eslint-plugin-react-hooks` / `eslint-plugin-react-refresh`
- **Vercel** for hosting — deploys automatically on push once the repo is connected in the Vercel dashboard; `vercel.json` sets the build output dir (`build/`) and rewrites all paths to `index.html` so client-side routes (`/room`, `/qroom`, `/waroom`) survive a refresh or direct link.
- No backend, no state persistence beyond React Router's in-memory `location.state` — refreshing mid-game loses progress.

## Project structure

```
src/
  main.jsx                 Router setup (/, /room, /qroom, /waroom)
  index.css                Global styles
  pages/
    home.jsx / home.css    Landing, mode select, room config, roles info modal
    room.jsx               Imposter Word mode
    questionroom.jsx        Answer the Question mode
    whoansweredroom.jsx     Who Answered? mode
    room.css                Shared styles for all three in-game rooms
  assets/
    wordsData.jsx           Word families for Imposter Word mode
    questionsData.jsx       Question pairs for Answer the Question mode
    whoAnsweredData.jsx     Question bank for Who Answered? mode
    rolesData.jsx           Special role definitions
vercel.json                 Vercel build/output config + SPA rewrite rule
build/                       Vite build output (gitignored — Vercel builds from source)
```

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → build/
npm run preview   # preview a production build locally
npm run lint       # eslint
```

Deployment is automatic: push to the connected branch and Vercel builds/deploys from `vercel.json`. No manual deploy step or build artifacts to commit.

---

## Roadmap / open ideas

- Persist in-progress game state (e.g. `sessionStorage`) so an accidental refresh doesn't wipe a round.
- 

---

## License

No license file is currently present — treat as all-rights-reserved by default unless/until one is added.
