import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Retro Barcode Generator";
    colored_divs: Array<RandomColor> = genRandomColors(1000);
    colors_to_gen: 200;

    regenerateColors() {
      this.colored_divs = genRandomColors(1000);
      setTimeout(() => {
        this.regenerateColors();
      }, 100);
    }
}

class RandomColor {
    r: number;
    g: number;
    b: number;
    color: string;

    constructor() {
        this.r = Math.floor(Math.random() * 256);
        this.g = Math.floor(Math.random() * 256);
        this.b = Math.floor(Math.random() * 256);
        this.color = `rgba(${this.r}, ${this.g}, ${this.b}, 1.0)`;
    }
}

function genRandomColors(numColors: number): Array<RandomColor> {
    let res = [];
    for (let i = 0; i < numColors; i++) {
        res.push(new RandomColor());
    }
    return res;
}
