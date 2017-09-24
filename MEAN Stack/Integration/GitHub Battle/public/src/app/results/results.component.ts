import { Component, OnInit } from "@angular/core";
import { GithubLookupService } from "../github-lookup.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-results",
    templateUrl: "./results.component.html",
    styleUrls: ["./results.component.css"]
})
export class ResultsComponent implements OnInit {
    current_players;
    winner;
    loser;

    constructor(
        private _githubLookup: GithubLookupService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.current_players = this._githubLookup.currentPlayersSubject.getValue();

        // quit out of here and redirect if either player doesn't exist
        if (!this.current_players[0] || !this.current_players[1]) {
            this._router.navigate([""]);
            return;
        }

        // not implementing draws
        if (this.current_players[0].score >= this.current_players[1].score) {
            this.winner = this.current_players[0];
            this.loser = this.current_players[1];
        } else {
            this.winner = this.current_players[1];
            this.loser = this.current_players[0];
        }

        this._githubLookup.pushPlayersToDB();
        this._githubLookup.resetCurrentPlayers();
    }

    reset() {
        this._router.navigate([""]);
    }
}
