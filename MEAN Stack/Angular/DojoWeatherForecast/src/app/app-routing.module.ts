import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from "./city/city.component";

const routes: Routes = [
    { path: "", pathMatch: "full", component: CityComponent },
    { path: ":city_name", component: CityComponent },
    { path: "**", component: CityComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
