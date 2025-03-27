import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./room.css";
import questionsData from "../assets/questionsData";
import { h2 } from "framer-motion/client";

export default function Room() {
    const location = useLocation();
    const players = location.state.players;
    const mode = location.state.mode;

    const [shuffledPlayers, setShuffledPlayers] = useState([]);
    const [questionsAssignment, setQuestionsAssignment] = useState({});
    const [answers, setAnswers] = useState({});
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [gamePhase, setGamePhase] = useState(0);
    const [voting, setVoting] = useState(false);
    const [eliminatedPlayer, setEliminatedPlayer] = useState(null);
    const [imposterEliminated, setImposterEliminated] = useState(false);

    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        if (players.length < 3) return;
    
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
        assignedQuestions[shuffled[imposterIndex]] = questionChoices[questionIndex][1];
    
        setQuestionsAssignment(assignedQuestions);
    }, [players]);
    
    function handlePlayAgainClick() {
        setShuffledPlayers([]);
        setQuestionsAssignment({});
        setAnswers({});
        setCurrentPlayer(0);
        setIsFlipped(false);
        setGamePhase(0);
        setVoting(false);
        setEliminatedPlayer(null);
        setImposterEliminated(false);
        setQuestionData([]);

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
        assignedQuestions[shuffled[imposterIndex]] = questionChoices[questionIndex][1];
    
        setQuestionsAssignment(assignedQuestions);
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
        setEliminatedPlayer(player);

        const isImposter = questionsAssignment[player] !== questionData[0];
        setImposterEliminated(isImposter);
        setShuffledPlayers(shuffledPlayers.filter(p => p !== player));
        
        if (isImposter || shuffledPlayers.length - 1 < 3) {
            setGamePhase(2);
        }
    }

    return (
        <div className="room-container">
            <h1 className="logo">Question Game</h1>
            {gamePhase === 0 && (
                <div className="card-box">
                    <motion.div
                        className="card"
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="card-front">{players[currentPlayer]}</div>
                        <div className="card-back">{questionsAssignment[players[currentPlayer]]}</div>
                    </motion.div>
                </div>
            )}
            {gamePhase === 0 && (
                <form onSubmit={handleAnswerSubmit} className="answer-form">
                    <input type="text" name="answer" placeholder="Your Answer" required />
                    <button type="submit">Submit</button>
                </form>
            )}
            {gamePhase === 1 && (
                <div>
                    <h4 className="main-question">Main Question: {questionData[0]}</h4>
                    {shuffledPlayers.map((player, index) => (
                    <div key={index} className="player-item">
                    <span className="turn-number">{index + 1}. {player}: {answers[player]}</span>
                    {voting && 
                    <button className="eliminate-button"
                        onClick={() => eliminatePlayer(player)}
                    >Eliminate</button>}
                    </div>
                ))}
                </div>
            )}
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
                        <h3>The imposter, {Object.keys(questionsAssignment).find(player => questionsAssignment[player] === questionData[1])}, has been eliminated!
                         </h3>
                    ) : (
                        <h3>The imposter, {Object.keys(questionsAssignment).find(player => questionsAssignment[player] === questionData[1])}, has won!
                        </h3>
                    )}
                    <h3>Imposter Question: {questionData[1]}</h3>
                    <button className="play-again-button" onClick={handlePlayAgainClick}>
                        Play Again  
                    </button>
                </div>
            )}
        </div>
    );
}
