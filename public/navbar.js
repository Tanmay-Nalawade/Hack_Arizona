function setStreakCount(count) {
  const streakCountEl = document.getElementById("streakCount");
  const fireIconEl = document.getElementById("fireIcon");

  if (!streakCountEl || !fireIconEl) return;

  const n = Number.isFinite(count) ? count : Number.parseInt(String(count), 10);
  const safe = Number.isFinite(n) && n > 0 ? n : 0;

  streakCountEl.textContent = String(safe);
  fireIconEl.classList.toggle("nav__fire--lit", safe > 0);
}

// Demo default. In your real app, set window.streakCount from server/user data.
window.streakCount = window.streakCount ?? 0;
setStreakCount(window.streakCount);

// Optional helper for console testing: setStreakCount(5)
window.setStreakCount = setStreakCount;

function initNavMenu() {
  const root = document.querySelector("[data-nav-menu]");
  if (!root) return;

  const trigger = root.querySelector("[data-nav-menu-trigger]");
  const dropdown = root.querySelector("[data-nav-menu-dropdown]");
  if (!trigger || !dropdown) return;

  const setOpen = (open) => {
    dropdown.hidden = !open;
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  };

  const isOpen = () => dropdown.hidden === false;

  trigger.addEventListener("click", () => setOpen(!isOpen()));

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const t = e.target;
    if (!(t instanceof Node)) return;
    if (root.contains(t)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

initNavMenu();

