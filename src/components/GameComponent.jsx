import { useState, useEffect, useRef } from "react";
import GameStats from "./GameStats";
import { words } from "../data/words";
import { recordResult } from "../stats";
import "./GameComponent.css";

const START_SECONDS = 7;

function shuffle(letters) {
  const array = [...letters];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const GameComponent = ({ day, onFinish }) => {
  const word = words[day % words.length];
  const wordArray = word.toUpperCase().split("");

  const [guessSuccess, setGuessSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(START_SECONDS);
  const [stats, setStats] = useState(null);

  const shuffledWord = useRef(shuffle(wordArray));

  const finish = (secondsLeft) => {
    const next = recordResult(day, secondsLeft);
    setIsPlaying(false);
    setGuessSuccess(secondsLeft > 0);
    setStats(next);
    onFinish(next);
  };

  const validateInput = (e) => {
    if (e.target.value.toUpperCase() === word.toUpperCase()) {
      finish(timeLeft);
    }
  };

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      finish(0);
    }
    // finish only closes over props and setters that are stable for this game.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, timeLeft]);

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
                maxLength={word.length}
                className="guess"
                placeholder="Guess Quick!"
                onChange={validateInput}
                autoFocus
              ></input>
            </div>
          </>
        )}
        {!isPlaying && !guessSuccess && (
          <div>
            So Close! Today&apos;s word was:
            <div className="word-reveal-container">
              {wordArray.map((char, index) => (
                <div key={index} className="word-reveal">
                  {char}
                </div>
              ))}
            </div>
          </div>
        )}
        {!isPlaying && stats && <GameStats stats={stats} day={day} />}
      </div>
    </>
  );
};

export default GameComponent;
