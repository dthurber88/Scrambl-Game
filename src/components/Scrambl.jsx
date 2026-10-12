import { useState } from "react";
import GameComponent from "./GameComponent";
import "./Scramble.css";
import GameStats from "./GameStats";
import { getDayNumber, hasPlayedToday, loadStats } from "../stats";

const Scrambl = () => {
  const [day] = useState(getDayNumber);
  const [stats, setStats] = useState(loadStats);
  const [revealed, setRevealed] = useState(false);
  const [seeStats, setSeeStats] = useState(false);

  const canPlay = !hasPlayedToday(stats, day);

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
        {revealed && <GameComponent day={day} onFinish={setStats} />}
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
          <div>
            <GameStats stats={stats} day={day} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Scrambl;
