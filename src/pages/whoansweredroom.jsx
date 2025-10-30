import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./room.css";
import whoAnsweredData from "../assets/whoAnsweredData";

export default function WhoAnsweredRoom() {
    const location = useLocation();
    const navigate = useNavigate();
    const players = location.state?.players || [];
    const mode = location.state?.mode;
    const totalRounds = location.state?.totalRounds || 5;

    const [currentQuestion, setCurrentQuestion] = useState("");
    const [answers, setAnswers] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    // Game phase: 0 = Answering Phase, 1 = Guessing Phase, 2 = Results, 3 = Game Over
    const [gamePhase, setGamePhase] = useState(0);
    const [selectedAnswerer, setSelectedAnswerer] = useState(null);
    const [displayedAnswer, setDisplayedAnswer] = useState("");
    const [revealedAnswerer, setRevealedAnswerer] = useState(null);
    const [votes, setVotes] = useState({});
    const [currentVoter, setCurrentVoter] = useState(0);
    const [votingComplete, setVotingComplete] = useState(false);
    const [scores, setScores] = useState({});
    const [roundNumber, setRoundNumber] = useState(1);
    const [_usedQuestions, setUsedQuestions] = useState([]);

    // Memoized sorted players for leaderboard
    const sortedPlayers = useMemo(() => {
        return Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([player]) => player);
    }, [scores]);

    const startNewRound = useCallback(() => {
        // Reset round state
        setAnswers({});
        setCurrentPlayer(0);
        setIsFlipped(false);
        setGamePhase(0);
        setVotes({});
        setCurrentVoter(0);
        setVotingComplete(false);
        setDisplayedAnswer("");
        setRevealedAnswerer(null);
        
        // Select random question that hasn't been used
        setUsedQuestions(prevUsed => {
            let availableQuestions = whoAnsweredData.filter(q => !prevUsed.includes(q));
            
            // If all questions used, reset the pool
            if (availableQuestions.length === 0) {
                availableQuestions = [...whoAnsweredData];
                const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
                setCurrentQuestion(randomQuestion);
                return [randomQuestion];
            }
            
            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            setCurrentQuestion(randomQuestion);
            return [...prevUsed, randomQuestion];
        });
        
        // Select random player whose answer will be shown
        const randomAnswerer = players[Math.floor(Math.random() * players.length)];
        setSelectedAnswerer(randomAnswerer);
    }, [players]);

    const initializeGame = useCallback(() => {
        // Initialize scores
        const initialScores = {};
        players.forEach(player => {
            initialScores[player] = 0;
        });
        setScores(initialScores);

        startNewRound();
    }, [players, startNewRound]);

    useEffect(() => {
        if (players.length < 3) {
            navigate('/');
            return;
        }

        initializeGame();
    }, [players.length, navigate, initializeGame]);

    const handleAnswerSubmit = useCallback((event) => {
        event.preventDefault();
        const answerValue = event.target.answer.value;
        
        setAnswers(prev => {
            const newAnswers = { ...prev, [players[currentPlayer]]: answerValue };
            
            if (currentPlayer >= players.length - 1) {
                // All players have answered, move to guessing phase
                setGamePhase(1);
                // Get the selected answerer's response from the updated answers
                setDisplayedAnswer(newAnswers[selectedAnswerer] || "No answer provided");
            }
            
            return newAnswers;
        });
        
        if (currentPlayer < players.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentPlayer(currentPlayer + 1), 500);
        }

        event.target.reset();
    }, [currentPlayer, players, selectedAnswerer]);

    const calculateScores = useCallback((finalVotes) => {
        setScores(prevScores => {
            const newScores = { ...prevScores };
            
            // Count how many people voted for the selectedAnswerer
            const votesForAnswerer = Object.values(finalVotes).filter(guess => guess === selectedAnswerer).length;
        
        /* SCORING LOGIC:
         * Example with 4 players (Alice, Bob, Charlie, Dave):
         * - Alice's answer is displayed
         * 
         * Scenario 1: Someone guesses correctly
         *   - Bob votes for Alice ✓ (correct) → Bob gets +1
         *   - Charlie votes for Alice ✓ (correct) → Charlie gets +1
         *   - Dave votes for Bob ✗ (wrong) → Dave gets 0
         *   - Alice votes for Charlie (can't vote for herself)
         *   Result: Bob +1, Charlie +1, Alice 0, Dave 0
         * 
         * Scenario 2: No one guesses correctly (Alice fools everyone)
         *   - Bob votes for Charlie ✗
         *   - Charlie votes for Bob ✗
         *   - Dave votes for Bob ✗
         *   - Alice votes for Bob (can't vote for herself)
         *   Result: Alice +1 (fooled everyone!), others 0
         */
        
        console.log('=== SCORING ROUND ===');
        console.log('Selected Answerer:', selectedAnswerer);
        console.log('All votes:', finalVotes);
        console.log('Votes for answerer:', votesForAnswerer);
        
        // RULE 1: If NO ONE voted for the answerer, they get a point for fooling everyone
        if (votesForAnswerer === 0) {
            newScores[selectedAnswerer] = (newScores[selectedAnswerer] || 0) + 1;
            console.log(`${selectedAnswerer} fooled everyone! +1 point`);
        }
        
        // RULE 2: Players who guessed correctly get 1 point each
        Object.entries(finalVotes).forEach(([voter, guess]) => {
            if (guess === selectedAnswerer) {
                newScores[voter] = (newScores[voter] || 0) + 1;
                console.log(`${voter} guessed correctly! +1 point`);
            }
        });

        console.log('Updated scores:', newScores);

            setGamePhase(2);
            setRevealedAnswerer(selectedAnswerer);
            
            return newScores;
        });
    }, [selectedAnswerer]);

    const handleVote = useCallback((votedPlayer) => {
        const voter = players[currentVoter];
        
        // Prevent self-voting
        if (voter === votedPlayer) {
            return;
        }
        
        setVotes(prev => {
            const updatedVotes = { ...prev, [voter]: votedPlayer };
            
            if (currentVoter >= players.length - 1) {
                setVotingComplete(true);
                calculateScores(updatedVotes);
            } else {
                setCurrentVoter(currentVoter + 1);
            }
            
            return updatedVotes;
        });
    }, [currentVoter, players, calculateScores]);

    const handleNextRound = useCallback(() => {
        if (roundNumber < totalRounds) {
            setRoundNumber(roundNumber + 1);
            startNewRound();
        } else {
            setGamePhase(3);
        }
    }, [roundNumber, totalRounds, startNewRound]);

    const handlePlayAgain = useCallback(() => {
        setRoundNumber(1);
        setUsedQuestions([]);
        initializeGame();
    }, [initializeGame]);

    const handleGoHome = useCallback(() => {
        navigate('/', {
            state: {
                returnToConfig: true,
                mode: mode,
                players: players,
                totalRounds: totalRounds
            }
        });
    }, [navigate, mode, players, totalRounds]);

    return (
        <div className="room-container">
            {/* Header */}
            <div className="room-header">
                <h1 className="room-title">Who Answered?</h1>
                <button className="home-icon-button" onClick={handleGoHome} title="Go Home">
                    ⌂
                </button>
            </div>

            {/* Phase 0: Answering Phase */}
            {gamePhase === 0 && (
                <div className="reveal-phase">
                    <div className="progress-indicator">
                        Round {roundNumber} of {totalRounds} - Player {currentPlayer + 1} of {players.length}
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
                                        <h2 className="word-reveal">{currentQuestion}</h2>
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
                                {currentPlayer < players.length - 1 ? 'Submit & Next →' : 'Submit & Start Voting'}
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* Phase 1: Guessing Phase */}
            {gamePhase === 1 && !votingComplete && (
                <div className="reveal-phase">
                    <div className="progress-indicator">
                        Round {roundNumber} - Voting
                    </div>
                    <div className="category-badge">
                        {players[currentVoter]}'s turn to guess
                    </div>

                    <div className="answer-display">
                        <h3>Question:</h3>
                        <p className="question-text">{currentQuestion}</p>
                        <h3>Answer:</h3>
                        <p className="answer-text">"{displayedAnswer}"</p>
                    </div>

                    <div className="voting-grid">
                        {players.map((player) => {
                            const isCurrentVoter = player === players[currentVoter];
                            return (
                                <button
                                    key={player}
                                    className={`vote-button ${isCurrentVoter ? 'disabled' : ''}`}
                                    onClick={() => handleVote(player)}
                                    disabled={isCurrentVoter}
                                    title={isCurrentVoter ? "You can't vote for yourself" : `Vote for ${player}`}
                                >
                                    {player} {isCurrentVoter && '(You)'}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Phase 2: Results Phase */}
            {gamePhase === 2 && (
                <div className="reveal-phase">
                    <div className="results-container">
                        <h2>Round {roundNumber} Results</h2>
                        
                        <div className="reveal-section">
                            <h3>The answer was from:</h3>
                            <p className="revealed-name">{revealedAnswerer}</p>
                            {Object.values(votes).filter(guess => guess === selectedAnswerer).length === 0 ? (
                                <p className="fooled-everyone">🎭 Fooled everyone! +1 point</p>
                            ) : (
                                <p className="votes-count">
                                    {Object.values(votes).filter(guess => guess === selectedAnswerer).length} player(s) guessed correctly
                                </p>
                            )}
                        </div>

                        <div className="votes-breakdown">
                            <h3>Who Guessed What:</h3>
                            {Object.entries(votes).map(([voter, guess]) => (
                                <div key={voter} className={`vote-item ${guess === selectedAnswerer ? 'correct' : 'incorrect'}`}>
                                    <span>{voter}</span>
                                    <span>→</span>
                                    <span>{guess}</span>
                                    {guess === selectedAnswerer && <span className="correct-badge">✓</span>}
                                </div>
                            ))}
                        </div>

                        <div className="scores-section">
                            <h3>Current Scores:</h3>
                            <div className="scores-grid">
                                {sortedPlayers.map((player, index) => (
                                    <div key={player} className="score-item">
                                        <span className="rank">#{index + 1}</span>
                                        <span className="player-name">{player}</span>
                                        <span className="score">{scores[player]} pts</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="next-button" onClick={handleNextRound}>
                            {roundNumber < totalRounds ? 'Next Round' : 'View Final Results'}
                        </button>
                    </div>
                </div>
            )}

            {/* Phase 3: Game Over */}
            {gamePhase === 3 && (
                <div className="reveal-phase">
                    <div className="game-over-container">
                        <h2>Game Over!</h2>
                        
                        <div className="winner-section">
                            <h3>🏆 Winner 🏆</h3>
                            <p className="winner-name">{sortedPlayers[0]}</p>
                            <p className="winner-score">{scores[sortedPlayers[0]]} points</p>
                        </div>

                        <div className="final-standings">
                            <h3>Final Standings:</h3>
                            {sortedPlayers.map((player, index) => (
                                <div key={player} className="standing-item">
                                    <span className="standing-rank">#{index + 1}</span>
                                    <span className="standing-name">{player}</span>
                                    <span className="standing-score">{scores[player]} pts</span>
                                </div>
                            ))}
                        </div>

                        <div className="game-over-actions">
                            <button className="play-again-button" onClick={handlePlayAgain}>
                                Play Again
                            </button>
                            <button className="back-button" onClick={handleGoHome}>
                                Back to Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
