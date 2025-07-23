/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";

import "./styles.scss";
import Title from "./Title";
import { PopupData } from "./types/types";
import GithubCard from "./GitHubCard";
import RedditCard from "./RedditCard"; // da creare
import NoCard from "./NoCard"; // da creare

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url });
}

const Popup: React.FC = () => {
  const [popupData, setPopupData] = React.useState<PopupData>({
    type: "loading",
  });

  React.useEffect(() => {
    const fetchDataFromStorage = (): void => {
      chrome.storage.local.get(
        ["githubData", "redditData", "unsupportedSite"],
        (result) => {
          console.log("📦 Dati dal local storage:", result);
          if (result.githubData) {
            setPopupData({ type: "github", data: result.githubData });
          } else if (result.redditData) {
            setPopupData({ type: "reddit", data: result.redditData });
          } else if (result.unsupportedSite) {
            setPopupData({ type: "unsupported" });
          } else {
            setPopupData({ type: "loading" });
          }
        }
      );
    };

    // 🔄 Ricarica all'apertura e ogni cambio tab
    fetchDataFromStorage();

    const listener = (): void => {
      fetchDataFromStorage();
    };

    chrome.storage.onChanged.addListener(listener); // ascolta cambiamenti
    return () => {
      chrome.storage.onChanged.removeListener(listener); // cleanup
    };
  }, []);

  return (
    <section id="popup">
      <Title />

      <div className="api-output">
        {popupData.type === "github" && <GithubCard data={popupData.data} />}
        {popupData.type === "reddit" && <RedditCard data={popupData.data} />}
        {popupData.type === "unsupported" && <NoCard />}
        {popupData.type === "loading" && <p>🔄 Caricamento...</p>}
      </div>

      <button
        id="options__button"
        type="button"
        onClick={() => openWebPage("options.html")}
      >
        show raw json
      </button>
    </section>
  );
};

export default Popup;
