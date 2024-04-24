import React, { useState, useEffect, useRef } from "react";
import "./GameComponent.css";

const GameComponent = () => {
  const word = "cherry";
  const wordArray = word.split("");
  const mappedWord = wordArray.map((char) => {
    return char.toUpperCase();
  });

  const [guessSuccess, setGuessSuccess] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(7);
  const timerRef = useRef();

  const shuffledWord = useRef(shuffle(mappedWord));

  const validateInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == word) {
      setIsPlaying(false);
      setGuessSuccess(true);
      clearInterval(timerRef.current);
    }
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const tick = () => {
    console.log(timeLeft);

    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    } else {
      setGuessSuccess(false);
      setIsPlaying(false);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(tick, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  return (
    <>
      <div className="game-container">
        {isPlaying && (
          <>
            <div className="guess-game">
              {shuffledWord.current.map((char, index) => (
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
