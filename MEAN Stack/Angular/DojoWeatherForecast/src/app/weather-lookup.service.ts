import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs";
import { appid_key } from "./APPID.secret";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const PICTURE_API_URL = "https://source.unsplash.com/1600x900/?";

@Injectable()
export class WeatherLookupService {
    private _city = new City();
    private _subject = new Subject<any>();
    constructor(private _http: Http) { }

    public updateCity(city_name: string): void {
        let service_response = { payload: {}, type: "" };
        this._city.name = city_name;
        this._http
            .get(WEATHER_API_URL + city_name + "&APPID=" + appid_key)
            .subscribe(
            response => {
                let jsonified_res = response.json();
                this._city.humidity = jsonified_res.main.humidity;
                this._city.temp_current = kelvinToF(jsonified_res.main.temp);
                this._city.temp_high = kelvinToF(jsonified_res.main.temp_max);
                this._city.temp_low = kelvinToF(jsonified_res.main.temp_min);
                this._city.status = jsonified_res.weather[0].description;
                this._http.get(PICTURE_API_URL + city_name).subscribe(
                    (res) => {
                        this._city.pic = res.url;
                        service_response.payload = this._city;
                        service_response.type = "ok";
                        this._subject.next(service_response);
                    },
                    (err) => {
                        service_response.payload = new Error(
                            "Couldn't find a picture of the city or API is down! Please try again."
                        );
                        service_response.type = "error";
                        this._subject.next(service_response);
                    });
            },
            err => {
                service_response.payload = new Error(
                    "City doesn't exist or API is down! Please try again."
                );
                service_response.type = "error";
                this._subject.next(service_response);
            });

    }

    public getCity(): Observable<any> {
        return this._subject.asObservable();
    }
}

class City {
    humidity: number;
    name: string;
    temp_current: number;
    temp_low: number;
    temp_high: number;
    status: string;
    pic: string;
}

function kelvinToF(num) {
    return Math.floor(num * 9/5 - 459.67);
}