import React, { useEffect, useState } from "react";
import "./GameStats.css";

const GameStats = (props) => {
  const [time, setTime] = useState();
  const [score, setScore] = useState();

  useEffect(() => {
    switch (props.timeLeft) {
      case 7:
        setTime("Holy Cow! You solved it with 7 seconds left!");
        setScore(7);
        break;
      case 6:
        setTime("Impressive! You solved it with 6 seconds left!");
        setScore(6);
        break;
      case 5:
        setTime("Great! You solved it with 5 seconds left!");
        setScore(5);
        break;
      case 4:
        setTime("Good One! You solved it with 4 seconds left!");
        setScore(4);
        break;
      case 3:
        setTime("Not bad! You solved it with 3 seconds left!");
        setScore(3);
        break;
      case 2:
        setTime("Phew, You solved it with 2 seconds left!");
        setScore(2);
        break;
      case 1:
        setTime("That was a close one! You solved it with 1 second left!");
        setScore(1);
        break;
      case 0:
        setTime("Darn! This was a tough one. Try again tomorrow!");
        setScore(0);
        break;
    }
  }, []);

  useEffect(() => {
    if (score == 7) {
      let increaseScore = parseInt(localStorage.getItem("sevenSeconds"));
      increaseScore += 1;
      localStorage.setItem("sevenSeconds", increaseScore.toString());
    }
    if (score == 6) {
      let increaseScore = parseInt(localStorage.getItem("sixSeconds"));
      increaseScore += 1;
      localStorage.setItem("sixSeconds", increaseScore.toString());
    }
    if (score == 5) {
      let increaseScore = parseInt(localStorage.getItem("fiveSeconds"));
      increaseScore += 1;
      localStorage.setItem("fiveSeconds", increaseScore.toString());
    }
    if (score == 4) {
      let increaseScore = parseInt(localStorage.getItem("fourSeconds"));
      increaseScore += 1;
      localStorage.setItem("fourSeconds", increaseScore.toString());
    }
    if (score == 3) {
      let increaseScore = parseInt(localStorage.getItem("threeSeconds"));
      increaseScore += 1;
      localStorage.setItem("threeSeconds", increaseScore.toString());
    }
    if (score == 2) {
      let increaseScore = parseInt(localStorage.getItem("twoSeconds"));
      increaseScore += 1;
      localStorage.setItem("twoSeconds", increaseScore.toString());
    }
    if (score == 1) {
      let increaseScore = parseInt(localStorage.getItem("oneSeconds"));
      increaseScore += 1;
      localStorage.setItem("oneSeconds", increaseScore.toString());
    }
    if (score == 0) {
      let increaseScore = parseInt(localStorage.getItem("zeroSeconds"));
      increaseScore += 1;
      localStorage.setItem("zeroSeconds", increaseScore.toString());
    }
  }, [score]);

  return (
    <div className="end-game">
      <div>{time}</div>
      <div>
        You solved {localStorage.getItem("sevenSeconds")} words in Seven
        Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("sixSeconds")} words in Six Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("fiveSeconds")} words in Five Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("fourSeconds")} words in Four Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("threeSeconds")} words in Three
        Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("twoSeconds")} words in Two Seconds.
      </div>
      <div>
        You solved {localStorage.getItem("oneSeconds")} words in One Second.
      </div>
      <div>
        You failed to solve {localStorage.getItem("zeroSeconds")} words.
      </div>
    </div>
  );
};

export default GameStats;
