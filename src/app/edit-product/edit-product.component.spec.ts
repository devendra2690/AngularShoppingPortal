import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';

describe('EditProductComponent', () => {

    let editComponent : EditProductComponent;

    beforeEach(() =>{

        editComponent = new EditProductComponent(null,null);
    });

    it("should have 5 element in product form",()=>{

        expect(editComponent.product.get("title")).toBeDefined(); 
        expect(editComponent.product.get("id")).toBeDefined(); 
        expect(editComponent.product.get("price")).toBeDefined(); 
        expect(editComponent.product.get("category")).toBeDefined(); 
        expect(editComponent.product.get("imageUrl")).toBeDefined(); 
    });

    it("should have 4 required field in form",()=>{

        let productForm = editComponent.product;

        productForm.get("title").setValue('');
        productForm.get("price").setValue('');
        productForm.get("category").setValue('');
        productForm.get("imageUrl").setValue('');

        expect(editComponent.product.valid).toBeFalsy();
        expect(editComponent.product.get("title").errors).not.toBeNull();
        expect(editComponent.product.get("price").errors).not.toBeNull();
        expect(editComponent.product.get("category").errors).not.toBeNull();
        expect(editComponent.product.get("imageUrl").errors).not.toBeNull();
    });
});
