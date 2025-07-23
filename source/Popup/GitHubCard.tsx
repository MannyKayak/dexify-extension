/* eslint-disable prettier/prettier */
import React from "react";
import FireIcon from "./iconsComponents/FireIcon";
import HeartIcon from "./iconsComponents/HeartIcon";
import RepoIcon from "./iconsComponents/RepoIcon";
import GitIconButton from "./iconsComponents/GitIconButton";
import DexifyIcon from "./iconsComponents/DexifyIcon";
import { GithubApiResponse } from "./types/types";

export default function GithubCard({
  data,
}: {
  data: GithubApiResponse;
}): React.JSX.Element {
  return (
    <div className="pokemon-card">
      <div className="card-header">
        <div className="card-header-title">
          <DexifyIcon />
          <h2 className="card-name">{data.login}</h2>
        </div>

        <div className="card-actions">
          <span className="info-repo-value">{data.public_repos}</span>
          <RepoIcon />
        </div>
      </div>
      <div className="avatar-wrapper">
        <img
          src={data.avatar_url}
          alt={`avatar`}
          height={220}
          width={220}
          className="avatar"
        />
      </div>

      {data.bio && (
        <div className="card-bio-container">
          <p className="card-bio">
            <span className="card-bio-title">Bio: </span>
            {data.bio}
          </p>
        </div>
      )}

      <div className="card-stats">
        <div className="stat-line">
          <FireIcon />
          <span className="stat-label">Followers</span>
          <span className="stat-value">{data.followers}</span>
        </div>
        <div className="stat-line">
          <HeartIcon />
          <span className="stat-label">Following</span>
          <span className="stat-value">{data.following}</span>
        </div>
      </div>
      <div className="card-footer">
        <span>Go to {data.login}&apos;s profile</span>
        <GitIconButton url={data.html_url} />
      </div>
    </div>
  );
}
