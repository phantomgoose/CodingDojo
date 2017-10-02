import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class UserService {
    constructor(private _http: Http) {}

    register(data, onSuccess?: Function, onError?: Function) {
        console.log("submitting post req", data);
        this._http.post("/register", data).subscribe(res => {
            let parsed_res = res.json();
            if (parsed_res == "ok") {
                onSuccess();
            } else {
                onError(parsed_res);
            }
        });
    }
}
