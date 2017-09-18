import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Add a Quote";
    quote: Quote;
    quotes: Array<Quote> = [];

    constructor() {
        this.quote = new Quote();
    }
    deleteQuote(quote_id): void {
        this.quotes.splice(quote_id, 1);
    }
    submit(): void {
        this.quotes.push(this.quote);
        this.quote = new Quote();
        this.sortQuotes();
    }
    sortQuotes(): void {
        insert_sort(this.quotes, "rating");
    }
}

class Quote {
    content: string;
    author: string;
    rating: number = 0;

    upvote(): void {
        this.rating++;
    }
    downvote(): void {
        this.rating--;
    }
}

function insert_sort(arr, key = "", start_idx = 1) {
    if (arr.length < 2) {
        return arr;
    }

    let current = arr[start_idx][key];

    if (arr[start_idx - 1][key] < current) {
        for (let i = start_idx; i > 0; i--) {
            if (arr[i - 1][key] > current) {
                break;
            }
            let temp = arr[i - 1];
            arr[i - 1] = arr[i];
            arr[i] = temp;
        }
    }
    start_idx++;
    if (start_idx < arr.length) {
        insert_sort(arr, key, start_idx);
    }
    return arr;
}
