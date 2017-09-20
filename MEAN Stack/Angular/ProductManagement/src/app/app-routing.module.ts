import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsHomeComponent } from "./products-home/products-home.component";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductsEditComponent } from "./products-edit/products-edit.component";
import { ProductsAddComponent } from "./products-add/products-add.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductsHomeComponent },
  { path: 'products', pathMatch: 'full', component: ProductsListComponent },
  { path: 'products/edit/:id', pathMatch: 'full', component: ProductsEditComponent },
  { path: 'products/new', pathMatch: 'full', component: ProductsAddComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
