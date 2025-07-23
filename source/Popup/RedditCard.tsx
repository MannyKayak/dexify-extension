/* eslint-disable prettier/prettier */
import React from "react";
import FireIcon from "./iconsComponents/FireIcon";
import DexifyIcon from "./iconsComponents/DexifyIcon";
import RedditIcon from "./iconsComponents/RedditIcon";
import CommentKarmaIcon from "./iconsComponents/CommentKarmaIcon";
import KarmaIcon from "./iconsComponents/KarmaIcon";

export default function RedditCard({
  data,
}: {
  data: {
    name: string;
    icon_img: string;
    total_karma: number;
    link_karma: number;
    comment_karma: number;
    bio?: string;
  };
}): React.JSX.Element {
  const cleanName = data.name.replace(/^u\//, "");

  return (
    <div className="pokemon-card">
      <div className="card-header">
        <div className="card-header-title">
          <DexifyIcon />
          <h2 className="card-name">{cleanName}</h2>
        </div>

        <div className="card-actions">
          <span className="info-repo-value">{data.total_karma}</span>
          <KarmaIcon />
        </div>
      </div>
      <div className="avatar-wrapper">
        <img
          src={data.icon_img}
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
          <span className="stat-label">Link karma</span>
          <span className="stat-value">{data.link_karma}</span>
        </div>
        <div className="stat-line">
          <CommentKarmaIcon />
          <span className="stat-label">Comment karma</span>
          <span className="stat-value">{data.comment_karma}</span>
        </div>
      </div>
      <div className="card-footer">
        <span>Go to {cleanName}&apos;s profile</span>
        <RedditIcon url={`https://www.reddit.com/user/${cleanName}`} />
      </div>
    </div>
  );
}
