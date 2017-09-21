import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ManagePlayersComponent } from "./manage-players/manage-players.component";
import { ManageStatusComponent } from "./manage-status/manage-status.component";
import { ListPlayersComponent } from "./manage-players/list-players/list-players.component";
import { CreatePlayerComponent } from "./manage-players/create-player/create-player.component";

@NgModule({
    declarations: [
        AppComponent,
        ManagePlayersComponent,
        ManageStatusComponent,
        ListPlayersComponent,
        CreatePlayerComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
