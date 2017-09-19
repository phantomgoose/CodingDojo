import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpModule } from "@angular/http";
import { UserLookupComponent } from "./user-lookup/user-lookup.component";
import { LookupService } from "./lookup.service";
import { ResultsComponent } from './user-lookup/results/results.component';

@NgModule({
    declarations: [AppComponent, UserLookupComponent, ResultsComponent],
    imports: [BrowserModule, FormsModule, HttpModule],
    providers: [LookupService],
    bootstrap: [AppComponent]
})

export class AppModule {}
