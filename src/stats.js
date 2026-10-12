// Player stats, persisted in localStorage as one structured record.

export const STATS_KEY = "scrambl.stats.v1";
export const START_DATE_MS = Date.UTC(2024, 5, 21);
export const MAX_SECONDS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;
const SECONDS_RANGE = Array.from({ length: MAX_SECONDS }, (_, i) => i + 1);

// Counters from before the structured record, keyed by seconds left (0 = fail).
const LEGACY_COUNTERS = {
  7: "sevenSeconds",
  6: "sixSeconds",
  5: "fiveSeconds",
  4: "fourSeconds",
  3: "threeSeconds",
  2: "twoSeconds",
  1: "oneSeconds",
  0: "zeroSeconds",
};
const LEGACY_KEYS = [...Object.values(LEGACY_COUNTERS), "lastPlayTimestamp"];

// Days since the start date, in UTC so every player shares the same day.
export function getDayNumber(now = Date.now()) {
  return Math.floor((now - START_DATE_MS) / DAY_MS);
}

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function toCount(value) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function emptyStats() {
  return {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    winsBySecondsLeft: Object.fromEntries(SECONDS_RANGE.map((s) => [s, 0])),
    lastPlayedDay: null,
    lastSecondsLeft: null,
  };
}

// Coerce anything parsed from storage into a valid record.
function sanitize(raw) {
  const stats = emptyStats();
  if (!raw || typeof raw !== "object") return stats;
  stats.gamesPlayed = toCount(raw.gamesPlayed);
  stats.currentStreak = toCount(raw.currentStreak);
  stats.bestStreak = Math.max(toCount(raw.bestStreak), stats.currentStreak);
  for (const s of SECONDS_RANGE) {
    stats.winsBySecondsLeft[s] = toCount(raw.winsBySecondsLeft?.[s]);
  }
  const winTotal = SECONDS_RANGE.reduce(
    (sum, s) => sum + stats.winsBySecondsLeft[s],
    0
  );
  stats.wins = Math.max(toCount(raw.wins), winTotal);
  stats.gamesPlayed = Math.max(stats.gamesPlayed, stats.wins);
  if (Number.isInteger(raw.lastPlayedDay)) stats.lastPlayedDay = raw.lastPlayedDay;
  if (Number.isInteger(raw.lastSecondsLeft)) {
    stats.lastSecondsLeft = Math.min(Math.max(raw.lastSecondsLeft, 0), MAX_SECONDS);
  }
  return stats;
}

// Build a record from the old per-time counters so existing players keep history.
function migrateLegacy(storage) {
  const stats = emptyStats();
  let found = false;
  for (const [secondsLeft, key] of Object.entries(LEGACY_COUNTERS)) {
    const count = toCount(storage.getItem(key));
    if (count > 0) found = true;
    stats.gamesPlayed += count;
    if (secondsLeft > 0) {
      stats.wins += count;
      stats.winsBySecondsLeft[secondsLeft] = count;
    }
  }
  const lastPlay = Number.parseInt(storage.getItem("lastPlayTimestamp"), 10);
  if (Number.isFinite(lastPlay)) {
    stats.lastPlayedDay = getDayNumber(lastPlay);
    found = true;
  }
  return found ? stats : null;
}

function save(stats) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Storage full or blocked: stats just won't persist this session.
  }
}

export function loadStats() {
  const storage = getStorage();
  if (!storage) return emptyStats();
  try {
    const stored = storage.getItem(STATS_KEY);
    if (stored !== null) return sanitize(JSON.parse(stored));

    const legacy = migrateLegacy(storage);
    if (!legacy) return emptyStats();
    const migrated = sanitize(legacy);
    save(migrated);
    if (storage.getItem(STATS_KEY) !== null) {
      LEGACY_KEYS.forEach((key) => storage.removeItem(key));
    }
    return migrated;
  } catch {
    return emptyStats();
  }
}

export function hasPlayedToday(stats, day = getDayNumber()) {
  return stats.lastPlayedDay === day;
}

// Pure: returns the new record. A day only counts once.
export function applyResult(stats, day, secondsLeft) {
  if (stats.lastPlayedDay === day) return stats;
  const won = secondsLeft > 0;
  const continuesStreak = stats.lastPlayedDay === day - 1;
  const currentStreak = won
    ? (continuesStreak ? stats.currentStreak : 0) + 1
    : 0;
  const winsBySecondsLeft = { ...stats.winsBySecondsLeft };
  if (won) winsBySecondsLeft[secondsLeft] += 1;
  return {
    gamesPlayed: stats.gamesPlayed + 1,
    wins: stats.wins + (won ? 1 : 0),
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    winsBySecondsLeft,
    lastPlayedDay: day,
    lastSecondsLeft: secondsLeft,
  };
}

export function recordResult(day, secondsLeft) {
  const next = applyResult(loadStats(), day, secondsLeft);
  save(next);
  return next;
}

export function winPercentage(stats) {
  return stats.gamesPlayed
    ? Math.round((stats.wins / stats.gamesPlayed) * 100)
    : 0;
}

// Short, spoiler-free result text.
export function shareText(day, secondsLeft) {
  const result =
    secondsLeft > 0 ? `🟩 ${secondsLeft}s left` : "🟥 Failed";
  return `Scrambl #${day + 1} ${result}\nhttps://dthurber88.github.io/Scrambl-Game/`;
}
