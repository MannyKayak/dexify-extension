/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { GithubApiResponse, RedditApiResponse } from "../Popup/types/types";

export const Options: React.FC = () => {
  const [githubData, setGithubData] = useState<GithubApiResponse | null>(null);
  const [redditData, setRedditData] = useState<RedditApiResponse | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["githubData", "redditData"], (result) => {
      setGithubData(result.githubData);
      setRedditData(result.redditData);
    });
  }, []);

  return (
    <div className="options">
      <h1>🔧 Extension Options</h1>

      <h2>GitHub</h2>
      {githubData ? (
        <pre>{JSON.stringify(githubData, null, 2)}</pre>
      ) : (
        <p>No data</p>
      )}

      <h2>Reddit</h2>
      {redditData ? (
        <pre>{JSON.stringify(redditData, null, 2)}</pre>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};
