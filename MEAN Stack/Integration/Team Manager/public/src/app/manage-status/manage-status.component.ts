import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../services/player.service";
import { ActivatedRoute } from "@angular/router";

// this could have been converted into a nav module with a submodule that actually handles displaying data for a much smoother ui, but w/e, it works
@Component({
    selector: "app-manage-status",
    templateUrl: "./manage-status.component.html",
    styleUrls: ["./manage-status.component.css"]
})
export class ManageStatusComponent implements OnInit {
    players;
    game;
    game_identifier;

    constructor(
        private _playerService: PlayerService,
        private _activedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this._playerService.subject.subscribe(players => {
            this.players = players;
        });
        this._activedRoute.paramMap.subscribe(params => {
            this.game = params.get("id");
            this.game_identifier = `game${this.game}_status`;
        });
    }
    // why oh why did i note make game_status an array or something
    getGameStatusByPlayerIdx(idx: string) {
        return this.players[idx][this.game_identifier];
    }

    setGameStatusByPlayerIdx(idx: string, new_status: string) {
        this._playerService.updateStatus(
            this.players[idx].short_id,
            this.game_identifier,
            new_status
        );
    }
}
