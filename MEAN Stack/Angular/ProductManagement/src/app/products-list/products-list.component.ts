import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../product.class";
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['../templates/style.css']
})
export class ProductsListComponent implements OnInit {
  products: Array<Product>;

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
    this.products = this._productService.products;
  }

  onEdit(idx: string) {
    this._router.navigate(['products/edit', idx]);
  }

  onDelete(idx: number) {
    this._productService.delete(idx);
  }

}
