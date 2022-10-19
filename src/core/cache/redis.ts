import { Client, Entity, Schema } from 'redis-om';

export const cacheClient = new Client();

async function connect() {
  if (!cacheClient.isOpen()) {
    await cacheClient.open(process.env.REDIS_URL);
  }
}

export type ChannelCreateData = {
  channel: string;
  channel_link: string;
  size: number;
  videos: string;
};

class Channel extends Entity {}
const schema = new Schema(
  Channel,
  {
    channel: { type: `string`, indexed: true },
    channel_link: { type: `string`, indexed: true },
    size: { type: `number` },
    videos: { type: `string` },
  },
  { dataStructure: `JSON` },
);

export async function saveChannelCache(data: ChannelCreateData) {
  await connect();

  const repository = cacheClient.fetchRepository(schema);

  await repository.createIndex();

  const channel = await repository.createAndSave(data);

  await repository.expire(channel.entityId, 60 * 60 * 24);

  return channel;
}

export async function searchChannelCache(q: any) {
  await connect();

  const repository = cacheClient.fetchRepository(schema);

  const channels = await repository
    .search()
    .where(`channel`)
    .eq(q)
    .return.all();

  return channels[0];
}
