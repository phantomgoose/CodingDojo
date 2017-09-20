import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductService } from "./product.service";
@NgModule({
  declarations: [
    AppComponent,
    ProductsHomeComponent,
    ProductsListComponent,
    ProductsEditComponent,
    ProductsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
