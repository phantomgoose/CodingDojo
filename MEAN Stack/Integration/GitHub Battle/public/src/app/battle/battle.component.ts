import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GithubLookupService } from "../github-lookup.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-battle",
    templateUrl: "./battle.component.html",
    styleUrls: ["./battle.component.css"]
})
export class BattleComponent implements OnInit {
    user1 = {
        name: "",
        valid: false
    };
    user2 = {
        name: "",
        valid: false
    };
    current_players = Array(2);

    constructor(
        private _githubLookup: GithubLookupService,
        private _router: Router
    ) {}

    ngOnInit() {
        this._githubLookup.currentPlayersSubject.subscribe(current_players => {
            this.current_players = current_players;
        });
    }

    onSubmit(player) {
        let current_player = player == 1 ? this.user1 : this.user2;
        this._githubLookup.getGitHubUser(
            current_player.name,
            player,
            res => {
                current_player.valid = true;
            },
            () => {
                current_player.valid = false;
            }
        );
    }

    fight() {
        this._router.navigate(["results"]);
    }
}
