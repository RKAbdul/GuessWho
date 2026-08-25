## Planned modes — ⚠️ design only, not yet built

Two additional modes are planned for the next update. Neither has any code yet — this section exists to lock down the concept and data shape before implementation starts, the same way the "Special roles" section above tracks a designed-but-unwired feature.

| Mode | Route (proposed) | Core idea |
|---|---|---|
| The Oracle | `/oracleroom` | Everyone works together to guess a secret word by asking yes/no questions to one player (the Oracle) — except one guesser is secretly a Saboteur trying to run out the clock. |
| Describe & Guess | `/teamroom` | Teams of 2. One player describes a word without saying it, their partner guesses, timer's running. Most points after N rounds wins. |

---

### 4. The Oracle (working title)

**Shape:** Cooperative-with-a-twist. Unlike every other mode, the group isn't trying to unmask a liar by talking around a word — they're trying to guess a specific secret word *together*, racing a limited number of questions/guesses. Hidden among them is one player working against the group.

- One player is secretly assigned the **Oracle** — they privately see the secret word and can only answer **yes** or **no** to questions asked by the group.
- One other player is secretly assigned the **Saboteur** — they also know the word, but their goal is to burn the group's limited questions/guesses on purpose without getting caught doing it.
- Everyone else just knows they're guessing — they don't know who the Oracle or Saboteur is going in (Oracle's identity is de facto revealed by the fact they're answering, but Saboteur is fully hidden).
- The group has a capped number of questions and a capped number of guesses. If they land the word in time → **guessers win**. If they run out → **Saboteur wins**, unless the group votes out the Saboteur first (standard vote/eliminate flow, reused from the other modes).

**What's reused from existing code:**
- Word content — the secret word can be pulled straight from the existing `wordsData.jsx` "main word" field. No new content authoring needed for launch.
- Card-flip reveal, room shell, phase-transition scaffolding, vote/eliminate flow — all directly reusable from `room.jsx`.

**What's new / needed:**
- A shared "questions remaining" / "guesses remaining" meter — new UI, no equivalent exists in any current mode.
- Oracle answer-input UI (yes/no/can't answer buttons) and a running question log visible to the group.
- Saboteur assignment + reveal-on-vote logic (structurally similar to imposter assignment, but only ever one Saboteur, and their win condition is time-based rather than elimination-count-based).

**Open questions before build:**
- Does the Oracle also get eliminated/voted on, or are they exempt from voting since they're not the antagonist?
- They Cant Vote
- Fixed question/guess cap, or scale with player count? 
- Confgiurable eveyrthing

---

### 5. Describe & Guess (working title)

**Shape:** Physical, fast, performative — the odd one out compared to every other mode, which is exactly the point. This is the Taboo / Catchphrase / Time's Up lineage: one player describes, a timer runs, correct guesses score, skips move on.

- Players are grouped into **teams of 2** at setup (config UI needs a new "form teams" step — doesn't exist in any current mode's home-screen flow).
- On a team's turn, the phone passes to that team's **describer** (role rotates within the team each time it's their turn, so both players get turns describing over the course of the game).
- Describer flips a card, sees a word, and describes it out loud to their teammate **without saying the word itself** — freeform description for v1 (no banned-word list; see below).
- Correct guess → +1 point, next word loads immediately. Skip → word is requeued or discarded (configurable).
- A running timer (60–90s, configurable) caps each team's turn. When it hits zero, turn passes to the next team.
- After a configured number of rounds (or once every player has described once), highest total score wins.

**What's reused from existing code:**
- Timer engine — same one being built for round/discussion timing elsewhere; this mode needs it as a core mechanic rather than an add-on, so it may make sense to prototype the timer here first.
- Scoring/rounds engine — structural∫ly identical to the "N rounds, tally, highest score wins" shape already built for Who Answered?.
- Card-flip reveal and room shell/animations — reused as-is.

**What's new / needed:**
- Team-formation step on the home screen (strict pairs vs. teams of 2+ needs deciding; also need a rule for odd player counts).
- New flat, single-word content file (e.g. `describeWordsData.jsx`) — unlike `wordsData.jsx`, these need to be individually describable words/phrases, ideally tagged by difficulty (easy/medium/hard).
- Describer-rotation tracking per team (an index per team, incremented each time that team's turn comes up).
- Correct/Skip controls during the timed round, with a pre-loaded "next word" queue so there's no dead air between words.

**Open questions before build:**
- Freeform description (v1 default) vs. Taboo-style banned-word lists (stretch goal — real authoring cost, needs 3–4 forbidden words hand-curated per entry).
- Freeform description
- Skip penalty or no penalty?
- No
- Round count: fixed number, or auto-calculated from "everyone describes once per game"?
- Configurable eveyrthing