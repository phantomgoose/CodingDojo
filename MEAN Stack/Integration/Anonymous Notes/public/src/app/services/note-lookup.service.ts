import { Injectable } from "@angular/core";
import { Note } from "../models/note";
import { BehaviorSubject } from "rxjs";
import { Http } from "@angular/http";
@Injectable()
export class NoteLookupService {
    private notes: Array<Note>;
    private subject = new BehaviorSubject(this.notes);

    constructor(private _http: Http) {
        this.subject.subscribe(notes => {
            this.notes = notes;
        });
        this.listNotes();
    }

    listNotes() {
        this._http.get("/notes").subscribe(res => {
            this.notes = res.json();
            this.subject.next(this.notes);
        });
    }

    createNote(note: Note) {
        this._http.post("/notes", note).subscribe(res => {
            let parsed_res = res.json();
            if (!parsed_res.errors) {
                this.listNotes();
            } else {
                console.log(parsed_res.errors.message);
            }
        });
    }

    initSubscription(): BehaviorSubject<Array<Note>> {
        return this.subject;
    }
}
