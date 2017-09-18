import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-super-saiyan-two",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class SuperSaiyanTwoComponent extends PowerLevelCalculator {
    title = "SuperSaiyanTwoComponent";
    constructor() {
        super(150);
    }
}
