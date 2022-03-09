import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;
  product!: Product;
  productId = 0;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { 
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      Price: ['', [Validators.required]],
    })
  }


  ngOnInit(): void {
    this.productService.getProductValues$().subscribe(data =>{
     
      this.product = data;
      this.form.patchValue({
        ProductId: this.product.ProductId,
        Name: this.product.Name,
        Quantity: this.product.Quantity,
        Price: this.product.Price
      });
      this.productId = this.product.ProductId;
    });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  
  SaveProduct() {
    console.log(this.productId);
    if(this.productId == 0 || this.productId === undefined){
      this.createProduct();
    }
    else{
      this.updateProduct();
    } 
    
  }

  createProduct(){
    const product: Product = {
      ProductId: 0,
      Name: this.form.get('Name')?.value,
      Quantity: this.form.get('Quantity')?.value,
      Price: this.form.get('Price')?.value,
    }
    this.productService.saveProductService(product).subscribe(data =>{
      console.log('Success!');
      this.productService.getProductList();
      this.form.reset();
    });
  }
  updateProduct(){
    const product: Product = {
      ProductId: this.productId,
      Name: this.form.get('Name')?.value,
      Quantity: this.form.get('Quantity')?.value,
      Price: this.form.get('Price')?.value,
    }
    this.productService.updateProductService(product).subscribe(data =>{
      console.log('update Success!');
      this.productService.getProductList();
      this.form.reset();
      this.productId = 0;
    });
  }
 
}
