import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpModule } from "@angular/http";
import { PlayerService } from "./services/player.service";
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
        CreatePlayerComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule],
    providers: [PlayerService],
    bootstrap: [AppComponent]
})
export class AppModule {}
