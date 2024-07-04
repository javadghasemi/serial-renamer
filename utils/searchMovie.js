import axios from "axios";
import {IMDB_APIS} from "../constant.js";

export const searchMovie = async (movieName) => {
  movieName = movieName.split(' ').join('-');
  const imdbRequest = await axios(IMDB_APIS.SEARCH(movieName));
  return imdbRequest.data.d;
};