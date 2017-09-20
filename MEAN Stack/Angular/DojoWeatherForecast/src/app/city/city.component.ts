import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeatherLookupService } from "../weather-lookup.service";
import { Subscription } from "rxjs";
@Component({
    selector: "app-city",
    templateUrl: "./city.component.html",
    styleUrls: ["./city.component.css"]
})
export class CityComponent implements OnInit {
    service_response: any;
    errors: boolean;
    subscription: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _weatherLookup: WeatherLookupService
    ) {}

    ngOnInit() {
        this._route.params.subscribe(params => {
            this._weatherLookup.updateCity(params.city_name);
        });
        this.subscription = this._weatherLookup
            .getCity()
            .subscribe(service_response => {
                this.service_response = service_response;
                this.service_response.type === "error"
                    ? (this.errors = true)
                    : (this.errors = false);
                console.log(this.service_response);
            });
    }
}
