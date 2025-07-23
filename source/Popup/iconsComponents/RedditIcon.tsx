/* eslint-disable prettier/prettier */
import React from "react";

interface Props {
  url: string;
}

const RedditIcon = ({ url }: Props): React.JSX.Element => {
  return (
    <a href={url} className="reddit-icon-container">
      <img
        src="../../assets/icons/reddit.svg"
        alt="reddit logo"
        height={20}
        width={20}
        className="reddit-icon"
      />
    </a>
  );
};

export default RedditIcon;
