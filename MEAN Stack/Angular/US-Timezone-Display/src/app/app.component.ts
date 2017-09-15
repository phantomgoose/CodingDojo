import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "US Time Zone Display";
    local_date: Date;
    pst_date;
    mst_date;
    cst_date;
    est_date;
    selected_time_zone = '';
    selected = false;

    constructor() {
        this.updateTime();
    }

    updateTime() {
        setTimeout(() => {
            this.local_date = new Date();
            this.pst_date = calcTimeByOffset(this.local_date, -7);
            this.mst_date = calcTimeByOffset(this.local_date, -6);
            this.cst_date = calcTimeByOffset(this.local_date, -5);
            this.est_date = calcTimeByOffset(this.local_date, -4);
            this.updateTime();
        }, 1000);
    }

    show_tz(tz: string) {
        this.selected_time_zone = tz;
    }
    clear() {
        this.selected_time_zone = '';
    }
}

function calcTimeByOffset(local_date: Date, offset: number): Date {
  let utc_date = local_date.getTime() + (local_date.getTimezoneOffset()*60000);
  let new_date = new Date(utc_date + (3600000*offset));
  return new_date;
}