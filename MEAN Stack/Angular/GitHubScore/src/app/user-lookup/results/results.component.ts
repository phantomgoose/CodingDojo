import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChange,
    SimpleChanges
} from "@angular/core";
import { LookupService } from "../../lookup.service";
import { Subscription } from "rxjs/Subscription";
@Component({
    selector: "app-results",
    templateUrl: "./results.component.html",
    styleUrls: ["./results.component.css"]
})
export class ResultsComponent implements OnInit {
    content: any = {
        payload: null,
        type: null
    };
    subscription: Subscription;

    constructor(private _lookupService: LookupService) {
        this.subscription = this._lookupService.getUser().subscribe(res => {
            this.content = res;
        });
    }

    ngOnInit() {}
}
