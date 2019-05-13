import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductValidator } from '../validators/product.validator';
import { Product } from '../bean/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  //,ProductValidator.validateProductName(this.productService)

  categories: any[];
  productId: any;
  savedSuccesfully = false;
  invalidProductID = false;
  product = new FormGroup({
    id : new FormControl(''),
    title : new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price : new FormControl('', [Validators.required, Validators.maxLength(10)]),
    category : new FormControl('', [Validators.required]),
    imageUrl : new FormControl('', [Validators.required], ProductValidator.validateUrl(this.productService))
  });

  constructor(private productService: ProductService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this.savedSuccesfully = false;
    this.invalidProductID = false;
    this.productService.listAllCategories().subscribe( obj => {
      this.categories = obj;
    });

    this.productId = this.activateRoute.snapshot.paramMap.get('id');

    this.productService.getProductById(this.productId).subscribe((obj: Product) => {

       if (obj.id) {
        this.product.setValue(obj);
       }else{
        this.invalidProductID = true;
        this.product.disable();
        this.product.setErrors({'invalid_product': 'Product does not exists !!'});
       }
    });
  }

  updateProduct() {

    this.productService.updateProductDetails(this.product.value).subscribe((obj: Product) => {

      if (obj.id) {
        this.savedSuccesfully = true;
      }else {

        this.product.setErrors({'server_error': 'Error Occured while performing request. !!'});
      }
    });
  }


}
