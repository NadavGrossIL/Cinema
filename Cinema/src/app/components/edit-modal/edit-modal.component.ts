import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Movie } from "src/app/models/Movie";
import { MoviesService } from "src/app/services/movies.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";

@Component({
  selector: "ngbd-modal-content",
  templateUrl: "./edit-modal.component.html",
  styleUrls: ["./edit-modal.component.css"]
})
export class NgbdModalContent implements OnInit {
  @Input() currentMovie: Movie;
  @Input() editMode: boolean;
  editForm: FormGroup;
  titleControl: FormControl;
  yearControl: FormControl;
  runtimeControl: FormControl;
  genreControl: FormControl;
  directorControl: FormControl;

  constructor(
    public activeModal: NgbActiveModal,
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initilizeForm();
  }

  private initilizeForm() {
    if (this.editMode) {
      this.titleControl = new FormControl(this.currentMovie.Title, [
        Validators.required,
        this.ValidateTitle(this.currentMovie.Title)
      ]);
      this.yearControl = new FormControl(this.currentMovie.Year, [
        Validators.required,
        Validators.pattern("^(19[0-9][0-9]|20[0-1][0-9])")
      ]);
      this.runtimeControl = new FormControl(
        this.currentMovie.Runtime,
        Validators.required
      );
      this.genreControl = new FormControl(
        this.currentMovie.Genre,
        Validators.required
      );
      this.directorControl = new FormControl(
        this.currentMovie.Director,
        Validators.required
      );
    } else {
      this.titleControl = new FormControl("", [
        Validators.required,
        this.ValidateTitle("")
      ]);
      this.yearControl = new FormControl("", [
        Validators.required,
        Validators.pattern("^(19[0-9][0-9]|20[0-1][0-9])")
      ]);
      this.runtimeControl = new FormControl("", Validators.required);
      this.genreControl = new FormControl("", Validators.required);
      this.directorControl = new FormControl("", Validators.required);
    }

    this.editForm = this.formBuilder.group({
      title: this.titleControl,
      year: this.yearControl,
      runtime: this.runtimeControl,
      genre: this.genreControl,
      director: this.directorControl
    });
  }

  ValidateTitle(currentTitle: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (this.moviesService.movieTitleExists(control.value, currentTitle)) {
        return { invalidTitle: true };
      }
      return null;
    };
  }

  onSubmit() {
    var id: string = "";
    var poster: string = "";
    if (this.editMode) {
      id = this.currentMovie.imdbID;
      poster = this.currentMovie.Poster;
    } else {
      id = this.moviesService.generateMovieId();
    }
    const newMovie: Movie = new Movie(
      id,
      this.editForm.value.title,
      this.editForm.value.year,
      this.editForm.value.runtime,
      this.editForm.value.genre,
      this.editForm.value.director,
      poster
    );
    this.editMode
      ? this.moviesService.editMovie(newMovie)
      : this.moviesService.addMovie(newMovie);
    this.activeModal.close();
  }
}

@Component({
  selector: "app-edit-modal",
  template: ``
})
export class EditModalComponent {
  @Input() currentMovie: Movie;
  @Input() editMode: boolean;

  closeResult: string;
  constructor(private modalService: NgbModal) {}

  open(movie: Movie) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.currentMovie = movie;
    modalRef.componentInstance.editMode = this.editMode;
  }
}
