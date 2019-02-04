import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @ViewChild(EditModalComponent) editModal;
  @ViewChild(DeleteModalComponent) deleteModal;

  constructor() { }

  ngOnInit() { }

  editMovie() {
    this.editModal.open(this.movie);
  }

  deleteMovie() {
    this.deleteModal.open(this.movie);
  }
}
