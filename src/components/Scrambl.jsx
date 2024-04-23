import React, { useState } from "react";
import GameComponent from "./GameComponent";
import "./Scramble.css";

const Scrambl = () => {
  const [revealed, setRevealed] = useState();

  return (
    <div className="home-container">
      <div className="scrambl-header-logo">S C R A M B L</div>
      <div className="scrambl-header-logo-subtext">A Game of Speed</div>
      <div className="reveal">
        {!revealed && (
          <button className="reveal-button" onClick={() => setRevealed(true)}>
            <span className="text">SCRAMBL IT</span>
          </button>
        )}
        {revealed && <GameComponent />}
      </div>
    </div>
  );
};
export default Scrambl;
