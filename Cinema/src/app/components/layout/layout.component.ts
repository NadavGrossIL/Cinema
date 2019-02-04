import { Component, OnInit, ViewChild } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { Movie } from "src/app/models/Movie";
import { EditModalComponent } from "../edit-modal/edit-modal.component";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  @ViewChild(EditModalComponent) addModal;

  resultsAvailable: boolean = false;
  movies: Movie[] = [];
  totalResults: string;
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.movieListChanged.subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
    this.moviesService.setMovies();
  }

  addMovie() {
    this.addModal.open();
  }
}
