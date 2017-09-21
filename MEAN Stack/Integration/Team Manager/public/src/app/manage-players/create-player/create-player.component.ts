import { Component, OnInit } from "@angular/core";
import { Player } from "../../models/player";
@Component({
    selector: "app-create-player",
    templateUrl: "./create-player.component.html",
    styleUrls: ["./create-player.component.css"]
})
export class CreatePlayerComponent implements OnInit {
    player = new Player();
    
    constructor() {}

    ngOnInit() {}
}
