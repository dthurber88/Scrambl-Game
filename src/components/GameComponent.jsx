import React, { useState } from "react";
import "./GameComponent.css";

const GameComponent = () => {
  const word = "player";
  const wordArray = word.split("");
  const mappedWord = wordArray.map((char) => {
    return char.toUpperCase();
  });

  const shuffledWord = shuffle(mappedWord);
  const [winState, setWinState] = useState();

  const validateInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == word) {
      setWinState(true);
    }
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <>
      <div className="game-container">
        {!winState && (
          <>
            <div className="guess-game">
              {shuffledWord.map((char, index) => (
                <div key={index} className="letter">
                  {char}
                </div>
              ))}
            </div>
            <div>
              <input
                maxLength={shuffledWord.length}
                className="guess"
                placeholder="Guess Quick!"
                onChange={validateInput}
                autoFocus
              ></input>
            </div>
          </>
        )}
        {winState && (
          <>
            <div>Nice Work!</div>
            <div>Come back tomorrow</div>
            <div>Stats and Shit Here</div>
          </>
        )}
      </div>
    </>
  );
};

export default GameComponent;
