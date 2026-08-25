import React from 'react';
import './home.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { GAME_MODES } from '../constants/gameModes';
import { LANGUAGES } from '../constants/languages';
import { randomInt } from '../utils/random';
import { THEMES, applyTheme, getStoredTheme } from '../utils/theme';


export default function Home() {
    const location = useLocation();

    // 0 = not in menu, 1 = in mode menu, 2 = room configuration menu
    const [inMenu, setInMenu] = React.useState(0);
    const [theme, setTheme] = React.useState(getStoredTheme);
    const [selectedMode, setSelectedMode] = React.useState(null);
    const [playerNames, setPlayerNames] = React.useState([]);
    const [inputName, setInputName] = React.useState("");

    // Room configuration state
    const [imposterCount, setImposterCount] = React.useState(1);
    const [randomizeImposters, setRandomizeImposters] = React.useState(false);
    const [revealElimination, setRevealElimination] = React.useState(true);
    const [showImposterCount, setShowImposterCount] = React.useState(false);
    const [revealImposterStatus, setRevealImposterStatus] = React.useState(false);
    const [showWordCategory, setShowWordCategory] = React.useState(true);
    const [language, setLanguage] = React.useState(LANGUAGES.SPANISH);
    const [enableSpecialRoles, setEnableSpecialRoles] = React.useState(false);
    const [showRolesInfo, setShowRolesInfo] = React.useState(false);
    const [totalRounds, setTotalRounds] = React.useState(5);
    
    // Individual role selection
    const [enableSeraphis, setEnableSeraphis] = React.useState(false);
    const [enableSpectra, setEnableSpectra] = React.useState(false);
    const [enableCensor, setEnableCensor] = React.useState(false);
    const [enableInquisitor, setEnableInquisitor] = React.useState(false);

    // Handle returning from game with preserved state
    React.useEffect(() => {
        if (location.state?.returnToConfig) {
            setInMenu(2);
            setSelectedMode(location.state.mode ?? GAME_MODES.IMPOSTER_WORD);
            setPlayerNames(location.state.players || []);
            setImposterCount(location.state.imposterCount || 1);
            setRandomizeImposters(location.state.randomizeImposters ?? false);
            setRevealElimination(location.state.revealElimination ?? true);
            setShowImposterCount(location.state.showImposterCount ?? false);
            setRevealImposterStatus(location.state.revealImposterStatus ?? false);
            setShowWordCategory(location.state.showWordCategory ?? true);
            setLanguage(location.state.language ?? LANGUAGES.SPANISH);
            setEnableSpecialRoles(location.state.enableSpecialRoles ?? false);
            setEnableSeraphis(location.state.enableSeraphis ?? false);
            setEnableSpectra(location.state.enableSpectra ?? false);
            setEnableCensor(location.state.enableCensor ?? false);
            setEnableInquisitor(location.state.enableInquisitor ?? false);
            setTotalRounds(location.state.totalRounds || 5);
        }
    }, [location]);

    function handlePlayClick() {
        setInMenu(1);
    }

    function handleThemeChange(newTheme) {
        setTheme(newTheme);
        applyTheme(newTheme);
    }

    function handleModeClick(mode) {
        setInMenu(2);
        setSelectedMode(mode);
        // Reset configuration
        setPlayerNames([]);
        setInputName("");
        setImposterCount(1);
        setRandomizeImposters(false);
        setRevealElimination(true);
        setShowImposterCount(false);
        setRevealImposterStatus(false);
        setShowWordCategory(true);
        setLanguage(LANGUAGES.SPANISH);
        setEnableSpecialRoles(false);
        setEnableSeraphis(false);
        setEnableSpectra(false);
        setEnableCensor(false);
        setEnableInquisitor(false);
        setTotalRounds(5);
    }
    
    // Auto-disable Censor and Inquisitor when Questions mode is active
    React.useEffect(() => {
        if (selectedMode === GAME_MODES.ANSWER_THE_QUESTION) {
            setEnableCensor(false);
            setEnableInquisitor(false);
        }
    }, [selectedMode, enableSpecialRoles]);

    function handleBackToModes() {
        setInMenu(1);
    }

    // Calculate max imposters: floor(players / 2)
    const maxImposters = Math.max(1, Math.floor(playerNames.length / 2));

    // Ensure imposterCount doesn't exceed max
    React.useEffect(() => {
        if (imposterCount > maxImposters) {
            setImposterCount(maxImposters);
        }
    }, [playerNames.length, maxImposters, imposterCount]);

    function handleAddPlayer() {
        if (inputName.trim() && !playerNames.includes(inputName.trim())) {
            setPlayerNames([...playerNames, inputName.trim()]);
            setInputName("");
        }
    }

    function handleRemovePlayer(index) {
        setPlayerNames(playerNames.filter((_, i) => i !== index));
    }

    const navigate = useNavigate();
    function startGame() {
        if (playerNames.length < 3) {
            alert("You need at least 3 players to start!");
            return;
        }

        const finalImposterCount = randomizeImposters
            ? randomInt(1, maxImposters)
            : imposterCount;

        const gameState = {
            players: playerNames,
            mode: selectedMode,
            imposterCount: finalImposterCount,
            randomizeImposters: randomizeImposters,
            revealElimination: revealElimination,
            showImposterCount: randomizeImposters ? showImposterCount : false,
            revealImposterStatus: revealImposterStatus,
            showWordCategory: showWordCategory,
            language: language,
            enableSpecialRoles: enableSpecialRoles,
            totalRounds: totalRounds,
            selectedRoles: {
                seraphis: enableSeraphis,
                spectra: enableSpectra,
                censor: enableCensor,
                inquisitor: enableInquisitor
            }
        };

        if (selectedMode === GAME_MODES.IMPOSTER_WORD) {
            navigate('/room', { state: gameState });
        } else if (selectedMode === GAME_MODES.ANSWER_THE_QUESTION) {
            navigate('/qroom', { state: gameState });
        } else if (selectedMode === GAME_MODES.WHO_ANSWERED) {
            navigate('/waroom', { state: gameState });
        }
    }

    return (
        <div className="home-container">

        <div className="floating-questions">
        { Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="question-mark">?</span>
        ))}
        </div>
  
        {inMenu === 0 && (
          <div className="theme-switcher">
            <button
              className={`theme-swatch theme-swatch-pink ${theme === THEMES.PINK ? 'active' : ''}`}
              onClick={() => handleThemeChange(THEMES.PINK)}
              aria-label="Pink theme"
              title="Pink theme"
              type="button"
            />
            <button
              className={`theme-swatch theme-swatch-yellow ${theme === THEMES.YELLOW ? 'active' : ''}`}
              onClick={() => handleThemeChange(THEMES.YELLOW)}
              aria-label="Yellow theme"
              title="Yellow theme"
              type="button"
            />
          </div>
        )}

        {inMenu === 0 && (
          <div className="logo-container">
            <div className="logo-number-bg">3</div>
            <h1 className="logo">
              <span className="logo-main">GuessWho</span>
              <span className="logo-version">3</span>
            </h1>
            <p className="logo-tagline">Who's the Imposter?</p>
          </div>
        )}

        {inMenu === 0 && <button className="play-button"
        onClick={handlePlayClick}>
          Play
        </button>}

        {inMenu === 1 && (
        <div className="menu-box mode-selection">
          <h2 className="menu-title">Select Game Mode</h2>
          <div className="mode-cards">
            <div className="mode-card" onClick={() => handleModeClick(GAME_MODES.IMPOSTER_WORD)}>
              <h3 className="mode-card-title">Imposter Word</h3>
              <p className="mode-card-description">One player gets a different word. Find the imposter!</p>
            </div>
            <div className="mode-card" onClick={() => handleModeClick(GAME_MODES.ANSWER_THE_QUESTION)}>
              <h3 className="mode-card-title">Answer The Question</h3>
              <p className="mode-card-description">One player gets a different question. Spot the odd one out!</p>
            </div>
            <div className="mode-card" onClick={() => handleModeClick(GAME_MODES.WHO_ANSWERED)}>
              <h3 className="mode-card-title">Who Answered?</h3>
              <p className="mode-card-description">Everyone answers the same question. Guess who said it!</p>
            </div>
          </div>
        </div>
    )}
    
    {inMenu === 2 && (
        <div className="menu-box room-config">
          <h2 className="menu-title">Room Configuration</h2>
          
          {/* Players Section */}
          <div className="config-section">
            <h3 className="config-section-title">Players ({playerNames.length})</h3>
            <div className='player-input-container'>
              <input
                  type="text"
                  placeholder="Enter player name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                  className="player-input"
              />
              <button
                  className="add-button"
                  onClick={handleAddPlayer}
                  disabled={!inputName.trim()}
              >+</button>
            </div>
            <div className="player-list">
              {playerNames.length === 0 && (
                <p className="empty-message">Add at least 3 players to start</p>
              )}
              {playerNames.map((name, index) => (
                <div key={index} className="player-item-card">
                  <span className="player-item-name">{name}</span>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemovePlayer(index)}
                  >×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Language Section */}
          <div className="config-section">
            <h3 className="config-section-title">Language</h3>
            <div className="language-toggle">
              <button
                type="button"
                className={`language-option ${language === LANGUAGES.SPANISH ? 'active' : ''}`}
                onClick={() => setLanguage(LANGUAGES.SPANISH)}
              >
                Español
              </button>
              <button
                type="button"
                className={`language-option ${language === LANGUAGES.ENGLISH ? 'active' : ''}`}
                onClick={() => setLanguage(LANGUAGES.ENGLISH)}
              >
                English
              </button>
            </div>
          </div>

          {/* Rounds Configuration Section - Only for mode 2 (Who Answered) */}
          {playerNames.length >= 3 && selectedMode === GAME_MODES.WHO_ANSWERED && (
            <div className="config-section">
              <h3 className="config-section-title">Game Settings</h3>
              
              <div className="imposter-controls">
                <div className="imposter-slider-container">
                  <label className="config-label">
                    Number of Rounds: 
                    <span className="imposter-value">{totalRounds}</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={totalRounds}
                    onChange={(e) => setTotalRounds(parseInt(e.target.value))}
                    className="imposter-slider"
                  />
                  <div className="slider-labels">
                    <span>3</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Imposter Configuration Section - Only for modes 0 and 1 */}
          {playerNames.length >= 3 && selectedMode !== GAME_MODES.WHO_ANSWERED && (
            <div className="config-section">
              <h3 className="config-section-title">Imposters</h3>
              
              <div className="imposter-controls">
                <div className="imposter-slider-container">
                  <label className="config-label">
                    Number of Imposters: 
                    <span className="imposter-value">{imposterCount}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={maxImposters}
                    value={imposterCount}
                    onChange={(e) => setImposterCount(parseInt(e.target.value))}
                    className="imposter-slider"
                    disabled={randomizeImposters}
                  />
                  <div className="slider-labels">
                    <span>1</span>
                    <span>Max: {maxImposters}</span>
                  </div>
                </div>

                <div className="randomize-option">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={randomizeImposters}
                      onChange={(e) => setRandomizeImposters(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      Randomize imposters (1-{maxImposters})
                    </span>
                  </label>
                </div>

                <div className="randomize-option">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={revealElimination}
                      onChange={(e) => setRevealElimination(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      Reveal if eliminated player was imposter
                    </span>
                  </label>
                </div>

                {randomizeImposters && (
                  <div className="randomize-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={showImposterCount}
                        onChange={(e) => setShowImposterCount(e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">
                        Show number of imposters selected
                      </span>
                    </label>
                  </div>
                )}

                {selectedMode === GAME_MODES.IMPOSTER_WORD && (
                  <div className="randomize-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={showWordCategory}
                        onChange={(e) => setShowWordCategory(e.target.checked)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">
                        Show word category during the game
                      </span>
                    </label>
                  </div>
                )}

                <div className="randomize-option">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={revealImposterStatus}
                      onChange={(e) => setRevealImposterStatus(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      Reveal imposter status to imposters
                      {imposterCount > 1 && " (and show fellow imposters)"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Special Roles Configuration - Only for modes 0 and 1 */}
          {playerNames.length >= 3 && selectedMode !== GAME_MODES.WHO_ANSWERED && (
            <div className="config-section">
              <h3 className="config-section-title">Special Roles</h3>
              
              <div className="special-roles-controls">
                <div className="randomize-option">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={enableSpecialRoles}
                      onChange={(e) => {
                        const isEnabled = e.target.checked;
                        setEnableSpecialRoles(isEnabled);
                        // If disabling, uncheck all individual roles
                        if (!isEnabled) {
                          setEnableSeraphis(false);
                          setEnableSpectra(false);
                          setEnableCensor(false);
                          setEnableInquisitor(false);
                        }
                      }}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      Enable special roles with unique abilities
                    </span>
                  </label>
                </div>

                {enableSpecialRoles && (
                  <div className="individual-roles-selection">
                    <p className="roles-selection-label">
                      Select which roles to include:
                      {selectedMode === GAME_MODES.ANSWER_THE_QUESTION && (
                        <span className="mode-restriction-note"> (Questions Mode - Only Seraphis & Spectra available)</span>
                      )}
                    </p>
                    
                    <div className="role-checkbox-grid">
                      <label className="role-checkbox-label">
                        <input
                          type="checkbox"
                          checked={enableSeraphis}
                          onChange={(e) => setEnableSeraphis(e.target.checked)}
                          className="checkbox-input"
                        />
                        <span className="role-checkbox-text">
                          <strong>Seraphis</strong> - The Final Verdict
                        </span>
                      </label>

                      <label className="role-checkbox-label">
                        <input
                          type="checkbox"
                          checked={enableSpectra}
                          onChange={(e) => setEnableSpectra(e.target.checked)}
                          className="checkbox-input"
                        />
                        <span className="role-checkbox-text">
                          <strong>Spectra</strong> - The Eternal Echo
                        </span>
                      </label>

                      {selectedMode === GAME_MODES.IMPOSTER_WORD && (
                        <>
                          <label className="role-checkbox-label">
                            <input
                              type="checkbox"
                              checked={enableCensor}
                              onChange={(e) => setEnableCensor(e.target.checked)}
                              className="checkbox-input"
                            />
                            <span className="role-checkbox-text">
                              <strong>Censor</strong> - Censorship
                            </span>
                          </label>

                          <label className="role-checkbox-label">
                            <input
                              type="checkbox"
                              checked={enableInquisitor}
                              onChange={(e) => setEnableInquisitor(e.target.checked)}
                              className="checkbox-input"
                            />
                            <span className="role-checkbox-text">
                              <strong>Inquisitor</strong> - Question
                            </span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <button 
                  className="info-button"
                  onClick={() => setShowRolesInfo(true)}
                  type="button"
                >
                  View Roles Information
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="config-actions">
            <button className="back-button" onClick={handleBackToModes}>
              ← Back
            </button>
            <button 
              className="start-button"
              onClick={startGame}
              disabled={playerNames.length < 3}
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Roles Information Modal */}
      {showRolesInfo && (
        <div className="modal-overlay" onClick={() => setShowRolesInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Special Roles & Abilities</h2>
              <button className="modal-close" onClick={() => setShowRolesInfo(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="role-info-card">
                <h3 className="role-name">Seraphis</h3>
                <p className="role-ability">Ability: The Final Verdict</p>
                <p className="role-description">
                  This role is assigned randomly to a player, NEVER to an impostor. 
                  When the player with this role is eliminated, a message will appear 
                  and that player can eliminate another player without needing anyone's vote.
                </p>
                <p className="role-reveal">Revealed: When eliminated</p>
              </div>

              <div className="role-info-card">
                <h3 className="role-name">Spectra</h3>
                <p className="role-ability">Ability: The Eternal Echo</p>
                <p className="role-description">
                  Only non-impostor players can get this role. The player with this role 
                  can vote and speak even after being eliminated. When the player with 
                  this ability dies, it will be announced.
                </p>
                <p className="role-reveal">Revealed: When eliminated</p>
              </div>

              <div className="role-info-card">
                <h3 className="role-name">Censor</h3>
                <p className="role-ability">Ability: Censorship</p>
                <p className="role-description">
                  All players, including impostors, can get this role. The player with 
                  this role can nullify a word or explanation given about the hidden word 
                  by another player. Can be used 2 times per game.
                </p>
                <p className="role-reveal">Revealed: When ability is used</p>
              </div>

              <div className="role-info-card">
                <h3 className="role-name">Inquisitor</h3>
                <p className="role-ability">Ability: Question</p>
                <p className="role-description">
                  Can be players or impostors. Can ask any player a question at any 
                  moment during the game. Can be used 2 times per game.
                </p>
                <p className="role-reveal">Revealed: When ability is used</p>
              </div>

              <div className="role-info-note">
                <p><strong>Note:</strong> All roles will be revealed at the end of the game regardless of the result.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    );
}