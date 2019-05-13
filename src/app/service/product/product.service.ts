import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http';
import { Product } from '../../bean/product';
import { OrderCart } from '../../bean/orderCart';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }


  /**
   *
   * Get details of product based on productID
   *
   * @param productId
   */
  getProductById(productId: string) {

     return this.http.get('http://localhost:8080/products/getProductByID/' + productId)
              .map((response: Response) => response)
              .catch(this.handleError);
  }



  /**
   * This is service call to fetch the list of all product categories
   *
   */
  listAllCategories() {

    return this.http.get('http://localhost:8080/products/categories')
                    .map((response: Response) => response)
                    .catch(this.handleError);
   }





   /**
    *
    * This is service call to validate the url entered for prouduct in input fiels by user.
    * It call Rest API to validate whether image exists or not.
    * This method is being called from validator.
    *
    */

   testProductImageUrl(url: string): Observable<Blob>{

    console.log(url);
    url = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/1c3b1d29-8521-4907-91db-b94d4dc77cd9/dbig4a2-00a3e130-27ac-4073-b0fd-a859e0ae66c9.jpg/v1/fill/w_1024,h_739,q_70,strp/bonne_fete_la_suisse___happy_swiss_national_day_by_leptitsuisse1912_dbig4a2-fullview.jpg';

      return this.http.get(url, {responseType: 'blob'})
      .map((res: any) => res.blob())
      .catch(this.handleError);
   }





   /**
    *
    * This is service call to validate uniqness of product name in the selected category.
    * This method is being called from validator.
    *
    * @param productInfo
    *
    *
    */
   uniqueProductName(productInfo) {

       return this.http.post('http://localhost:8080/products/validateProductName', JSON.stringify(productInfo))
                       .map(response => response)
                       .catch(this.handleError);
   }



   /**
    *
    * This is service call to save new product in selected category.
    *
    * @param product
    */

   saveProduct(product) {

      return this.http.post('http://localhost:8080/products/save', JSON.stringify(product))
                 .map((response: Response) => response)
                 .catch(this.handleError);
   }




   /**
    * This is service call to fetch list of all product per category saved in DB.
    */

   fetchProductList() {

        return this.http.get('http://localhost:8080/products/fetchAllProduct')
                        .map((response: Response) => response)
                        .catch(this.handleError);
   }


   /**
    * This method save the updated values of Product.
    * @param error
    */
   updateProductDetails(product: Product) {

       return this.http.put('http://localhost:8080/products/updateProductDetails', JSON.stringify(product))
                       .map((response: Response) => response)
                       .catch(this.handleError);
   }


   /**
    * This method will delete prod record from server and return new records to page
    * @param error
    */
   deleteProductRecord(obj: Product) {

       return this.http.delete('http://localhost:8080/products/delete/' + obj.id)
                       .map((response: Response) => response)
                       .catch(this.handleError);

   }


   /**
    * This method save the order placed by user in DB
    *
    */
   submitOrder(orderCart) {

     return this.http.post('http://localhost:8080/products/saveOrder', orderCart)
              .map((response: Response) => response)
              .catch(this.handleError);
   }


  /**
   *
   * Generic method to handle error received during service call.
   *
   * @param error
   */
  private handleError(error: Response) {

      if (error.status === 400)
        return Observable.throw('new BadInput(error.json())');

      if (error.status === 404)
        return Observable.throw('new BadInput(error.json())');

      return Observable.throw('new BadInput(error.json())');
  }
}
