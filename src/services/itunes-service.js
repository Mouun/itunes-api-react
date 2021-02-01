export const getSongs = async (query) => {
  const requestConfig = {method: 'GET', mode: 'cors', cache: 'default'};
  const targetUrl = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${query.replace(/ /g, '+')}`;

  const response = await (await fetch(targetUrl, requestConfig)).json();

  return response.results.filter(result => result.kind === 'song');
}

export const convertTrackTimeToReadableString = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
