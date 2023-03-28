const trakt = "https://api.trakt.tv";

//ENVIRONMENT VARIABLES can be accessed with process.env.<environment_variable>
/*
 * Functions for Trakt API requests.
 */

//making a GET request to the trakt API by passing the path and the query parameters by
async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending`;
  console.log(reqUrl);
  var response = await fetch(reqUrl, {
    method: "GET", //POST/GET
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

async function getMovieStudios(imdbId) {
  let reqUrl = `${trakt}/movies/${imdbId}/studios`;
  var response = await fetch(reqUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

async function getPopularShows() {
  let reqUrl = `${trakt}/shows/popular`;
  var response = await fetch(reqUrl, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

module.exports = {
  getTrendingMovies,
  getMovieStudios,
  getPopularShows,
};
