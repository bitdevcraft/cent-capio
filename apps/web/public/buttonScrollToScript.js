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

  // 2️⃣ map each id → all its buttons
  const btnMap = {};
  buttons.forEach((btn) => {
    const id = btn.dataset.scrollTo;
    btnMap[id] = btnMap[id] || [];
    btnMap[id].push(btn);
  });

  // 3️⃣ intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.slateId;
        const group = btnMap[id] || [];
        group.forEach((btn) => {
          btn.classList.toggle("text-red-500", entry.isIntersecting);
        });
      });
    },
    {
      rootMargin: "0px 0px -75% 0px", // fire when section top crosses 25% down
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));
});
