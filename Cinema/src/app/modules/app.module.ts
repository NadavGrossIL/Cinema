import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { LayoutComponent } from '../components/layout/layout.component';
import { NgbdModalContent } from "../components/edit-modal/edit-modal.component";
import { EditModalComponent } from "../components/edit-modal/edit-modal.component";
import { DeleteModalComponent, NgbdModalDeleteContent } from '../components/delete-modal/delete-modal.component';
import { MoviesComponent } from '../components/movies/movies.component';
import { MovieComponent } from '../components/movie/movie.component';
import { onlyEnglishPipe } from '../pipes/only-english.pipe';

@NgModule({
  declarations: [
    LayoutComponent,
    NgbdModalContent,
    NgbdModalDeleteContent,
    EditModalComponent,
    DeleteModalComponent,
    MoviesComponent,
    MovieComponent,
    onlyEnglishPipe
  ],
  imports: [BrowserModule, NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  entryComponents: [NgbdModalContent, NgbdModalDeleteContent],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
