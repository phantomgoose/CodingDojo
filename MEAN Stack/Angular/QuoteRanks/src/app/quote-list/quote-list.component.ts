import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-quote-list",
    templateUrl: "./quote-list.component.html",
    styleUrls: ["./quote-list.component.css"]
})
export class QuoteListComponent implements OnInit {
    @Input() quotes: any[];
    @Output() onDelete = new EventEmitter();
    @Output() onSort = new EventEmitter();

    constructor() {}

    delete(quote_id: number): void {
        this.onDelete.emit(quote_id);
    }
    sort(): void {
        this.onSort.emit();
    }
    ngOnInit() {}
}
