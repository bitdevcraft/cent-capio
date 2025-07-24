window.addEventListener("DOMContentLoaded", () => {
  // 1. Find all toggle headers
  const toggles = document.querySelectorAll('[data-slate-type="toggle"]');

  toggles.forEach((toggle) => {
    // 2. Hide all following indent blocks initially
    let nxt = toggle.nextElementSibling;
    while (nxt && nxt.hasAttribute("data-slate-indent")) {
      nxt.style.display = "none";
      nxt = nxt.nextElementSibling;
    }

    // 3. Make header clickable
    toggle.style.cursor = "pointer";
    toggle.addEventListener("click", () => {
      // Determine new state: if first indent is hidden → we’re opening
      const firstIndent = toggle.nextElementSibling;
      const opening = firstIndent && firstIndent.style.display === "none";

      // 4. Toggle each indent sibling
      let curr = firstIndent;
      while (curr && curr.hasAttribute("data-slate-indent")) {
        curr.style.display = opening ? "" : "none";
        curr = curr.nextElementSibling;
      }

      // 5. Rotate the chevron
      const icon = toggle.querySelector("svg");
      if (icon) {
        icon.classList.toggle("rotate-0");
        icon.classList.toggle("rotate-90");
      }
    });
  });
});
