import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';


export default function Home() {

    // 0 = not in menu, 1 = in mode menu, 2 = adding players menu
    const [inMenu, setInMenu] = React.useState(0);
    const selectedMode = React.useRef(null);
    const [playerNames, setPlayerNames] = React.useState([]);
    const [inputName, setInputName] = React.useState("");

    function handlePlayClick() {
        setInMenu(1);
    }

    //i = 0 for imposter word, 1 for answer the question
    function handleModeClick(i) {
        setInMenu(2);
        selectedMode.current = i;
    }
    const navigate = useNavigate();
    function startGame() {
        navigate('/room', { state: { players: playerNames, mode: selectedMode.current } });
    }

    return (
        <div className="home-container">

        <div className="floating-questions">
        { Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className="question-mark">?</span>
        ))}
        </div>
  
        {inMenu === 0 && <h1 className="logo">GuessWho</h1>}

        {inMenu === 0 && <button className="play-button" 
        onClick={handlePlayClick}>
          Play
        </button>}

        {inMenu === 1 && (
        <div className="menu-box">
          <h2 className="menu-title">Select Game Mode</h2>
          <button className="mode-button"
          onClick={() => handleModeClick(0)}
          >Imposter Word</button>
          <button className="mode-button"
          onClick={() => handleModeClick(1)}
          >Answer The Question</button>
        </div>
    )}
    
    {inMenu === 2 && (
        <div className="menu-box">
          <h2 className="menu-title">Enter Player Names</h2>
          <div className='player-input-container'>
            <input
                type="text"
                placeholder="Enter a name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="player-input"
            />
            <button
                className="add-button"
                onClick={() => {
                    setPlayerNames([...playerNames, inputName]);
                    setInputName("");
                }}
            >+</button>
            </div>
            <div className="player-list">
            {playerNames.map((name, index) => (
              <div key={index} className="player-name">
                {name}
              </div>
            ))}
          </div>
          <button className="mode-button"
          onClick={startGame}
          >Start</button>
        </div>
      )}

      </div>
    );
}