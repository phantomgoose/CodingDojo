import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPlayersComponent } from "./manage-players/list-players/list-players.component";
import { CreatePlayerComponent } from "./manage-players/create-player/create-player.component";
import { ManagePlayersComponent } from "./manage-players/manage-players.component";
import { ManageStatusComponent } from "./manage-status/manage-status.component";
const routes: Routes = [
    {
        path: "players",
        component: ManagePlayersComponent,
        children: [
            {
                path: "list",
                component: ListPlayersComponent
            },
            {
                path: "addplayer",
                component: CreatePlayerComponent
            }
        ]
    },
    {
        path: "status/game/:id",
        component: ManageStatusComponent
    },
    {
        path: "**",
        redirectTo: "players/list"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
