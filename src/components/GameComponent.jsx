import React, { useState, useEffect, useRef } from "react";
import GameStats from "./GameStats";
import { words } from "./WordDictionary";
import "./GameComponent.css";

const GameComponent = () => {
  const word = "cookie";
  const wordArray = word.split("");
  const mappedWord = wordArray.map((char) => {
    return char.toUpperCase();
  });

  const [guessSuccess, setGuessSuccess] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(7);
  const timerRef = useRef();

  const shuffledWord = useRef(shuffle(mappedWord));

  console.log(words[1]);

  const validateInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == word) {
      setIsPlaying(false);
      setGuessSuccess(true);
      clearInterval(timerRef.current);
      localStorage.setItem("lastPlayTimestamp", Date.now());
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
    if (timeLeft > 1) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    } else {
      setTimeLeft(0);
      setGuessSuccess(false);
      setIsPlaying(false);
      clearInterval(timerRef.current);
      localStorage.setItem("lastPlayTimestamp", Date.now());
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
        <div className="scrambl-header-logo-subtext">
          {timeLeft} Seconds left to Unscramble the Word
        </div>
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
            <GameStats timeLeft={timeLeft} />
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
            <GameStats timeLeft={timeLeft} />
          </>
        )}
      </div>
    </>
  );
};

export default GameComponent;
