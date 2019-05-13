import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import { Product } from '../../bean/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList: Product[];
  filteredproductList: Product[];
  serverError = false;
  dataTableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {

        this.serverError = false;
        this.productService.fetchProductList().subscribe((obj: Product[]) => {

          if (obj.length > 0) {
            this.filteredproductList = this.productList = obj;
            this.initializesTabel(obj);
          }else{
             this.serverError = true;
          }
        });
  }

  private initializesTabel(products: Product[]) {

    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({offset: 0}).then(items => this.items = items);
    this.dataTableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params){

    if (!this.dataTableResource) return;

    this.dataTableResource.query(params).then(items => this.items = items);
  }

  deleteProduct(obj: Product) {

    this.productService.deleteProductRecord(obj).subscribe((obj: Product[]) => {

      if (obj.length > 0) {
        this.filteredproductList = this.productList = obj;
      }else{
         this.serverError = true;
      }
    });
  }

  filter(query: String) {

     this.filteredproductList = (query) ?
                                this.productList.filter((product: Product) => product.title.toLowerCase().includes(query.toLowerCase()))
                                : this.productList;
     this.initializesTabel(this.filteredproductList);
  }
}
