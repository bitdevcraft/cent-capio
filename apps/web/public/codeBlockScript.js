document.addEventListener("DOMContentLoaded", () => {
  // 1. Find each code‐block wrapper
  document
    .querySelectorAll('[data-slate-type="code_block"]')
    .forEach((block) => {
      const btn = block.querySelector("button");
      const code = block.querySelector("code");
      if (!btn || !code) return;

      btn.addEventListener("click", async () => {
        // 2. Extract the visible text (preserves line breaks)
        const text = code.innerText.trim();

        // 3. Copy to clipboard (modern API + textarea fallback)
        let ok = false;
        if (navigator.clipboard?.writeText) {
          try {
            await navigator.clipboard.writeText(text);
            ok = true;
          } catch (e) {
            console.warn("Clipboard API failed:", e);
          }
        }
        if (!ok) {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          document.body.appendChild(ta);
          ta.select();
          try {
            ok = document.execCommand("copy");
          } catch (e) {
            console.error("execCommand fallback failed:", e);
          }
          document.body.removeChild(ta);
        }

        const checkIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check !size-3"><path d="M20 6 9 17l-5-5"></path></svg>';
        // 4. Flash feedback
        const original = btn.innerHTML;
        btn.innerHTML = ok ? checkIcon : "Error";
        setTimeout(() => (btn.innerHTML = original), 1500);
      });
    });
});
