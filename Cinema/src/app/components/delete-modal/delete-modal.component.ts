import { Component, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Movie } from "src/app/models/Movie";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "ngbd-modal-delete-content",
  templateUrl: "./delete-modal.component.html",
  styleUrls: ["./delete-modal.component.css"]
})
export class NgbdModalDeleteContent {
  @Input() currentMovie: Movie;
  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: "app-delete-modal",
  template: ``,
  styleUrls: ["./delete-modal.component.css"]
})
export class DeleteModalComponent {
  @Input() currentMovie: Movie;
  constructor(
    private modalService: NgbModal,
    private moviesService: MoviesService
  ) { }

  open(movie: Movie) {
    const modalRef = this.modalService.open(NgbdModalDeleteContent);
    modalRef.result.then(result => {
      if (result === "Ok click") {
        this.moviesService.deleteMovie(movie.imdbID);
      }
    });
    modalRef.componentInstance.currentMovie = movie;
  }
}
