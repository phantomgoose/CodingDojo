import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Player } from "../models/player";
import { ServerResponse } from "../models/server_response";
import { Http } from "@angular/http";
@Injectable()
export class PlayerService {
    private _players;
    subject = new BehaviorSubject(this._players);

    constructor(private _http: Http) {
        this.subject.subscribe(players => {
            this._players = players;
        });
        this.getPlayers();
    }

    getPlayers() {
        this._http
            .get("/players")
            .map(res => {
                return new ServerResponse(res.json());
            })
            .subscribe(res => {
                processRes(
                    res,
                    function() {
                        this._players = res.content;
                        this.subject.next(this._players);
                    }.bind(this)
                );
            });
    }

    createPlayer(player: Player) {
        this._http
            .post("/players", player)
            .map(res => {
                return new ServerResponse(res.json());
            })
            .subscribe(res => {
                processRes(res, this.getPlayers.bind(this));
            });
    }

    deletePlayer(short_id: string) {
        this._http
            .delete(`/players/${short_id}`)
            .map(res => {
                return new ServerResponse(res.json());
            })
            .subscribe(res => {
                processRes(res, this.getPlayers.bind(this));
            });
    }

    updateStatus(
        short_id: string,
        game_identifier: string,
        new_status: string
    ) {
        this._http
            .patch(`/players/${short_id}`, {
                game_identifier: game_identifier,
                new_status: new_status
            })
            .map(res => {
                return new ServerResponse(res.json());
            })
            .subscribe(res => {
                processRes(res, this.getPlayers.bind(this));
            });
    }
}

function processRes(res: ServerResponse, callback: Function) {
    if (!res.isError) {
        // console.log("no error, got this res:", res);
        callback();
    } else {
        console.log("error:", res);
    }
}
