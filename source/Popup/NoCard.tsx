/* eslint-disable prettier/prettier */
import React from "react";

const NoCard = (): React.JSX.Element => {
  return (
    <div style={{ justifyContent: "center" }}>
      <h2>
        No data: Please go on{" "}
        <a href="https://www.reddit.com/" target="_blank" rel="noreferrer">
          Reddit
        </a>{" "}
        or{" "}
        <a href="https://www.github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        to see the magic!
      </h2>
    </div>
  );
};

export default NoCard;
