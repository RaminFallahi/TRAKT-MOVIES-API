//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./modules/trakt/api");

//needed for parsing JSON data from requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  //the "trakt" below corresponds to the "trakt" from the require line
  let movieList = await trakt.getTrendingMovies();
  console.log(movieList);
  response.render("index", { title: "Movies", movies: movieList });
});
app.get("/movieStudios", async (request, response) => {
  let imdbId = request.query.id;
  let studioList = await trakt.getMovieStudios(imdbId);
  console.log(studioList);
  response.render("studios", { title: "Studios", studios: studioList });
});

app.get("/popular", async (request, response) => {
  let popularShows = await trakt.getPopularShows();
  console.log(popularShows);
  response.render("popular", { title: "PopularShows", shows: popularShows });
});

app.get("/api/test", (request, response) => {
  let product = {
    name: "Test name",
    value: 5.0,
  };
  response.json(product);
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
