import { Component, OnInit } from "@angular/core";
import { Player } from "../../models/player";
import { PlayerService } from "../../services/player.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-create-player",
    templateUrl: "./create-player.component.html",
    styleUrls: ["./create-player.component.css"]
})
export class CreatePlayerComponent implements OnInit {
    player = new Player();

    constructor(
        private _playerService: PlayerService,
        private _router: Router
    ) {}

    ngOnInit() {}

    onSubmit() {
        this._playerService.createPlayer(this.player);
        this._router.navigate(["players/list"]);
    }
}
