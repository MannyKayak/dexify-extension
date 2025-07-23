/* eslint-disable prettier/prettier */
export type GithubApiResponse = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

export type RedditApiResponse = {
  name: string;
  icon_img: string;
  total_karma: number;
  link_karma: number;
  comment_karma: number;
  bio?: string;
};

export type PopupData =
  | { type: "github"; data: GithubApiResponse }
  | { type: "reddit"; data: RedditApiResponse }
  | { type: "unsupported" }
  | { type: "loading" };
