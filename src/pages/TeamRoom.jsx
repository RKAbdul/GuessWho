import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./rooms.css";
import words from "../data/words";
import wordsEs from "../data/wordsEs";
import { shuffle, sampleUnique, randomInt } from "../utils/random";
import { LANGUAGES } from "../constants/languages";
import { loadRoomSession, saveRoomSession, clearRoomSession } from "../utils/roomSession";

const ROUTE_KEY = "teamroom";

// Pulls the next word from `queue`. When the queue is empty, everything
// (including words already guessed correctly this turn) becomes available
// again, so a team's turn can never stall out.
function pullNext(queue, activeCategories) {
    if (queue.length > 0) {
        return { word: queue[0], rest: queue.slice(1) };
    }
    const allWords = [...new Set(activeCategories.flatMap(c => c.words))];
    const reshuffled = shuffle(allWords);
    return { word: reshuffled[0], rest: reshuffled.slice(1) };
}

export default function TeamRoom() {
    const location = useLocation();
    const navigate = useNavigate();

    // Loaded once on mount: a prior in-progress game for this route, if any.
    const [stored] = useState(() => loadRoomSession(ROUTE_KEY));
    const incomingGameId = location.state?.gameId;
    const isResume = !!stored && (
        (!!incomingGameId && stored.gameId === incomingGameId) ||
        !location.state?.players
    );
    const effectiveConfig = isResume ? stored.config : (location.state || {});
    const gameId = isResume ? stored.gameId : incomingGameId;

    const players = effectiveConfig.players || [];
    const mode = effectiveConfig.mode;
    const teams = effectiveConfig.teams || [];
    const timerDuration = effectiveConfig.timerDuration || 60;
    const totalRounds = effectiveConfig.totalRounds || 5;
    const language = effectiveConfig.language ?? LANGUAGES.SPANISH;
    const wordsData = language === LANGUAGES.ENGLISH ? words : wordsEs;

    // Game phase per team turn: 'veto' -> 'handoff' -> 'active' -> 'turnEnd'
    // -> next team's 'veto' (or 'roundEnd'/'gameOver' once the round wraps).
    // Every team gets its own personal veto immediately before its own turn.
    const [gamePhase, setGamePhase] = useState('veto');
    const [roundNumber, setRoundNumber] = useState(1);
    const [turnCategories, setTurnCategories] = useState([]); // 4 sampled for the current team's veto
    const [turnActiveCategories, setTurnActiveCategories] = useState([]); // the 3 survivors after that veto
    const [turnPool, setTurnPool] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [turnsTaken, setTurnsTaken] = useState([]); // per-team turn counters
    const [scores, setScores] = useState([]); // per-team score
    const [turnEndsAt, setTurnEndsAt] = useState(null); // absolute timestamp (ms)
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [turnCorrectCount, setTurnCorrectCount] = useState(0);

    useEffect(() => {
        if (players.length < 3 || teams.length === 0) {
            navigate('/');
            return;
        }

        if (isResume && stored?.state) {
            const s = stored.state;
            setGamePhase(s.gamePhase ?? 'veto');
            setRoundNumber(s.roundNumber || 1);
            setTurnCategories(s.turnCategories || []);
            setTurnActiveCategories(s.turnActiveCategories || []);
            setTurnPool(s.turnPool || []);
            setCurrentWord(s.currentWord ?? null);
            setCurrentTeamIndex(s.currentTeamIndex || 0);
            setTurnsTaken(s.turnsTaken || new Array(teams.length).fill(0));
            setScores(s.scores || new Array(teams.length).fill(0));
            setTurnEndsAt(s.turnEndsAt ?? null);
            setTimeLeft(s.timeLeft ?? timerDuration);
            setTurnCorrectCount(s.turnCorrectCount || 0);
        } else {
            initializeGame();
        }
    }, []);

    // Keep the in-progress game saved so a refresh or back/forward can
    // resume it instead of starting a new random game.
    useEffect(() => {
        if (!gameId || turnCategories.length === 0) return;
        saveRoomSession(ROUTE_KEY, gameId, {
            players, mode, teams, timerDuration, totalRounds, language
        }, {
            gamePhase, roundNumber, turnCategories, turnActiveCategories, turnPool, currentWord,
            currentTeamIndex, turnsTaken, scores, turnEndsAt, timeLeft, turnCorrectCount
        });
    }, [
        gamePhase, roundNumber, turnCategories, turnActiveCategories, turnPool, currentWord,
        currentTeamIndex, turnsTaken, scores, turnEndsAt, timeLeft, turnCorrectCount
    ]);

    // Wall-clock countdown: derives remaining time from an absolute
    // timestamp rather than a tick-counter, so it stays correct across a
    // refresh or the tab being backgrounded/throttled.
    useEffect(() => {
        if (gamePhase !== 'active' || !turnEndsAt) return;

        function tick() {
            const remainingMs = turnEndsAt - Date.now();
            if (remainingMs <= 0) {
                setTimeLeft(0);
                setGamePhase('turnEnd');
            } else {
                setTimeLeft(Math.ceil(remainingMs / 1000));
            }
        }

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [gamePhase, turnEndsAt]);

    function initializeGame() {
        setScores(new Array(teams.length).fill(0));
        setTurnsTaken(new Array(teams.length).fill(0));
        setCurrentTeamIndex(0);
        setRoundNumber(1);
        startTeamVeto();
    }

    // Samples a fresh set of 4 categories for whichever team is up next and
    // opens their personal veto — called at the start of every single turn,
    // not just once per round.
    function startTeamVeto() {
        setTurnCategories(sampleUnique(wordsData, 4));
        setTurnActiveCategories([]);
        setTurnPool([]);
        setCurrentWord(null);
        setGamePhase('veto');
    }

    function handleBanCategory(bannedId) {
        const remaining = turnCategories.filter(c => c.id !== bannedId);
        const allWords = [...new Set(remaining.flatMap(c => c.words))];
        const shuffled = shuffle(allWords);
        setTurnActiveCategories(remaining);
        setCurrentWord(shuffled[0]);
        setTurnPool(shuffled.slice(1));
        setGamePhase('handoff');
    }

    function handleStartTurn() {
        setTurnEndsAt(Date.now() + timerDuration * 1000);
        setTimeLeft(timerDuration);
        setTurnCorrectCount(0);
        setGamePhase('active');
    }

    function handleCorrect() {
        setScores(prev => {
            const next = [...prev];
            next[currentTeamIndex] += 1;
            return next;
        });
        setTurnCorrectCount(c => c + 1);
        const { word, rest } = pullNext(turnPool, turnActiveCategories);
        setCurrentWord(word);
        setTurnPool(rest);
    }

    function handleSkip() {
        const { word, rest } = pullNext(turnPool, turnActiveCategories);
        // Reinsert the skipped word at a random spot so it can resurface
        // later without immediately reappearing as the very next word.
        const insertAt = randomInt(0, rest.length);
        const updatedPool = [...rest.slice(0, insertAt), currentWord, ...rest.slice(insertAt)];
        setCurrentWord(word);
        setTurnPool(updatedPool);
    }

    function handleContinueFromTurnEnd() {
        const nextTurnsTaken = [...turnsTaken];
        nextTurnsTaken[currentTeamIndex] += 1;
        setTurnsTaken(nextTurnsTaken);

        const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
        if (nextTeamIndex === 0) {
            setGamePhase(roundNumber >= totalRounds ? 'gameOver' : 'roundEnd');
        } else {
            setCurrentTeamIndex(nextTeamIndex);
            startTeamVeto();
        }
    }

    function handleNextRound() {
        setRoundNumber(r => r + 1);
        setCurrentTeamIndex(0);
        startTeamVeto();
    }

    function handlePlayAgain() {
        initializeGame();
    }

    function handleGoHome() {
        clearRoomSession(ROUTE_KEY);
        navigate('/');
    }

    function handleBackToConfig() {
        clearRoomSession(ROUTE_KEY);
        navigate('/', {
            state: {
                returnToConfig: true,
                mode: mode,
                players: players,
                teams: teams,
                timerDuration: timerDuration,
                totalRounds: totalRounds,
                language: language
            }
        });
    }

    const currentTeam = teams[currentTeamIndex] || [];
    const describerIndex = currentTeam.length > 0 ? (turnsTaken[currentTeamIndex] || 0) % currentTeam.length : 0;
    const describer = currentTeam[describerIndex];

    const sortedTeamIndices = scores
        .map((score, index) => ({ score, index }))
        .sort((a, b) => b.score - a.score);

    return (
        <div className="room-container">
            <div className="room-header">
                <h1 className="room-title">Describe & Guess</h1>
                <button className="home-icon-button" onClick={handleGoHome} title="Go Home">
                    ⌂
                </button>
            </div>

            {/* Category veto — personal to the team about to play */}
            {gamePhase === 'veto' && (
                <div className="reveal-phase">
                    <div className="progress-indicator">
                        Round {roundNumber} of {totalRounds}
                    </div>
                    <div className="category-badge">
                        Team {currentTeamIndex + 1}: {currentTeam.join(' & ')}
                    </div>
                    <div className="main-question">
                        Pick one category to <strong>remove</strong> before your turn
                    </div>
                    <div className="voting-grid">
                        {turnCategories.map((category) => (
                            <button
                                key={category.id}
                                className="vote-button"
                                onClick={() => handleBanCategory(category.id)}
                            >
                                {category.family}
                            </button>
                        ))}
                    </div>
                    <button className="text-link" onClick={handleBackToConfig}>
                        Change Mode
                    </button>
                </div>
            )}

            {/* Handoff */}
            {gamePhase === 'handoff' && (
                <div className="reveal-phase">
                    <div className="progress-indicator">
                        Round {roundNumber} of {totalRounds}
                    </div>
                    <div className="main-question">
                        Categories: <strong>{turnActiveCategories.map(c => c.family).join(', ')}</strong>
                    </div>
                    <div className="category-badge">
                        Team {currentTeamIndex + 1}: {currentTeam.join(' & ')}
                    </div>
                    <div className="main-question">
                        Pass the device to <strong>{describer}</strong> — get ready to describe!
                    </div>
                    <button className="action-button primary" onClick={handleStartTurn}>
                        Start Turn
                    </button>
                </div>
            )}

            {/* Active turn */}
            {gamePhase === 'active' && (
                <div className="reveal-phase">
                    <div className="timer-display">{timeLeft}s</div>
                    <div className="category-badge">
                        Team {currentTeamIndex + 1} — {turnCorrectCount} guessed this turn
                    </div>
                    <div className="word-display-card">
                        <div className="card-content">
                            <p className="card-label">Describe this word</p>
                            <h2 className="word-reveal">{currentWord}</h2>
                        </div>
                    </div>
                    <div className="game-actions">
                        <button className="action-button secondary" onClick={handleSkip}>
                            Skip
                        </button>
                        <button className="action-button primary" onClick={handleCorrect}>
                            Correct
                        </button>
                    </div>
                </div>
            )}

            {/* End of turn */}
            {gamePhase === 'turnEnd' && (
                <div className="reveal-phase">
                    <div className="main-question">
                        Time's up! <strong>Team {currentTeamIndex + 1}</strong> guessed <strong>{turnCorrectCount}</strong> word{turnCorrectCount === 1 ? '' : 's'} this turn.
                    </div>
                    <button className="action-button primary" onClick={handleContinueFromTurnEnd}>
                        Continue
                    </button>
                </div>
            )}

            {/* Round end */}
            {gamePhase === 'roundEnd' && (
                <div className="reveal-phase">
                    <div className="results-container">
                        <h2>Round {roundNumber} Results</h2>
                        <div className="scores-section">
                            <h3>Current Scores:</h3>
                            <div className="scores-grid">
                                {sortedTeamIndices.map(({ score, index }, rank) => (
                                    <motion.div
                                        key={index}
                                        className="score-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: rank * 0.05 }}
                                    >
                                        <span className="rank">#{rank + 1}</span>
                                        <span className="player-name">Team {index + 1}: {teams[index].join(' & ')}</span>
                                        <span className="score">{score} pts</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <button className="next-button" onClick={handleNextRound}>
                            {roundNumber < totalRounds ? 'Next Round' : 'View Final Results'}
                        </button>
                    </div>
                </div>
            )}

            {/* Game over */}
            {gamePhase === 'gameOver' && (
                <div className="reveal-phase">
                    <div className="game-over-container">
                        <h2>Game Over!</h2>
                        <div className="winner-section">
                            <h3>🏆 Winner 🏆</h3>
                            <p className="winner-name">Team {sortedTeamIndices[0].index + 1}: {teams[sortedTeamIndices[0].index].join(' & ')}</p>
                            <p className="winner-score">{sortedTeamIndices[0].score} points</p>
                        </div>
                        <div className="final-standings">
                            <h3>Final Standings:</h3>
                            {sortedTeamIndices.map(({ score, index }, rank) => (
                                <div key={index} className="standing-item">
                                    <span className="standing-rank">#{rank + 1}</span>
                                    <span className="standing-name">Team {index + 1}: {teams[index].join(' & ')}</span>
                                    <span className="standing-score">{score} pts</span>
                                </div>
                            ))}
                        </div>
                        <div className="game-over-actions">
                            <button className="play-again-button" onClick={handlePlayAgain}>
                                Play Again
                            </button>
                            <button className="back-button" onClick={handleBackToConfig}>
                                Back to Configuration
                            </button>
                            <button className="text-link" onClick={handleGoHome}>
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
