import { shuffle } from '@/utils/shuffle';
import axios from 'axios';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import YouTube from 'react-youtube';

export default function Home() {
  const [ytChannel, setYTChannel] = useState(``);
  const [playlistLink, setPlaylistLink] = useState(``);

  const [videos, setVideos] = useState<any[]>([]);

  const handleRandomVideo = useCallback(async () => {
    let channelName = ``;

    if (ytChannel.includes(`/channel/`)) {
      channelName = ytChannel.split(`/channel/`)[1];
    } else {
      channelName = ytChannel.split(`/c/`)[1];
    }

    const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;

    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=id&type=channel&q=${channelName}&maxResults=5`,
    );

    const channelID = data?.items[0]?.id?.channelId;

    const { data: videos } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelID}&maxResults=50&order=date&type=video`,
    );

    setVideos(
      shuffle(
        videos.items.map((video: any) => ({
          ...video.snippet,
          ...video.id,
        })),
      ),
    );
  }, [ytChannel]);

  return (
    <>
      <Head>
        <title>Randomize Youtube Channel</title>

        <meta
          name="description"
          content="Randomize videos from your favorite Youtube Channel"
          key="desc"
        />
        <meta property="og:title" content="Randomize Youtube Channel" />
        <meta
          property="og:description"
          content="Randomize videos from your favorite Youtube Channel"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/51327920/196572340-809cad7f-7ada-4ae1-96bf-e5c0568e2f80.png"
        />
      </Head>

      <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
        <section>
          <div className="max-w-3xl px-6 py-16 mx-auto text-center">
            <h1 className="gradient text-6xl font-extrabold ">
              Randomize Youtube Channel
            </h1>

            <p className="max-w-md mx-auto mt-5 text-gray-200 dark:text-gray-200">
              Randomize your favorite youtube channel, for start paste channel
              link above
            </p>

            <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
              <input
                onChange={(e) => setYTChannel(e.target.value)}
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                placeholder="Youtube Channel Link"
              />

              <button
                onClick={handleRandomVideo}
                className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Randomize
              </button>
            </div>

            {videos.length ? (
              <div className="mt-12">
                <YouTube
                  videoId={videos[0].videoId}
                  title={videos[0].title}
                  loading="lazy"
                  opts={{
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      playlist: videos.map((video) => video.videoId).join(`,`),
                    },
                  }}
                  onReady={async (e) => {
                    setPlaylistLink(e.target.playerInfo.videoUrl);
                  }}
                />
              </div>
            ) : null}

            <a
              href={playlistLink}
              target="_blank"
              className="block max-w-xs mx-auto mt-8 px-4 py-4 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              rel="noreferrer"
            >
              Play on Youtube
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
