import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-super-saiyan",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class SuperSaiyanComponent extends PowerLevelCalculator {
    title = "SuperSaiyanComponent";
    constructor() {
        super(90);
    }
}
