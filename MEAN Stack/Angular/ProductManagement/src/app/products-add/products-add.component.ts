import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['../templates/style.css']
})
export class ProductsAddComponent implements OnInit {
  product = {
    title: '',
    price: 0,
    image_url: ''
  }

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit(e: Event, form: NgForm) {
    let title = form.controls.title.value;
    let price = form.controls.price.value;
    let image_url = form.controls.image_url.value;
    this._productService.create(title, price, image_url);
    this._router.navigate(['products']);
  }

}
