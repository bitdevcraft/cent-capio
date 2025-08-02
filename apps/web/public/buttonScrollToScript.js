document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[data-scroll-to]");
  const sections = document.querySelectorAll("[data-slate-id]");

  // 1️⃣ smooth‐scroll on click
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.scrollTo;
      const targetEl = document.querySelector(`[data-slate-id="${targetId}"]`);
      if (!targetEl) return;
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  sections.forEach((sec) => observer.observe(sec));
});
