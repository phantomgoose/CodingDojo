import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class GithubLookupService {
    private user;
    private current_players = Array(2);
    currentPlayersSubject = new BehaviorSubject(this.current_players);
    private all_players = [];

    constructor(private _http: Http) {
        this.currentPlayersSubject.subscribe(current_players => {
            this.current_players = current_players;
        });
    }

    getGitHubUser(
        username: string,
        player: number,
        onSuccess?: Function,
        onError?: Function
    ) {
        this._http
            .get(`/user/${username}`)
            .map(res => {
                return res.json();
            })
            .subscribe(res => {
                if (res.statusCode == 200) {
                    let parsed_body = JSON.parse(res.body);
                    this.current_players[player - 1] = parsed_body;
                    this.current_players[player - 1].score =
                        (parsed_body.public_repos + parsed_body.followers) * 12;
                    onSuccess(parsed_body);
                } else {
                    this.current_players[player - 1] = null;
                    onError();
                }
                this.currentPlayersSubject.next(this.current_players);
            });
    }

    pushPlayersToDB() {
        for (let player of this.current_players) {
            console.log("pushing players to db", player);
            let payload = {
                login: player.login,
                avatar_url: player.avatar_url,
                score: player.score
            };
            this._http.post("/players", payload).subscribe(res => {
                console.log(res);
            });
        }
    }

    resetCurrentPlayers() {
        this.current_players = Array(2);
        this.currentPlayersSubject.next(this.current_players);
    }
}
