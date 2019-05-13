/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import {RouterTestingModule} from '@angular/router/testing';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

describe('TodosComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //declarations: [ AppComponent,BsNavbarComponent],
      declarations: [ AppComponent],
      imports:[RouterTestingModule.withRoutes([])],
      schemas : [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));  
    expect(de).not.toBeNull();  
   });
});