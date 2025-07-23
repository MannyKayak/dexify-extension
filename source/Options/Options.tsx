/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import "./styles.scss";

export const Options: React.FC = () => {
  const [githubData, setGithubData] = useState<any>(null);
  const [redditData, setRedditData] = useState<any>(null);

  useEffect(() => {
    chrome.storage.local.get(["githubData", "redditData"], (result) => {
      setGithubData(result.githubData);
      setRedditData(result.redditData);
    });
  }, []);

  return (
    <div className="options">
      <h1>🔧 Opzioni Estensione</h1>

      <h2>GitHub</h2>
      {githubData ? (
        <pre>{JSON.stringify(githubData, null, 2)}</pre>
      ) : (
        <p>Nessun dato salvato</p>
      )}

      <h2>Reddit</h2>
      {redditData ? (
        <pre>{JSON.stringify(redditData, null, 2)}</pre>
      ) : (
        <p>Nessun dato salvato</p>
      )}
    </div>
  );
};
