import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductValidator } from '../../validators/product.validator';
import { Router } from '@angular/router';
import { Product } from '../../bean/product';
import { Categories } from '../../bean/categories';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: Categories[];
  imageSrc: string ;
  product = new FormGroup({
    id : new FormControl(''),
    title : new FormControl('', [Validators.required, Validators.maxLength(30)]),
    price : new FormControl('', [Validators.required, Validators.maxLength(10)]),
    category : new FormControl('', [Validators.required], ProductValidator.validateProductName(this.productService)),
    imageUrl : new FormControl('', [Validators.required], ProductValidator.validateUrl(this.productService))
  });

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {

    this.productService.listAllCategories().subscribe((obj: Categories[]) => {

      if (obj.length > 0) {
        this.categories = obj;
      }else{
        this.product.setErrors({'server_error': 'Error Occured while performing request. !!'});
        this.product.disable();
      }
    });
  }

  loadImage(imageSrc: HTMLInputElement) {
    this.imageSrc = imageSrc.value;
  }

  addProduct() {

    this.productService.saveProduct(this.product.value).subscribe((responseObj: Product) => {

         if (responseObj.title) {
           this.router.navigate(['/admin/products']);
         }else{
          this.product.setErrors({'server_error': 'Error Occured while performing request. !!'});
         }
    });
  }
}
