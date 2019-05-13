import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditProductComponent} from './edit-product.component';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpModule,HttpClientModule],
      declarations: [ EditProductComponent ],
      providers:[ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
             snapshot: {                 
              paramMap: {
                        get: (id) => {
                          return 10;
                        }
              }
             }
          },
      },
      
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
  });

  it('update product details if product found -- Using Testing Bed Test case', () => {
     
    let service = TestBed.get(ProductService);

    spyOn(service,'updateProductDetails').and.callFake(obj =>{

        return Observable.from([{id:2}]);
    });

    fixture.detectChanges();
    component.updateProduct();

    expect(component.savedSuccesfully).toBeTruthy();
  });

  it('should throw error if product details not found -- Using Testing Bed Test case', () => {
     
    let service = TestBed.get(ProductService);

    spyOn(service,'updateProductDetails').and.callFake(obj =>{

        return Observable.from([{}]);
    });

    fixture.detectChanges();
    component.updateProduct();

    expect(component.savedSuccesfully).toBeFalsy();
  });


  it("should fetch list of product and product details by id",() =>{

    let service = TestBed.get(ProductService);

    spyOn(service,'listAllCategories').and.callFake(()=>{

       return Observable.from([[{id:1},{id:2},{id:3}]]);
    });

    spyOn(service,"getProductById").and.callFake(productId =>{

         return Observable.from([{id:1,title:"Fruits",price:2,category:"fruits",imageUrl:"http://google.com"}]);       
    });

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.categories).not.toBeNull();
    expect(component.categories.length).toBe(3);
    expect(component.product.get('category').value).toEqual("fruits");
    expect(component.invalidProductID).toBeFalsy();
  });



  it("should fetch list of product and throw error if product details by id not found",() =>{

    let service = TestBed.get(ProductService);

    spyOn(service,'listAllCategories').and.callFake(()=>{

       return Observable.from([[{id:1},{id:2},{id:3}]]);
    });

    spyOn(service,"getProductById").and.callFake(productId =>{

         return Observable.from([{}]);       
    });

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.categories).not.toBeNull();
    expect(component.categories.length).toBe(3);
    expect(component.invalidProductID).toBeTruthy();
    expect(component.product.errors).not.toBeNull(); 
  });
});