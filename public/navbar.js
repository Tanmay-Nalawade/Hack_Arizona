function applyStreakUI(streaks) {
  const countEl = document.getElementById("streakCount");
  const fireEl = document.getElementById("fireIcon");
  if (!countEl || !fireEl) return;

  const n = Number.isFinite(streaks) ? Math.max(0, Math.floor(streaks)) : 0;
  countEl.textContent = String(n);
  countEl.dataset.streaks = String(n);

  if (n > 0) fireEl.classList.add("nav__fire--lit");
  else fireEl.classList.remove("nav__fire--lit");
}

// Small convenience for testing in devtools.
window.setStreaks = applyStreakUI;

document.addEventListener("DOMContentLoaded", () => {
  const countEl = document.getElementById("streakCount");
  const initial = countEl ? Number.parseInt(countEl.dataset.streaks || "0", 10) : 0;
  applyStreakUI(Number.isNaN(initial) ? 0 : initial);
});

