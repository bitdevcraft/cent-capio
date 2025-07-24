document.addEventListener("DOMContentLoaded", () => {
  // Find every button with a data-scroll-to
  document.querySelectorAll("button[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-to");
      const targetEl = document.querySelector(`[data-slate-id="${targetId}"]`);
      if (!targetEl) return;

      // Smooth‐scroll so the heading lands at the top of the viewport
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
