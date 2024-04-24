import React, { useEffect, useState } from "react";
import GameComponent from "./GameComponent";
import "./Scramble.css";
import GameStats from "./GameStats";

const Scrambl = () => {
  const [revealed, setRevealed] = useState();
  const [canPlay, setCanPlay] = useState();
  const [seeStats, setSeeStats] = useState();

  useEffect(() => {
    const lastPlayTimestamp = localStorage.getItem("lastPlayTimestamp");

    if (
      !lastPlayTimestamp ||
      !sameDay(parseInt(lastPlayTimestamp, 10), Date.now())
    ) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
    }

    function sameDay(day1, day2) {
      const date1 = new Date(day1);
      const date2 = new Date(day2);
      console.log(
        date1.getDate(),
        date1.getMonth(),
        date2.getDate(),
        date2.getMonth()
      );
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
  }, [canPlay]);

  return (
    <div className="home-container">
      <div className="scrambl-header-logo">S C R A M B L</div>
      <div className="scrambl-header-logo-subtext">A Game of Speed</div>
      {!revealed && (
        <div className="scrambl-header-logo-subtext">
          7 Seconds to Unscramble a Word
        </div>
      )}
      <div className="reveal">
        {!revealed && canPlay && (
          <button className="reveal-button" onClick={() => setRevealed(true)}>
            <span className="text">SCRAMBL IT!</span>
          </button>
        )}
        {revealed && <GameComponent />}
        {!revealed && !canPlay && !seeStats && (
          <>
            <div>You Already Played Today!</div>
            <div>
              <button
                className="stats-button"
                onClick={() => setSeeStats(true)}
              >
                <span className="text">See Stats</span>
              </button>
            </div>
          </>
        )}
        {!revealed && !canPlay && seeStats && (
          <>
            <div>
              <GameStats />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Scrambl;
