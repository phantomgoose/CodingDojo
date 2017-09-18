import { Component } from "@angular/core";
import { PowerLevelCalculator } from "../../power-level-calculator";

@Component({
    selector: "app-human",
    templateUrl: "../power-template.html",
    styleUrls: ["../power-style.css"]
})
export class HumanComponent extends PowerLevelCalculator {
    title = "HumanComponent";
    constructor() {
        super(1);
    }
}
