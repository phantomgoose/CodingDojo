import { Injectable } from '@angular/core';
import { Product } from "./product.class";
@Injectable()
export class ProductService {

  private _products: Array<Product> = [];

  constructor() { }

  create(title: string, price: any, image_url: string) {
    this._products.push(new Product(title, price, image_url));
  }

  delete(idx: any) {
    this._products.splice(idx, 1);
  }

  get products() {
    return this._products;
  }

  getProductByID(idx: any) {
    return this._products[idx];
  }

  update(idx: any, product: Product) {
    this._products[idx] = product;
  }
}
