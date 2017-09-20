import { Component, OnInit } from '@angular/core';
import { NoteLookupService } from "../services/note-lookup.service";
import { Note } from "../models/note";
import { BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Array<Note>;
  subject: BehaviorSubject<Array<Note>>;

  constructor(private _noteLookup: NoteLookupService) {
    this.subject = this._noteLookup.initSubscription();
    this.subject.subscribe((notes) => {
      this.notes = notes;
    })
  }

  ngOnInit() {
  }

}
