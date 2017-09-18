import {
    OnInit,
    Input,
    OnChanges,
    SimpleChange,
    SimpleChanges
} from "@angular/core";

export class PowerLevelCalculator implements OnInit {
    @Input() power_level;
    modified_level: number;
    description: string;
    private _multiplier: number;
    constructor(multiplier: number) {
        this._multiplier = multiplier;
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        let power_level: SimpleChange = changes.power_level;
        this.modified_level = power_level.currentValue * this._multiplier;
        this.description = this.genDescription(this.modified_level);
    }

    genDescription(level: number): string {
        if (level >= 50000) {
            return "The One";
        }
        if (level > 25000) {
            return "Superlative Powers!";
        }
        if (level > 20000) {
            return "Superlative!";
        }
        if (level > 9000) {
            return "Over 9000!";
        }
        return "";
    }
}
