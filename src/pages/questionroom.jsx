import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./room.css";
import questionsData from "../assets/questionsData";
import rolesData from "../assets/rolesData";

export default function Room() {
    const location = useLocation();
    const navigate = useNavigate();
    const players = location.state.players;
    const mode = location.state.mode;
    
    // Special roles and imposter reveal states
    const enableSpecialRoles = location.state?.enableSpecialRoles || false;
    const selectedRoles = location.state?.selectedRoles || {};
    const revealImposterStatus = location.state?.revealImposterStatus || false;

    const [shuffledPlayers, setShuffledPlayers] = useState([]);
    const [questionsAssignment, setQuestionsAssignment] = useState({});
    const [answers, setAnswers] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [gamePhase, setGamePhase] = useState(0);
    const [voting, setVoting] = useState(false);
    const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
    const [imposterEliminated, setImposterEliminated] = useState(false);
    const [imposter, setImposter] = useState(null);

    const [questionData, setQuestionData] = useState([]);
    
    // Special roles states
    const [playerRoles, setPlayerRoles] = useState({});
    const [revealedRoles, setRevealedRoles] = useState([]);

    useEffect(() => {
        if (players.length < 3) return;
    
        initializeGame();
    }, [players]);

    function initializeGame() {
        let shuffled = [...players].sort(() => Math.random() - 0.5);
        setShuffledPlayers(shuffled);
    
        const randomQuestionSet = questionsData[Math.floor(Math.random() * questionsData.length)];
        let questionChoices = [...randomQuestionSet.questions].sort(() => Math.random() - 0.5);
    
        const assignedQuestions = {};
        let questionIndex = 0;
        setQuestionData(questionChoices[questionIndex]);
    
        shuffled.forEach((player) => {
            assignedQuestions[player] = questionChoices[questionIndex][0];
        });
    
        // Assign imposter a different question from the same set
        const imposterIndex = Math.floor(Math.random() * shuffled.length);
        const imposterPlayer = shuffled[imposterIndex];
        assignedQuestions[imposterPlayer] = questionChoices[questionIndex][1];
        setImposter(imposterPlayer);
    
        setQuestionsAssignment(assignedQuestions);

        // Initialize Special Roles (only Seraphis and Spectra for Questions mode)
        if (enableSpecialRoles) {
            // Filter to only Seraphis and Spectra
            const enabledRoles = rolesData.filter(role => 
                (role.id === 'seraphis' && selectedRoles.seraphis) ||
                (role.id === 'spectra' && selectedRoles.spectra)
            );

            if (enabledRoles.length > 0) {
                const numRolesToAssign = Math.min(enabledRoles.length, Math.max(2, Math.floor(shuffled.length / 2)));
                const shuffledRoles = [...enabledRoles].sort(() => Math.random() - 0.5);
                const assignedRoles = {};

                for (let i = 0; i < numRolesToAssign && i < shuffledRoles.length; i++) {
                    let randomPlayerIndex;
                    let randomPlayer;
                    let attempts = 0;
                    
                    do {
                        randomPlayerIndex = Math.floor(Math.random() * shuffled.length);
                        randomPlayer = shuffled[randomPlayerIndex];
                        attempts++;
                    } while (assignedRoles[randomPlayer] && attempts < 50);

                    if (!assignedRoles[randomPlayer]) {
                        assignedRoles[randomPlayer] = shuffledRoles[i];
                    }
                }

                setPlayerRoles(assignedRoles);
            }
        }
    }
    
    function handlePlayAgainClick() {
        setShuffledPlayers([]);
        setQuestionsAssignment({});
        setAnswers({});
        setCurrentPlayer(0);
        setIsFlipped(false);
        setGamePhase(0);
        setVoting(false);
        setEliminatedPlayers([]);
        setImposterEliminated(false);
        setQuestionData([]);
        setImposter(null);
        setPlayerRoles({});
        setRevealedRoles([]);

        initializeGame();
    }

    function handleAnswerSubmit(event) {
        event.preventDefault();
        setAnswers({ ...answers, [players[currentPlayer]]: event.target.answer.value });
        
        if (currentPlayer < players.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentPlayer(currentPlayer + 1), 500);
        } else {
            setGamePhase(1);
        }

        event.target.reset();
    }

    function eliminatePlayer(player) {
        const isImposter = player === imposter;
        const wasImposter = isImposter;
        
        setEliminatedPlayers([...eliminatedPlayers, { name: player, wasImposter }]);
        setImposterEliminated(isImposter);
        setVoting(false);
        
        // Check for role reveal on death
        const playerRole = playerRoles[player];
        if (playerRole && playerRole.revealOn === 'death') {
            setRevealedRoles([...revealedRoles, { player, role: playerRole }]);
        }
        
        // Get remaining active players
        const remainingPlayers = players.filter(p => 
            !eliminatedPlayers.some(e => e.name === p) && p !== player
        );
        
        // End game if imposter eliminated or too few players remain
        if (isImposter || remainingPlayers.length < 3) {
            setGamePhase(2);
        }
    }

    function handleGoHome() {
        navigate('/');
    }

    function handleChangeModeClick() {
        navigate('/', {
            state: {
                returnToConfig: true,
                players: players,
                mode: mode,
                enableSpecialRoles: enableSpecialRoles,
                selectedRoles: selectedRoles,
                revealImposterStatus: revealImposterStatus
            }
        });
    }

    function handleBackToConfig() {
        navigate('/', {
            state: {
                returnToConfig: true,
                players: players,
                mode: mode,
                enableSpecialRoles: enableSpecialRoles,
                selectedRoles: selectedRoles,
                revealImposterStatus: revealImposterStatus
            }
        });
    }

    function handlePreviousClick() {
        if (currentPlayer > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentPlayer(currentPlayer - 1), 400);
        }
    }

    function handleNextClick() {
        if (currentPlayer < players.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentPlayer(currentPlayer + 1), 400);
        } else {
            setGamePhase(1);
        }
    }

    return (
        <div className="room-container">
            {/* Header */}
            <div className="room-header">
                <h1 className="room-title">Questions Mode</h1>
                <button className="home-icon-button" onClick={handleGoHome} title="Go Home">
                    ⌂
                </button>
            </div>

            {/* Phase 0: Card Reveal */}
            {gamePhase === 0 && (
                <div className="reveal-phase">
                    <div className="progress-indicator">
                        Player {currentPlayer + 1} of {players.length}
                    </div>

                    <div className="card-box">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPlayer}
                                className="card"
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <div className="card-front">
                                    <div className="card-content">
                                        <p className="card-label">Tap to reveal</p>
                                        <h2 className="player-name">{players[currentPlayer]}</h2>
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="card-content">
                                        <p className="card-label">Your Question</p>
                                        <h2 className="word-reveal">{questionsAssignment[players[currentPlayer]]}</h2>
                                        
                                        {revealImposterStatus && imposter === players[currentPlayer] && (
                                            <div className="imposter-status-badge">
                                                <p className="imposter-status-label">You are an IMPOSTER</p>
                                            </div>
                                        )}
                                        
                                        {playerRoles[players[currentPlayer]] && (
                                            <div className="role-badge">
                                                <p className="role-badge-label">Special Role</p>
                                                <p className="role-badge-name">{playerRoles[players[currentPlayer]].name}</p>
                                                <p className="role-badge-ability">{playerRoles[players[currentPlayer]].ability}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {isFlipped && answers[players[currentPlayer]] && (
                        <div className="submitted-answer-display">
                            <p className="answer-submitted-label">✓ Answer submitted</p>
                        </div>
                    )}

                    {isFlipped && !answers[players[currentPlayer]] && (
                        <form onSubmit={handleAnswerSubmit} className="answer-form">
                            <input 
                                type="text" 
                                name="answer" 
                                className="answer-input"
                                placeholder="Type your answer..." 
                                required 
                                autoFocus
                            />
                            <button type="submit" className="submit-answer-btn">
                                {currentPlayer < players.length - 1 ? 'Submit & Next →' : 'Submit & Start Game'}
                            </button>
                        </form>
                    )}

                    <div className="card-navigation">
                        <button 
                            className="nav-button secondary" 
                            onClick={handlePreviousClick}
                            disabled={currentPlayer === 0}
                        >
                            ← Previous
                        </button>
                        {answers[players[currentPlayer]] && (
                            <button 
                                className="nav-button primary" 
                                onClick={handleNextClick}
                            >
                                {currentPlayer < players.length - 1 ? 'Next →' : 'Start Game'}
                            </button>
                        )}
                    </div>

                    <button className="text-link" onClick={handleChangeModeClick}>
                        Change Mode
                    </button>
                </div>
            )}

            {/* Phase 1: In Game */}
            {gamePhase === 1 && (
                <div className="game-phase">
                    <div className="game-info">
                        <p className="info-text">
                            Discuss and find the imposter!
                        </p>
                        <p className="main-question">
                            Main Question: <strong>{questionData[0]}</strong>
                        </p>
                    </div>

                    <div className="players-list">
                        <h3 className="list-title">Players & Answers</h3>
                        {players.map((player, index) => {
                            const isEliminated = eliminatedPlayers.some(e => e.name === player);
                            return (
                                <motion.div
                                    key={player}
                                    className={`player-list-item ${isEliminated ? 'eliminated' : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="player-list-main">
                                        <span className="player-number">{index + 1}.</span>
                                        <div className="player-list-info">
                                            <span className="player-list-name">{player}</span>
                                            <span className="player-answer">"{answers[player]}"</span>
                                        </div>
                                    </div>
                                    {voting && !isEliminated && (
                                        <button 
                                            className="eliminate-btn"
                                            onClick={() => eliminatePlayer(player)}
                                        >
                                            Eliminate
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {eliminatedPlayers.length > 0 && (
                        <div className="eliminated-info">
                            {eliminatedPlayers.map((eliminated, index) => (
                                <p key={index} className={eliminated.wasImposter ? 'was-imposter' : 'was-not-imposter'}>
                                    {eliminated.name} was {eliminated.wasImposter ? 'the IMPOSTER!' : 'NOT the imposter'}
                                </p>
                            ))}
                        </div>
                    )}

                    {revealedRoles.length > 0 && (
                        <div className="role-announcements">
                            <h4 className="announcements-title">Special Role Announcements</h4>
                            {revealedRoles.map((reveal, index) => (
                                <motion.div
                                    key={index}
                                    className="role-announcement"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="announcement-text">
                                        <strong>{reveal.player}</strong> had <strong>{reveal.role.name}</strong>!
                                    </p>
                                    <p className="announcement-ability">
                                        Ability: {reveal.role.ability}
                                    </p>
                                    {reveal.role.id === 'seraphis' && (
                                        <p className="announcement-action">
                                            {reveal.player} will use The Final Verdict to eliminate another player!
                                        </p>
                                    )}
                                    {reveal.role.id === 'spectra' && (
                                        <p className="announcement-action">
                                            {reveal.player} can continue voting even after elimination!
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="game-actions">
                        {!voting ? (
                            <button className="action-button primary" onClick={() => setVoting(true)}>
                                Start Voting
                            </button>
                        ) : (
                            <button className="action-button secondary" onClick={() => setVoting(false)}>
                                Cancel Vote
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Phase 2: Game Over */}
            {gamePhase === 2 && (
                <motion.div 
                    className="result-box"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="result-title">Game Over</h2>
                    
                    <div className="result-content">
                        {imposterEliminated ? (
                            <>
                                <p className="result-verdict win">Players Win!</p>
                                <p className="result-detail">
                                    The imposter was: <strong>{imposter}</strong>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="result-verdict lose">Imposter Wins!</p>
                                <p className="result-detail">
                                    The imposter was: <strong>{imposter}</strong>
                                </p>
                            </>
                        )}

                        <div className="words-reveal">
                            <div className="word-item">
                                <span className="word-label">Main Question:</span>
                                <span className="word-value">{questionData[0]}</span>
                            </div>
                            <div className="word-item">
                                <span className="word-label">Imposter Question:</span>
                                <span className="word-value imposter">{questionData[1]}</span>
                            </div>
                        </div>

                        {enableSpecialRoles && Object.keys(playerRoles).length > 0 && (
                            <div className="roles-reveal">
                                <h3 className="roles-reveal-title">Special Roles</h3>
                                <div className="roles-list">
                                    {Object.entries(playerRoles).map(([player, role]) => (
                                        <div key={player} className="role-reveal-item">
                                            <span className="role-player-name">{player}</span>
                                            <span className="role-separator">→</span>
                                            <span className="role-name-reveal">{role.name}</span>
                                            <span className="role-ability-reveal">({role.ability})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="result-actions">
                        <button className="action-button primary" onClick={handlePlayAgainClick}>
                            Play Again
                        </button>
                        <button className="action-button secondary" onClick={handleBackToConfig}>
                            Back to Configuration
                        </button>
                        <button className="text-link" onClick={handleGoHome}>
                            Go Home
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
