import { Component, OnInit } from "@angular/core";
import { LookupService } from "../lookup.service";
import { NgForm } from "@angular/forms";
@Component({
    selector: "app-user-lookup",
    templateUrl: "./user-lookup.component.html",
    styleUrls: ["./user-lookup.component.css"]
})
export class UserLookupComponent implements OnInit {
    username: string;

    constructor(private _lookupService: LookupService) {}

    ngOnInit() {}

    onSubmit(e: Event, form: NgForm) {
        this._lookupService.updateUser(this.username);
        form.reset();
    }
}