import {readdirSync, renameSync} from 'node:fs';
import {extname} from 'node:path';

import {input, select} from "@inquirer/prompts";

import {getHtmlRawText} from "./utils/getHtmlRawText.js";
import {parseHtmlContentToJson} from "./utils/parseHtmlContentToJson.js";
import {searchMovie} from "./utils/searchMovie.js";
import {IMDB_APIS} from "./constant.js";
import {sanitizeNumber} from "./utils/sanitizeNumber.js";
import {__dirname} from './utils/dirname.js';

class MovieRenamer {
  static #name;
  static #directory;
  static #episodes;

  static async start() {
    let movieName = await input({message: 'What is your movie name?'});
    movieName = movieName.split(' ').join('-');

    const searchResult = await searchMovie(movieName);
    const moviesList = this.#aggregateSearchResult(searchResult);

    const answer = await select({message: 'Choose your movie from search result in IMDB', choices: moviesList});
    const movieInformation = await this.#getMovieInformation(answer);

    this.#name = movieInformation.name;
    this.#episodes = movieInformation.episodes;

    this.#directory = await input({message: 'Enter your directory:', default: __dirname(import.meta.url)});

    this.#createEpisodesFileName();
    this.#renameFilesInSpecificDirectory();
  }

  static #aggregateSearchResult(searchResult) {
    const movies = [];

    searchResult.forEach(movie => {
      const name = movie.l;
      const releaseDate = movie.yr || movie.y;
      const type = movie.q;
      const id = movie.id;

      const answerName = `${name}(${releaseDate}) - ${type}`;
      movies.push({name: answerName, value: id});
    });

    return movies;
  }

  static async #getMovieInformation(id) {
    const htmlContent = await getHtmlRawText(IMDB_APIS.MOVIE_INFO(id));
    const jsonContent = parseHtmlContentToJson(htmlContent);

    return {
      name: jsonContent.props.pageProps.contentData.parentDisplayText,
      episodes: jsonContent.props.pageProps.contentData.section.episodes.items,
    };
  }

  static #createEpisodesFileName() {
    const filesName = [];
    this.#episodes.forEach(episodeInfo => {
      const season = sanitizeNumber(episodeInfo.season);
      const episode = sanitizeNumber(episodeInfo.episode);

      const filename = `${this.#name} S${season} E${episode} - ${episodeInfo.titleText}`;

      filesName.push(filename);
    })

    return filesName;
  }

  static #renameFilesInSpecificDirectory() {
    const files = readdirSync(this.#directory);
    files.forEach((filename, index) => {
      const format = extname(filename);
      const episodeFileName = filesName[index] + format;

      const oldPath = directory + '\\' + filename;
      const newPath = directory + '\\' + episodeFileName;

      renameSync(oldPath, newPath);
    });
  }
}

await MovieRenamer.start()