import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	//api URL (change if it´s necesary)
appUrl = 'https://localhost:44361/';
apiUrl = 'api/products/';

  constructor(private http: HttpClient) { }
  productsList: Product[] = [];
  private updateProductForm = new BehaviorSubject<Product>({} as any);

  saveProductService(product: Product): Observable<Product>{
    return this.http.post<Product>(this.appUrl + this.apiUrl, product);

  }

  getProductList() {
    this.http.get(this.appUrl + this.apiUrl).toPromise()
    .then(data => {
      this.productsList = data as Product[];
    })
  }

  deleteProductService(id: number): Observable<Product>{
    return this.http.delete<Product>(this.appUrl + this.apiUrl + id);

  }

  updateProductFormData(product: Product) {
    this.updateProductForm.next(product);
  }
  getProductValues$(): Observable<Product>{
    return this.updateProductForm.asObservable();
  }

  updateProductService(product: Product): Observable<Product>{
    return this.http.put<Product>(this.appUrl + this.apiUrl, product);
  }
}
