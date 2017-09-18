import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-power",
    templateUrl: "./power.component.html",
    styleUrls: ["./power.component.css"]
})
export class PowerComponent implements OnInit {
    // just to generate a for loop
    max_power_level = new Array(100);
    power_level: number;
    selected_level: number;

    constructor() {}

    ngOnInit() {}

    onSubmit(){
      this.power_level = this.selected_level;
    }
}