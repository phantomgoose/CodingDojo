import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-super-saiyan-three",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class SuperSaiyanThreeComponent extends PowerLevelCalculator {
    title = "SuperSaiyanThreeComponent";
    constructor() {
        super(250);
    }
}
