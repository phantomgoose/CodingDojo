import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";
@Component({
    selector: "app-list-players",
    templateUrl: "./list-players.component.html",
    styleUrls: ["./list-players.component.css"]
})
export class ListPlayersComponent implements OnInit {
    players;
    display_delete_confirmation = {
        display: false,
        short_id: ""
    };

    constructor(private _playerService: PlayerService) {}

    ngOnInit() {
        this._playerService.subject.subscribe(players => {
            this.players = players;
        });
    }

    deletePlayer(short_id: string) {
        this._playerService.deletePlayer(short_id);
        this.cancelDelete();
    }

    confirmDelete(short_id: string) {
        this.display_delete_confirmation.display = true;
        this.display_delete_confirmation.short_id = short_id;
    }

    cancelDelete() {
        this.display_delete_confirmation.display = false;
        this.display_delete_confirmation.short_id = "";
    }
}
