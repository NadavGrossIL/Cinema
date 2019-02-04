import { Injectable, EventEmitter } from "@angular/core";
import { forkJoin } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../models/Movie";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  movieListChanged = new EventEmitter<Movie[]>();
  userMoviesAdded: number;

  constructor(private httpClient: HttpClient) {
    this.userMoviesAdded = 0;
  }

  private titles: string[] = [];
  private movies: Movie[] = [];

  fillArrayWithStartingValues() {
    this.titles.push("flash");
    this.titles.push("superman");
    this.titles.push("batman");
    this.titles.push("it");
    this.titles.push("lord");
    this.titles.push("gladiator");
    this.titles.push("star");
    this.titles.push("iron");
    this.titles.push("hulk");
    this.titles.push("thor");
  }

  getSingleMovie(title: string) {
    return this.httpClient.get<any>(
      "http://www.omdbapi.com/?t=" + title + "&apikey=99341d60&r=json&plot=full"
    );
  }

  getMovies() {
    this.fillArrayWithStartingValues();
    const moviesObservables = [];
    for (let index = 0; index < this.titles.length; index++) {
      const element = this.getSingleMovie(this.titles[index]);
      moviesObservables.push(element);
    }
    return forkJoin(moviesObservables);
  }

  setMovies() {
    this.getMovies().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const newMovie: Movie = new Movie(
          data[index].imdbID,
          data[index].Title,
          data[index].Year,
          data[index].Runtime,
          data[index].Genre,
          data[index].Director,
          data[index].Poster
        );
        this.movies.push(newMovie);
      }
      this.movieListChanged.emit(this.movies.slice());
    });
  }

  deleteMovie(imdbID: string) {
    let editedMovies = this.movies.slice();
    let indexToRemove = editedMovies.findIndex(
      movie => movie.imdbID === imdbID
    );
    editedMovies.splice(indexToRemove, 1);
    this.movies = editedMovies;
    this.movieListChanged.emit(editedMovies);
  }

  editMovie(editedMovie: Movie) {
    let editedMovies = this.movies.slice();
    let indexToEdit = editedMovies.findIndex(
      movie => movie.imdbID === editedMovie.imdbID
    );

    editedMovies[indexToEdit].Director = editedMovie.Director;
    editedMovies[indexToEdit].Genre = editedMovie.Genre;
    editedMovies[indexToEdit].Runtime = editedMovie.Runtime;
    editedMovies[indexToEdit].Title = editedMovie.Title;
    editedMovies[indexToEdit].Year = editedMovie.Year;
    this.movies = editedMovies;
    this.movieListChanged.emit(editedMovies);
  }

  generateMovieId() {
    this.userMoviesAdded++;
    return "userAdded" + this.userMoviesAdded.toString();
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.movieListChanged.emit(this.movies);
  }

  movieTitleExists(title: string, startingTitle: string) {
    for (let index = 0; index < this.movies.length; index++) {
      if (this.movies[index].Title.toLowerCase() === title.toLowerCase()) {
        if (title !== startingTitle) {
          return true;
        }
      }
    }
    return false;
  }
}
