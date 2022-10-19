export type Channel = {
  channel: string;
  channel_link: string;
  size: number;
  videos: { videoId: string; title: string }[];
};
