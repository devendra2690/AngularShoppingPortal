import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../service/product/product.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductValidator {


  /**
   *
   * This is validator to validate url entered by user in imageurl field.
   * It validate url and also validate if url exits on that provided url or not.
   *
   * @param productService
   */
  static validateUrl(productService: ProductService) {

         return (control: AbstractControl) => {

            return new Promise((resolve, reject) => {

                const url: string = control.value;

               // url = "https://as2.ftcdn.net/jpg/00/76/06/91/500_F_76069130_b2gDMFvrxmyUvXi608WdACdfeDlV9oXa.jpg";
                if (url.startsWith('http://') || url.startsWith('https://')) {

                    // productService.testProductImageUrl(url).map(obj =>{
                    //     console.log(obj);
                    //     resolve({invalidImageURl:true});
                    // });
                    resolve(null);
                }else{

                    resolve({invalidImageURl: true});
                }

            });
         };
   }


   /**
    *
    * This is a ascync validator for product name.
    * It check if product name is already exits for selected category.
    * It passes product name and category to server and check if product name is unique or not.
    *
    * @param productService
    *
    */

  static validateProductName(productService: ProductService) {

        return (control: AbstractControl) => {

            return new Promise((resolve, reject) => {

                const formGroup: FormGroup | FormArray = control.parent;

                const product = {

                   'title' : formGroup.controls['title'].value,
                   'category' : formGroup.controls['category'].value
                };

                productService.uniqueProductName(product).subscribe( obj => {

                    obj.title ? resolve({shouldBeUniqueName: true}) : resolve(null);
                });

            });
        };
   }

}
