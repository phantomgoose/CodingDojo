import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-super-saiyan-four",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class SuperSaiyanFourComponent extends PowerLevelCalculator {
    title = "SuperSaiyanFourComponent";
    constructor() {
        super(500);
    }
}
