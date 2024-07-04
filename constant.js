export const IMDB_APIS = Object.freeze({
  SEARCH: (query) => `https://v3.sg.media-imdb.com/suggestion/x/${query}.json?includeVideos=0`,
  MOVIE_INFO: (movieId) => `https://www.imdb.com/title/${movieId}/episodes/?season=1`
});