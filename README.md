# GuessWho

A party game for playing in person with one shared phone or tablet. Pass the device around, everyone secretly reads their card, then you talk it out and try to catch the odd one out — or, in some modes, guess who wrote what or race the clock as a team.

**Live:** hosted on [Vercel](https://vercel.com), connected to this repo — deploys automatically on push to `main`.

> This README doubles as project context for AI-assisted development (Claude, etc.). It describes what's actually implemented today, not just the intended design — sections that are more "idea" than "shipped" are marked as such.

---

## Concept

GuessWho is a single-device, pass-and-play social deduction game. There's no backend and no accounts — one person sets up players and settings on the home screen, then the device is physically handed to each player in turn so they can privately view their card. After everyone has seen their card, the group plays face-to-face (discussion, voting, guessing, describing) and the app just tracks state and reveals results.

Four modes currently exist:

| Mode | Route | Core idea |
|---|---|---|
| Imposter Word | `/room` | Everyone gets the same secret word except the imposter(s), who get a different (but related) word. Describe your word without saying it; find who doesn't fit. |
| Answer the Question | `/qroom` | Everyone gets the same question except the imposter, who gets a different (but related) question from the same set. Everyone answers out loud; find whose answer doesn't fit. |
| Who Answered? | `/waroom` | No imposter. Everyone privately answers the same question, one random answer is read aloud anonymously, and everyone guesses who wrote it. Scored over multiple rounds. |
| Describe & Guess | `/teamroom` | Teams of 2 race the clock: one player describes a word without saying it, their team guesses. Each team vetoes one of 4 random categories before their own turn. Scored over multiple rounds. |

---

## Game modes in detail

### 1. Imposter Word (`src/pages/Room.jsx`)

- A random "word family" is picked from `src/data/words.js` (English) or `wordsEs.js` (Spanish) — each family is a category (e.g. Animals, Food) containing a pool of closely related words.
- All regular players are secretly assigned the **main word**; the imposter(s) are secretly assigned a different **imposter word** from the same family.
- Players pass the device around, tap to flip their card, and privately read their word.
- Once everyone has seen their card, the group enters **discussion**: players take turns describing their word out loud without saying it, trying to figure out who has a different word — while imposters try to blend in using context clues from others.
- The group can start a vote at any time and eliminate a player.
- The round ends when either all imposters are eliminated (**players win**) or the number of remaining non-imposters drops to ≤ the number of remaining imposters (**imposters win**).
- Supports **multiple imposters** (up to `floor(playerCount / 2)`), with an option to **randomize** the imposter count each game.

### 2. Answer the Question (`src/pages/QuestionRoom.jsx`)

- A random question set is picked from `src/data/questions.js` / `questionsEs.js`. Each set contains a pair of related questions.
- All regular players get the **main question**; a single imposter gets the **alternate question** from the same pair.
- Instead of just reading a word, each player privately types a short **text answer** to their question before passing the device on.
- Once everyone has answered, the group discusses each other's answers out loud and tries to spot whose answer doesn't fit the main question — while the imposter improvises to sound consistent.
- Voting/elimination works the same as Imposter Word. Currently supports exactly **one imposter** (no multi-imposter support in this mode yet).

### 3. Who Answered? (`src/pages/WhoAnsweredRoom.jsx`)

- No imposter at all — this is a "who said it" guessing game, played over a configurable number of **rounds** (3–10, set at game creation).
- Each round: a random question is pulled from `src/data/whoAnswered.js` / `whoAnsweredEs.js` (never repeating until the pool is exhausted, then it reshuffles), every player privately types an answer, and then **one random player's answer** is shown anonymously to the group.
- Every other player votes on who they think wrote it (self-voting is blocked).
- **Scoring:**
  - Anyone who correctly guesses the true author gets **+1 point**.
  - If *no one* guesses correctly, the author gets **+1 point** for fooling the whole group.
- After the configured number of rounds, final standings are shown and the highest score wins.

### 4. Describe & Guess (`src/pages/TeamRoom.jsx`)

- Players are grouped into **teams of 2** at setup. An odd player count is handled via a choice made at config time: either one team of 3, or one player is placed on two different teams (they get turns with both partners). An even player count is still recommended.
- Each round is a series of turns, one per team. **Right before its own turn**, a team gets a personal category veto: 4 random categories from `src/data/words.js` / `wordsEs.js` are shown by name only, they remove one, and the words from the remaining 3 become that turn's pool. Two teams in the same round can end up drawing from different category sets.
- The describer (rotates within the team each time it's their turn) describes words from the pool without saying them; their teammate(s) guess out loud.
- A **wall-clock countdown timer** (30–120s, configurable) runs for the whole turn. **Correct** retires the word for the rest of that turn and immediately loads the next one (no dead air); **Skip** puts the word back into the pool at a random position so it can resurface later. If the pool is ever fully exhausted mid-turn, it recycles (including previously-correct words) rather than stalling.
- After a configured number of rounds (3–10), the team with the highest total score wins.

---

## Room configuration (Home screen)

The home screen (`src/pages/Home.jsx`) walks through: **Play → Select Mode → Configure Room → Start**. Configuration is mode-dependent:

- **Players** — free-text names, minimum 3 required to start, duplicates blocked.
- **Language** — English or Spanish, controls which data file each mode reads its content from (UI text itself stays English).
- **Imposter count** (Imposter Word & Answer the Question only) — slider from 1 to `floor(playerCount / 2)`.
  - **Randomize imposters** — picks a random count within that range each game; optionally reveal the count (but not who) to players via **Show number of imposters**.
  - **Reveal elimination** — after a vote, show whether the eliminated player actually was an imposter (on by default).
  - **Reveal imposter status** — tell imposters they're the imposter on their own card (and who their fellow imposters are, if more than one).
- **Rounds** (Who Answered? and Describe & Guess) — slider from 3 to 10 rounds.
- **Timer** (Describe & Guess only) — slider from 30 to 120 seconds per turn.
- **Teams** (Describe & Guess only) — auto-generated pairing with a "Shuffle Teams" button to reroll, plus the odd-player-count strategy choice when applicable.
- **Special roles** — see below (Imposter Word & Answer the Question only).

Navigating "Change Mode" or "Back to Configuration" from inside a game round-trips through `/` with `location.state.returnToConfig`, which restores the full config the player had (players, mode, all toggles) rather than starting from scratch.

---

## Session persistence

Every room (`Room.jsx`, `QuestionRoom.jsx`, `WhoAnsweredRoom.jsx`, `TeamRoom.jsx`) saves its full in-progress state to `sessionStorage` via `src/utils/roomSession.js`, keyed per route with a `gameId` minted fresh each time a game starts from Home. A refresh or browser back/forward resumes the exact same game instead of silently starting a new random one; an intentional exit ("Go Home" / "Back to Configuration") clears the saved session so an abandoned game can't resurface later. `sessionStorage` (not `localStorage`) is deliberate — it survives a reload but clears when the tab closes, matching this being a single pass-and-play session rather than something that should persist indefinitely on a shared device.

---

## Special roles — ⚠️ design exists, gameplay mechanics are not wired up yet

`src/data/roles.js` defines four optional special roles that can be toggled on per-room (available in Imposter Word and Answer the Question modes only; only Seraphis & Spectra are offered in Answer the Question). **Today, roles are assigned, shown on the player's card, and announced when triggered — but none of them actually change game logic or expose an in-game action.** They're currently flavor/bookkeeping only. This is the biggest open gap between "designed" and "built," and is intentionally paused for now.

| Role | Ability | Intended behavior | Can an imposter get it? | Revealed |
|---|---|---|---|---|
| **Seraphis** | *The Final Verdict* | On elimination, immediately eliminate another player of your choice, no vote needed. | No | On death |
| **Spectra** | *The Eternal Echo* | Keep speaking and voting even after being eliminated. | No | On death |
| **Censor** | *Censorship* | Nullify a word/clue given by another player about their secret word. 2 uses/game. | Yes | On use |
| **Inquisitor** | *Question* | Force any player to answer a question at any moment. 2 uses/game. | Yes | On use |

What exists today:
- Role assignment logic (random, respecting `canBeImposter`, avoiding duplicate roles) in `Room.jsx` / `QuestionRoom.jsx`.
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
- **Vitest** — currently covers `src/utils/random.js`'s shuffle/sampling helpers with statistical (chi-square) uniformity tests
- **Vercel** for hosting — deploys automatically on push; `vercel.json` sets the build output dir (`build/`) and rewrites all paths to `index.html` so client-side routes survive a refresh or direct link.
- No backend, no accounts — see **Session persistence** above for what *is* persisted (sessionStorage, per-device, per-tab-session).

## Project structure

```
src/
  main.jsx                 Router setup (/, /room, /qroom, /waroom, /teamroom)
  index.css                Global styles
  pages/
    Home.jsx / home.css    Landing, mode select, room config, roles info modal
    Room.jsx                Imposter Word mode
    QuestionRoom.jsx        Answer the Question mode
    WhoAnsweredRoom.jsx     Who Answered? mode
    TeamRoom.jsx            Describe & Guess mode
    rooms.css                Shared styles for all four in-game rooms
  data/
    words.js / wordsEs.js               Word categories for Imposter Word & Describe & Guess
    questions.js / questionsEs.js       Question pairs for Answer the Question mode
    whoAnswered.js / whoAnsweredEs.js   Question bank for Who Answered? mode
    roles.js                             Special role definitions
  constants/
    gameModes.js             GAME_MODES enum shared by Home and every room
    languages.js             LANGUAGES enum (content language, independent of UI language)
  utils/
    random.js                 Unbiased shuffle/sample/pick helpers (Fisher-Yates) + game id generator
    roomSession.js             sessionStorage save/load/clear for mid-game persistence
    theme.js                   Pink/yellow theme persistence (localStorage)
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
npm run test       # vitest
```

Deployment is automatic: push to the connected branch and Vercel builds/deploys from `vercel.json`. No manual deploy step or build artifacts to commit.

---

## Roadmap / open ideas

- **The Oracle** — planned mode, not yet built. See `README-new-modes-draft.md` for the design.
- Special roles gameplay wiring (see above) — paused for now.

---

## License

No license file is currently present — treat as all-rights-reserved by default unless/until one is added.
