window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-slate-type="toggle"]').forEach((toggle) => {
    const headerDepth = toggle.hasAttribute("data-slate-indent")
      ? +toggle.getAttribute("data-slate-indent")
      : 0;

    // ensure everything starts closed
    let n = toggle.nextElementSibling;
    while (n && n.hasAttribute("data-slate-indent")) {
      n.classList.remove("open");
      n = n.nextElementSibling;
    }

    toggle.style.cursor = "pointer";
    toggle.addEventListener("click", () => {
      const first = toggle.nextElementSibling;
      if (!first || !first.hasAttribute("data-slate-indent")) return;

      const opening = !first.classList.contains("open");
      let curr = first;

      while (curr && curr.hasAttribute("data-slate-indent")) {
        const depth = +curr.getAttribute("data-slate-indent");
        if (depth <= headerDepth) break;

        if (opening) {
          // only open direct children
          if (depth === headerDepth + 1) {
            curr.classList.add("open");
          }
        } else {
          // close everything deeper
          curr.classList.remove("open");

          // reset any nested chevron icons
          if (curr.dataset.slateType === "toggle") {
            const ic = curr.querySelector("svg");
            if (ic) ic.classList.replace("rotate-90", "rotate-0");
          }
        }
        curr = curr.nextElementSibling;
      }

      // rotate this toggle’s chevron
      const icon = toggle.querySelector("svg");
      if (icon) {
        icon.classList.toggle("rotate-0");
        icon.classList.toggle("rotate-90");
      }
    });
  });
});
