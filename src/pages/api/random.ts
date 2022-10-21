import { saveChannelCache, searchChannelCache } from '@/core/cache/redis';
import { getChannelNameFromYoutubeChannelLink } from '@/core/utils/getChannelNameFromYoutubeChannelLink';
import { shuffle } from '@/core/utils/shuffle';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const channelLink = req.body.channel;

    const channelName = getChannelNameFromYoutubeChannelLink(channelLink);

    if (!channelName) {
      return res.status(403).json({
        status: `error`,
        message: `Channel name or channel link is wrong.`,
      });
    }

    const cachedChannel = await searchChannelCache(channelName);

    if (cachedChannel) {
      return res.status(200).json({
        ...cachedChannel?.toJSON(),
        videos: shuffle(JSON.parse(cachedChannel?.toJSON().videos)),
      });
    }

    const apiKey = process.env.YT_API_KEY;

    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=id&type=channel&q=${channelName}&maxResults=5`,
    );

    const channelID = data?.items[0]?.id?.channelId;

    const { data: videos } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelID}&maxResults=50&order=date&type=video`,
    );

    if (videos.items.length === 0) {
      return res
        .status(404)
        .json({ message: `No videos found for Channel: ${channelName}` });
    }

    const channelVideos = shuffle(
      videos.items.map((video: any) => ({
        ...video.snippet,
        ...video.id,
      })),
    );

    const channel = {
      channel: channelName,
      channel_link: channelLink,
      size: videos.items.length,
      videos: channelVideos,
    };

    await saveChannelCache({
      ...channel,
      videos: JSON.stringify(channel.videos),
    });

    res.status(200).json(channel);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(500).json({ message: e.message });
  }
}
