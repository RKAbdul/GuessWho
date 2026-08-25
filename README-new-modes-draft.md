## Planned modes — ⚠️ design only, not yet built

One additional mode is planned for the next update. It has no code yet — this section exists to lock down the concept and data shape before implementation starts, the same way the "Special roles" section in the main README tracks a designed-but-unwired feature.

(Describe & Guess, previously drafted here, has shipped — see the main README's "Game modes in detail" section for how it actually works.)

| Mode | Route (proposed) | Core idea |
|---|---|---|
| The Oracle | `/oracleroom` | Everyone works together to guess a secret word by asking yes/no questions to one player (the Oracle) — except one guesser is secretly a Saboteur trying to run out the clock. |

---

### 4. The Oracle (working title)

**Shape:** Cooperative-with-a-twist. Unlike every other mode, the group isn't trying to unmask a liar by talking around a word — they're trying to guess a specific secret word *together*, racing a limited number of questions/guesses. Hidden among them is one player working against the group.

- One player is secretly assigned the **Oracle** — they privately see the secret word and can only answer **yes** or **no** to questions asked by the group.
- One other player is secretly assigned the **Saboteur** — they also know the word, but their goal is to burn the group's limited questions/guesses on purpose without getting caught doing it.
- Everyone else just knows they're guessing — they don't know who the Oracle or Saboteur is going in (Oracle's identity is de facto revealed by the fact they're answering, but Saboteur is fully hidden).
- The group has a capped number of questions and a capped number of guesses. If they land the word in time → **guessers win**. If they run out → **Saboteur wins**, unless the group votes out the Saboteur first (standard vote/eliminate flow, reused from the other modes).

**What's reused from existing code:**
- Word content — the secret word can be pulled straight from the existing `words.js`/`wordsEs.js` "main word" field. No new content authoring needed for launch.
- Card-flip reveal, room shell, phase-transition scaffolding, vote/eliminate flow — all directly reusable from `Room.jsx`.

**What's new / needed:**
- A shared "questions remaining" / "guesses remaining" meter — new UI, no equivalent exists in any current mode.
- Oracle answer-input UI (yes/no/can't answer buttons) and a running question log visible to the group.
- Saboteur assignment + reveal-on-vote logic (structurally similar to imposter assignment, but only ever one Saboteur, and their win condition is time-based rather than elimination-count-based).

**Open questions before build:**
- Does the Oracle also get eliminated/voted on, or are they exempt from voting since they're not the antagonist?
- They Cant Vote
- Fixed question/guess cap, or scale with player count? 
- Confgiurable eveyrthing