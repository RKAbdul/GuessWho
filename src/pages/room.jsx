import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "./room.css";
import { main } from "framer-motion/client";
import wordsData from "../assets/wordsData";

export default function Room() {
    const location = useLocation();
    const players = location.state.players;
    const mode = location.state.mode;

    const [shuffledPlayers, setShuffledPlayers] = useState([]);
    const [wordAssignments, setWordAssignments] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Game phase: 0 = Revealing words, 1 = In Game, 2 = Game Over
    const [gamePhase, setGamePhase] = useState(0);
    const [voting, setVoting] = useState(false);

    const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
    const [imposterEliminated, setImposterEliminated] = useState(false);
    const [mainWord, setMainWord] = useState(null);
    const [imposterWord, setImposterWord] = useState(null);

    useEffect(() => {
        if (players.length < 3) return;

        let shuffled = [...players].sort(() => Math.random() - 0.5);
        setShuffledPlayers(shuffled);

        const randomFamily = wordsData[Math.floor(Math.random() * wordsData.length)];

        let wordChoices = [...randomFamily.words].sort(() => Math.random() - 0.5);
        setMainWord(wordChoices[0]);
        setImposterWord(wordChoices[1]);

        const assignedWords = {};
        shuffled.forEach((player) => (assignedWords[player] = wordChoices[0]));

        // Pick one random "imposter" player
        const imposterIndex = Math.floor(Math.random() * shuffled.length);
        assignedWords[shuffled[imposterIndex]] = wordChoices[1];

        setWordAssignments(assignedWords);
    }, [players]);

    function handleNextClick() {
        if (currentPlayer < players.length - 1) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentPlayer((prevPlayer) => prevPlayer + 1);
            }, 500);
        } else {
            setGamePhase(1);
        }
    }

    function eliminatePlayer(player) {
        setEliminatedPlayer(player);

        const isImposter = wordAssignments[player] !== mainWord;
        setImposterEliminated(isImposter);

        // You could now handle game phase change or display feedback
        if (isImposter) {
            setGamePhase(2);
        }

        shuffledPlayers.splice(shuffledPlayers.indexOf(player), 1);
        setShuffledPlayers([...shuffledPlayers]);

        if (shuffledPlayers.length === 2) {
            setGamePhase(2);
        }
    }
    

    return (
        <div className="room-container">
            <h1 className="logo">Game Room</h1>

            {gamePhase === 0 && <div className="card-box">
                <motion.div
                    className="card"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setIsFlipped(!isFlipped)} // Flip the card when clicked
                >
                    <div className="card-front">
                        {players[currentPlayer]}
                    </div>
                    <div className="card-back">
                        {wordAssignments[players[currentPlayer]]}
                    </div>
                </motion.div>
            </div>}

            {gamePhase === 0 && <button className="next-button" onClick={handleNextClick}>
                Next Player
            </button>}

            { gamePhase === 1 && <div className="player-list-container">
                <h2>Player Turn Order</h2>
                {shuffledPlayers.map((player, index) => (
                    <div key={index} className="player-item">
                    <span className="turn-number">{index + 1}.   {player}</span>
                    {voting && 
                    <button className="eliminate-button"
                        onClick={() => eliminatePlayer(player)}
                    >Eliminate</button>}
                    </div>
                ))}
            </div>
            }

            {gamePhase === 1 && imposterEliminated && (
                <div className="result-message">
                    <h3>The imposter, {Object.keys(wordAssignments).find(player => wordAssignments[player] === imposterWord)}, has been eliminated!</h3>
                </div>
            )}

            {gamePhase === 1 && !imposterEliminated && eliminatedPlayer && (
                <div className="result-message">
                    <h3>{eliminatedPlayer} was eliminated, but they were not the imposter.</h3>
                </div>
            )}

            {
                gamePhase === 1 && (
                    <div className="game-controls">
                        <button className="vote-button" onClick={() => setVoting(true)}>
                            Vote
                        </button>
                    </div>
                )
            }

            {gamePhase === 2 && (
                <div className="result-box">
                    <h2>Game Over</h2>
                    {imposterEliminated ? (
                        <h3>The imposter, {Object.keys(wordAssignments).find(player => wordAssignments[player] === imposterWord)}, has been eliminated!
                         </h3>
                    ) : (
                        <h3>The imposter, {Object.keys(wordAssignments).find(player => wordAssignments[player] === imposterWord)}, has won!
                        </h3>
                    )}
                    <h3>Main Word: {mainWord}</h3>
                    <h3>Imposter Word: {imposterWord}</h3>
                    <button className="play-again-button" onClick={() => window.location.reload()}>
                        Play Again  
                    </button>
                </div>
            )}

        </div>
    );
}
