/* eslint-disable prettier/prettier */
chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  if (!sender.tab?.url) return;

  const url = new URL(sender.tab.url);
  const { hostname } = url;

  if (hostname.includes("github.com")) {
    // ✅ GITHUB
    if (message.type === "GITHUB_USERNAME_DETECTED") {
      const username = message.payload;
      console.log("👤 GitHub username intercettato:", username);

      chrome.storage.local.remove(["redditData", "unsupportedSite"]);

      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          chrome.storage.local.set({
            githubData: data,
            unsupportedSite: false,
          });
          console.log("✅ Dati GitHub salvati");
        })
        .catch((err) => console.error("❌ Errore fetch GitHub:", err));
    }
  } else if (hostname.includes("reddit.com")) {
    // ✅ REDDIT
    if (message.type === "REDDIT_USERNAME_DETECTED") {
      const redditUser = message.payload;
      console.log("👽 Reddit user intercettato:", redditUser);

      chrome.storage.local.remove(["githubData", "unsupportedSite"]);

      fetch(`https://www.reddit.com/user/${redditUser}/about.json`)
        .then((res) => res.json())
        .then((json) => {
          if (json?.data) {
            const { data } = json;
            const redditData = {
              name: data.name,
              icon_img: data.icon_img,
              total_karma: data.total_karma,
              link_karma: data.link_karma,
              comment_karma: data.comment_karma,
              bio: data.subreddit?.public_description || "",
            };

            chrome.storage.local.set({
              redditData,
              unsupportedSite: false,
            });
            console.log("✅ Dati Reddit salvati:", redditData);
          }
        })
        .catch((err) => console.error("❌ Errore fetch Reddit:", err));
    }
  } else {
    // 🌐 ALTRI SITI NON SUPPORTATI
    console.log("⚠️ Sito non supportato:", hostname);

    chrome.storage.local.set({
      unsupportedSite: true,
    });

    chrome.storage.local.remove(["githubData", "redditData"]);
  }
});

export {};
