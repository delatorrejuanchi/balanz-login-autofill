(() => {
  "use strict";

  const USERNAME_SELECTOR = 'input[formcontrolname="user"]';
  const PASSWORD_SELECTOR = 'input[formcontrolname="pass"]';
  const AUTOCOMPLETE_FIXES = [
    [USERNAME_SELECTOR, "username"],
    [PASSWORD_SELECTOR, "current-password"],
  ];

  let patchScheduled = false;
  let observer = null;

  function patchAutocomplete() {
    for (const [selector, autocomplete] of AUTOCOMPLETE_FIXES) {
      const input = document.querySelector(selector);
      if (!(input instanceof HTMLInputElement)) {
        continue;
      }

      if (input.getAttribute("autocomplete") !== autocomplete) {
        input.setAttribute("autocomplete", autocomplete);
      }
    }
  }

  function schedulePatch() {
    if (patchScheduled) {
      return;
    }

    patchScheduled = true;
    queueMicrotask(() => {
      patchScheduled = false;
      patchAutocomplete();
    });
  }

  function startObserver() {
    if (observer) {
      return;
    }

    if (!document.documentElement) {
      document.addEventListener("DOMContentLoaded", startObserver, {
        once: true,
      });
      return;
    }

    observer = new MutationObserver(schedulePatch);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["autocomplete"],
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    startObserver();
    patchAutocomplete();
  });

  startObserver();
  schedulePatch();
})();
