import { useState } from "react";
import { MAX_SECONDS, shareText, winPercentage } from "../stats";
import "./GameStats.css";

const MESSAGES = {
  7: "Holy Cow! You solved it with 7 seconds left!",
  6: "Impressive! You solved it with 6 seconds left!",
  5: "Great! You solved it with 5 seconds left!",
  4: "Good One! You solved it with 4 seconds left!",
  3: "Not bad! You solved it with 3 seconds left!",
  2: "Phew, You solved it with 2 seconds left!",
  1: "That was a close one! You solved it with 1 second left!",
  0: "Darn! This was a tough one. Try again tomorrow!",
};

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      document.body.removeChild(area);
    }
  }
}

const GameStats = ({ stats, day }) => {
  const [shareState, setShareState] = useState("idle");
  const seconds = Array.from({ length: MAX_SECONDS }, (_, i) => i + 1);
  const maxWins = Math.max(1, ...seconds.map((s) => stats.winsBySecondsLeft[s]));
  const played = stats.lastPlayedDay === day;

  const share = async () => {
    const ok = await copyText(shareText(day, stats.lastSecondsLeft));
    setShareState(ok ? "copied" : "failed");
  };

  return (
    <div className="end-game">
      {played && <div>{MESSAGES[stats.lastSecondsLeft]}</div>}
      <div className="stats-summary">
        <div className="stat">
          <span className="stat-value">{stats.gamesPlayed}</span>
          <span className="stat-label">Played</span>
        </div>
        <div className="stat">
          <span className="stat-value">{winPercentage(stats)}%</span>
          <span className="stat-label">Win %</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.currentStreak}</span>
          <span className="stat-label">Streak</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.bestStreak}</span>
          <span className="stat-label">Best</span>
        </div>
      </div>
      <div className="stats-chart-title">Seconds left on each win</div>
      <div className="stats-chart" role="list">
        {seconds.map((s) => {
          const count = stats.winsBySecondsLeft[s];
          return (
            <div className="stats-chart-row" role="listitem" key={s}>
              <span className="stats-chart-label">{s}s</span>
              <div className="stats-chart-track">
                <div
                  className="stats-chart-bar"
                  style={{ width: `${(count / maxWins) * 100}%` }}
                />
              </div>
              <span className="stats-chart-count">{count}</span>
            </div>
          );
        })}
      </div>
      {played && (
        <div>
          <button className="stats-button" onClick={share}>
            <span className="text">
              {shareState === "copied"
                ? "Copied!"
                : shareState === "failed"
                ? "Copy failed"
                : "Share"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GameStats;
