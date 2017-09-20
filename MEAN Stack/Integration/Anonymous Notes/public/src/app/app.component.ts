import { Component } from "@angular/core";
import { NoteLookupService } from "./services/note-lookup.service";
import { NgForm } from "@angular/forms";
import { Note } from "./models/note";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    note = new Note();
    constructor(private _noteLookup: NoteLookupService) {}

    onSubmit(form: NgForm) {
        this._noteLookup.createNote(this.note);
        form.reset();
    }
}
