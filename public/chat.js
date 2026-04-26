function initChat() {
  const root = document.querySelector("[data-chat]");
  if (!root) return;

  const toggle = root.querySelector("[data-chat-toggle]");
  const panel = root.querySelector("[data-chat-panel]");
  const body = root.querySelector("[data-chat-body]");
  const form = root.querySelector("[data-chat-form]");
  const input = root.querySelector("[data-chat-input]");
  const send = root.querySelector("[data-chat-send]");

  if (!toggle || !panel || !body || !form || !input || !send) return;

  const append = (text, who) => {
    const div = document.createElement("div");
    div.className = `msg msg--${who}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.textContent = open ? "Hide" : "Chat";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) input.focus();
  };

  let open = true;
  setOpen(open);

  toggle.addEventListener("click", () => {
    open = !open;
    setOpen(open);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    append(text, "user");

    send.disabled = true;
    input.disabled = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        append(
          (data && data.error) || "Sorry — the assistant is unavailable right now.",
          "ai"
        );
      } else {
        append(data.reply || "…", "ai");
      }
    } catch {
      append("Network error. Please try again.", "ai");
    } finally {
      send.disabled = false;
      input.disabled = false;
      input.focus();
    }
  });

  append("Hi! Ask me anything about your quests or coursework.", "ai");
}

initChat();

