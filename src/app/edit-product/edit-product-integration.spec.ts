import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ProductService } from '../service/product/product.service';
import { Observable } from 'rxjs/Observable';

describe('EditProductComponent', () => {

    let editComponent : EditProductComponent;
    let editProductService : ProductService;

    beforeEach(() =>{

        editProductService = new ProductService(null);
        editComponent = new EditProductComponent(editProductService,null);
    });

    it("should update product details if product details found",() =>{

        spyOn(editProductService,'updateProductDetails').and.callFake(product =>{
            return Observable.from([{id:1,productName:"Fruits"}]);
;        });

         editComponent.updateProduct();

         expect(editComponent.savedSuccesfully).toBeTruthy();
    });

    it("should throw error if product details not found to update product details",() =>{

        spyOn(editProductService,'updateProductDetails').and.callFake(product =>{
            return Observable.from([{}]);
;        });

         editComponent.updateProduct();

         expect(editComponent.savedSuccesfully).toBeFalsy();
         expect(editComponent.product.errors).not.toBeNull();
    });
    
});
