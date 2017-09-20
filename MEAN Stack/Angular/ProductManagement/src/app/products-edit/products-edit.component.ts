import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { Product } from "../product.class";
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['../templates/style.css']
})
export class ProductsEditComponent implements OnInit {
  product: Product;
  id: any;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.product = this._productService.getProductByID(params.id);
      this.id = params.id;
      console.log(this.product);
    })
  }

  onSubmit(e: Event, form: NgForm) {
    this._productService.update(this.id, this.product);
    this._router.navigate(['products']);
  }
}
