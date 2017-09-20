import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CityComponent } from "./city/city.component";
import { WeatherLookupService } from "./weather-lookup.service";
@NgModule({
    declarations: [AppComponent, CityComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
    ],
    providers: [WeatherLookupService],
    bootstrap: [AppComponent]
})
export class AppModule {}
