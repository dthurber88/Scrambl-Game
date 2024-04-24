import React, { useState } from "react";
import "./GameComponent.css";

const GameComponent = () => {
  const word = "cherry";
  const wordArray = word.split("");
  const mappedWord = wordArray.map((char) => {
    return char.toUpperCase();
  });

  const shuffledWord = shuffle(mappedWord);
  const [guessSuccess, setGuessSuccess] = useState();
  const [isPlaying, setIsPlaying] = useState(true);

  const validateInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == word) {
      setIsPlaying(false);
      setGuessSuccess(true);
    } else {
      setIsPlaying(false);
      setGuessSuccess(false);
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
        {isPlaying && (
          <>
            <div className="guess-game">
              {shuffledWord.map((char, index) => (
                <div key={index} className="jumbled-letter">
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
        {!isPlaying && guessSuccess && (
          <>
            <div>Nice Work!</div>
            <div>Come back tomorrow</div>
            <div>Stats and Shit Here</div>
          </>
        )}
        {!isPlaying && !guessSuccess && (
          <>
            <div>
              So Close! Today's word was:
              <div className="word-reveal-container">
                {wordArray.map((char, index) => (
                  <div key={index} className="word-reveal">
                    {char.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <div>Try Again Tomorrow!</div>
            <div>Stats and Shit Here</div>
          </>
        )}
      </div>
    </>
  );
};

export default GameComponent;
