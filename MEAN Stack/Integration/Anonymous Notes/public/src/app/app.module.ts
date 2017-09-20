import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteLookupService } from "./services/note-lookup.service";
import { HttpModule } from "@angular/http";
@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [NoteLookupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
