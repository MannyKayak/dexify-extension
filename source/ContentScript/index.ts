/* eslint-disable prettier/prettier */
console.log("✅ Dexify content script attivo su", window.location.href);

((): void => {
  const { hostname } = window.location;
  const { pathname } = window.location;

  // GITHUB
  if (hostname.includes("github.com")) {
    const pathParts = pathname.split("/");
    const username = pathParts[1];

    if (username && username.length > 0) {
      chrome.runtime.sendMessage({
        type: "GITHUB_USERNAME_DETECTED",
        payload: username,
      });
    }
  }

  // REDDIT
  else if (hostname.includes("reddit.com")) {
    const pathParts = pathname.split("/");
    // Format: /user/{username}
    if (pathParts.length > 2 && pathParts[1] === "user") {
      const username = pathParts[2];

      if (username && username.length > 0) {
        chrome.runtime.sendMessage({
          type: "REDDIT_USERNAME_DETECTED",
          payload: username,
        });
      }
    }
  }

  // ALTRI SITI → invia solo un segnale (opzionale)
  else {
    chrome.runtime.sendMessage({
      type: "UNSUPPORTED_SITE",
    });
  }
})();

export {};
