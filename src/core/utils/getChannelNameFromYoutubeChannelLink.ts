export function getChannelNameFromYoutubeChannelLink(
  link: string,
): string | undefined {
  if (link.includes(`/channel/`)) {
    return link.split(`/channel/`)[1];
  } else {
    return link.split(`/c/`)[1];
  }
}
