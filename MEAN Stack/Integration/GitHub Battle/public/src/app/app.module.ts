import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BattleComponent } from "./battle/battle.component";
import { RankingsComponent } from "./rankings/rankings.component";
import { GithubLookupService } from "./github-lookup.service";
import { ResultsComponent } from './results/results.component';

@NgModule({
    declarations: [AppComponent, BattleComponent, RankingsComponent, ResultsComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule],
    providers: [GithubLookupService],
    bootstrap: [AppComponent]
})
export class AppModule {}
