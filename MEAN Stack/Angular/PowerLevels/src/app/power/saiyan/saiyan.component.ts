import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-saiyan",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class SaiyanComponent extends PowerLevelCalculator {
    title = "SaiyanComponent";
    constructor() {
        super(10);
    }
}
