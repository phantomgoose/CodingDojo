import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
@Injectable()
export class LookupService {
    user: User = new User();

    private subject = new Subject<any>();

    constructor(private _http: Http) {}

    updateUser(username: string) {
        let service_response = {
            payload: {},
            type: ""
        };
        this.user.username = username;
        this._http.get("https://api.github.com/users/" + username).subscribe(
            response => {
                this.user.followers = response.json().followers;
                this.user.public_repos = response.json().public_repos;
                this.user.updateInfo();
                service_response.payload = this.user;
                service_response.type = "ok";
                this.subject.next(service_response);
            },
            err => {
                service_response.payload = new Error(
                    "User doesn't exist! Please choose a different username!"
                );
                service_response.type = "error";
                this.subject.next(service_response);
            }
        );
    }

    getUser(): Observable<any> {
        return this.subject.asObservable();
    }
}

class User {
    username: string;
    followers: number;
    public_repos: number;
    score: number = 0;
    message: string;
    color: string;

    constructor() {}

    updateInfo(): void {
        this.score = this.public_repos + this.followers;
        if (this.score >= 200) {
            this.message = "GitHub Elite!";
            this.color = "blue";
        } else if (this.score > 100) {
            this.message = "Great job!";
            this.color = "green";
        } else if (this.score > 50) {
            this.message = "Doing well!";
            this.color = "black";
        } else if (this.score > 20) {
            this.message = "A decent start!";
            this.color = "orange";
        } else {
            this.message = "Needs work!";
            this.color = "red";
        }
    }
}
