import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./room.css";
import wordsData from "../assets/wordsData";
import rolesData from "../assets/rolesData";

export default function Room() {
    const location = useLocation();
    const navigate = useNavigate();
    const players = location.state?.players || [];
    const mode = location.state?.mode;
    const imposterCount = location.state?.imposterCount || 1;
    const revealElimination = location.state?.revealElimination ?? true;
    const showImposterCount = location.state?.showImposterCount ?? false;
    const randomizeImposters = location.state?.randomizeImposters ?? false;
    const revealImposterStatus = location.state?.revealImposterStatus ?? false;
    const enableSpecialRoles = location.state?.enableSpecialRoles ?? false;
    const selectedRoles = location.state?.selectedRoles || {
        seraphis: false,
        spectra: false,
        censor: false,
        inquisitor: false
    };

    const [shuffledPlayers, setShuffledPlayers] = useState([]);
    const [wordAssignments, setWordAssignments] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [wordFamily, setWordFamily] = useState("");

    // Game phase: 0 = Revealing words, 1 = In Game, 2 = Game Over
    const [gamePhase, setGamePhase] = useState(0);
    const [voting, setVoting] = useState(false);

    const [eliminatedPlayers, setEliminatedPlayers] = useState([]);
    const [imposterEliminated, setImposterEliminated] = useState(false);
    const [mainWord, setMainWord] = useState(null);
    const [imposterWord, setImposterWord] = useState(null);
    const [imposters, setImposters] = useState([]);
    
    // Special roles state
    const [playerRoles, setPlayerRoles] = useState({});
    const [revealedRoles, setRevealedRoles] = useState([]);

    useEffect(() => {
        if (players.length < 3) {
            navigate('/');
            return;
        }

        initializeGame();
    }, []);

    function initializeGame() {
        let shuffled = [...players].sort(() => Math.random() - 0.5);
        setShuffledPlayers(shuffled);

        const randomFamily = wordsData[Math.floor(Math.random() * wordsData.length)];
        setWordFamily(randomFamily.family);

        let wordChoices = [...randomFamily.words].sort(() => Math.random() - 0.5);
        setMainWord(wordChoices[0]);
        setImposterWord(wordChoices[1]);

        const assignedWords = {};
        shuffled.forEach((player) => (assignedWords[player] = wordChoices[0]));

        // Pick imposters based on imposterCount
        const imposterIndices = [];
        while (imposterIndices.length < imposterCount) {
            const randomIndex = Math.floor(Math.random() * shuffled.length);
            if (!imposterIndices.includes(randomIndex)) {
                imposterIndices.push(randomIndex);
            }
        }

        const selectedImposters = imposterIndices.map(i => shuffled[i]);
        setImposters(selectedImposters);
        
        selectedImposters.forEach(imposter => {
            assignedWords[imposter] = wordChoices[1];
        });

        setWordAssignments(assignedWords);

        // Assign special roles if enabled
        if (enableSpecialRoles && shuffled.length >= 4) {
            // Filter roles based on what was selected in configuration
            const enabledRoles = rolesData.filter(role => {
                if (role.id === 'seraphis') return selectedRoles.seraphis;
                if (role.id === 'spectra') return selectedRoles.spectra;
                if (role.id === 'censor') return selectedRoles.censor;
                if (role.id === 'inquisitor') return selectedRoles.inquisitor;
                return false;
            });

            if (enabledRoles.length > 0) {
                const roles = {};
                const regularPlayers = shuffled.filter(p => !selectedImposters.includes(p));
                
                // Randomly select players to get roles (up to number of enabled roles)
                const numRolesToAssign = Math.min(enabledRoles.length, Math.max(2, Math.floor(shuffled.length / 2)));
                const playersToAssignRoles = [...shuffled].sort(() => Math.random() - 0.5).slice(0, numRolesToAssign);
                
                playersToAssignRoles.forEach(player => {
                    const isImposter = selectedImposters.includes(player);
                    let eligibleRoles;
                    
                    if (isImposter) {
                        // Imposters can only get Censor or Inquisitor
                        eligibleRoles = enabledRoles.filter(r => 
                            r.canBeImposter && !Object.values(roles).some(assigned => assigned.id === r.id)
                        );
                    } else {
                        // Regular players can get any enabled role
                        eligibleRoles = enabledRoles.filter(r => 
                            !Object.values(roles).some(assigned => assigned.id === r.id)
                        );
                    }
                    
                    if (eligibleRoles.length > 0) {
                        const randomRole = eligibleRoles[Math.floor(Math.random() * eligibleRoles.length)];
                        roles[player] = randomRole;
                    }
                });
                
                setPlayerRoles(roles);
            } else {
                setPlayerRoles({});
            }
        } else {
            setPlayerRoles({});
        }
    }

    function handlePlayAgainClick() {
        setCurrentPlayer(0);
        setIsFlipped(false);
        setGamePhase(0);
        setVoting(false);
        setEliminatedPlayers([]);
        setImposterEliminated(false);
        initializeGame();
    }

    function handleNextClick() {
        if (currentPlayer < players.length - 1) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentPlayer((prevPlayer) => prevPlayer + 1);
            }, 300);
        } else {
            setGamePhase(1);
        }
    }

    function handlePreviousClick() {
        if (currentPlayer > 0) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentPlayer((prevPlayer) => prevPlayer - 1);
            }, 300);
        }
    }

    function handleGoHome() {
        navigate('/');
    }

    function handleChangeModeClick() {
        navigate('/', { 
            state: { 
                returnToConfig: true,
                mode: mode,
                players: players,
                imposterCount: imposterCount,
                randomizeImposters: randomizeImposters,
                revealElimination: revealElimination,
                showImposterCount: showImposterCount,
                revealImposterStatus: revealImposterStatus,
                enableSpecialRoles: enableSpecialRoles,
                enableSeraphis: selectedRoles.seraphis,
                enableSpectra: selectedRoles.spectra,
                enableCensor: selectedRoles.censor,
                enableInquisitor: selectedRoles.inquisitor
            } 
        });
    }

    function handleBackToConfig() {
        navigate('/', { 
            state: { 
                returnToConfig: true,
                mode: mode,
                players: players,
                imposterCount: imposterCount,
                randomizeImposters: randomizeImposters,
                revealElimination: revealElimination,
                showImposterCount: showImposterCount,
                revealImposterStatus: revealImposterStatus,
                enableSpecialRoles: enableSpecialRoles,
                enableSeraphis: selectedRoles.seraphis,
                enableSpectra: selectedRoles.spectra,
                enableCensor: selectedRoles.censor,
                enableInquisitor: selectedRoles.inquisitor
            } 
        });
    }

    function eliminatePlayer(player) {
        const isImposter = imposters.includes(player);
        
        const newEliminatedPlayers = [...eliminatedPlayers, player];
        const newShuffledPlayers = shuffledPlayers.filter(p => p !== player);
        
        setEliminatedPlayers(newEliminatedPlayers);
        setShuffledPlayers(newShuffledPlayers);

        // Check if eliminated player has a role that should be revealed on death
        const playerRole = playerRoles[player];
        if (playerRole && playerRole.revealOn === 'death') {
            // Add to revealed roles if not already there
            if (!revealedRoles.some(r => r.player === player)) {
                setRevealedRoles(prev => [...prev, { player, role: playerRole }]);
            }
        }

        // Check if all imposters are eliminated
        const remainingImposters = imposters.filter(imp => !newEliminatedPlayers.includes(imp));
        const remainingRegularPlayers = newShuffledPlayers.length - remainingImposters.length;
        
        if (remainingImposters.length === 0) {
            setImposterEliminated(true);
            setGamePhase(2);
        } else if (remainingRegularPlayers <= remainingImposters.length) {
            // Imposters win if remaining non-imposter players are equal to or less than imposters
            setImposterEliminated(false);
            setGamePhase(2);
        }
        
        setVoting(false);
    }
    

    return (
        <div className="room-container">
            {/* Header */}
            <div className="room-header">
                <h1 className="room-title">Imposter Word</h1>
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
                                        <p className="card-label">Your word</p>
                                        <h2 className="word-reveal">{wordAssignments[players[currentPlayer]]}</h2>
                                        
                                        {revealImposterStatus && imposters.includes(players[currentPlayer]) && (
                                            <div className="imposter-status-badge">
                                                <p className="imposter-status-label">You are an IMPOSTER</p>
                                                {imposters.length > 1 && (
                                                    <div className="fellow-imposters">
                                                        <p className="fellow-imposters-label">Fellow Imposters:</p>
                                                        <p className="fellow-imposters-list">
                                                            {imposters.filter(imp => imp !== players[currentPlayer]).join(', ')}
                                                        </p>
                                                    </div>
                                                )}
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

                    <div className="card-navigation">
                        <button 
                            className="nav-button secondary" 
                            onClick={handlePreviousClick}
                            disabled={currentPlayer === 0}
                        >
                            ← Previous
                        </button>
                        <button 
                            className="nav-button primary" 
                            onClick={handleNextClick}
                        >
                            {currentPlayer < players.length - 1 ? 'Next →' : 'Start Game'}
                        </button>
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
                            Discuss and find the {imposterCount > 1 ? `${imposterCount} imposters` : 'imposter'}!
                        </p>
                        {randomizeImposters && showImposterCount && (
                            <p className="imposter-count-badge">
                                {imposterCount} {imposterCount === 1 ? 'imposter' : 'imposters'} in this round
                            </p>
                        )}
                    </div>

                    <div className="players-list">
                        <h3 className="list-title">Turn Order</h3>
                        {shuffledPlayers.map((player, index) => (
                            <motion.div
                                key={player}
                                className={`player-list-item ${eliminatedPlayers.includes(player) ? 'eliminated' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <span className="player-number">{index + 1}.</span>
                                <span className="player-list-name">{player}</span>
                                {voting && !eliminatedPlayers.includes(player) && (
                                    <button 
                                        className="eliminate-btn"
                                        onClick={() => eliminatePlayer(player)}
                                    >
                                        Eliminate
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {eliminatedPlayers.length > 0 && revealElimination && (
                        <div className="eliminated-info">
                            {eliminatedPlayers.map((player, index) => {
                                const wasImposter = imposters.includes(player);
                                return (
                                    <p key={index} className={wasImposter ? 'was-imposter' : 'was-not-imposter'}>
                                        {player} was {wasImposter ? 'an IMPOSTER!' : 'NOT an imposter'}
                                    </p>
                                );
                            })}
                        </div>
                    )}

                    {eliminatedPlayers.length > 0 && !revealElimination && (
                        <div className="eliminated-list">
                            <p>Eliminated: {eliminatedPlayers.join(', ')}</p>
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
                                    {imposters.length > 1 ? 'The imposters were:' : 'The imposter was:'} 
                                    <strong> {imposters.join(', ')}</strong>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="result-verdict lose">Imposters Win!</p>
                                <p className="result-detail">
                                    {imposters.length > 1 ? 'The imposters were:' : 'The imposter was:'} 
                                    <strong> {imposters.join(', ')}</strong>
                                </p>
                            </>
                        )}

                        <div className="words-reveal">
                            <div className="word-item">
                                <span className="word-label">Main Word:</span>
                                <span className="word-value">{mainWord}</span>
                            </div>
                            <div className="word-item">
                                <span className="word-label">Imposter Word:</span>
                                <span className="word-value imposter">{imposterWord}</span>
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
