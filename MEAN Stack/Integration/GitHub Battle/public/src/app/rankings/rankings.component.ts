import { Component, OnInit } from "@angular/core";
import { GithubLookupService } from "../github-lookup.service";

@Component({
    selector: "app-rankings",
    templateUrl: "./rankings.component.html",
    styleUrls: ["./rankings.component.css"]
})
export class RankingsComponent implements OnInit {
    all_players;

    constructor(private _githubLookup: GithubLookupService) {}

    ngOnInit() {
        this._githubLookup.allPlayersSubject.subscribe(all_players => {
            this.all_players = all_players;
        });
    }
}
