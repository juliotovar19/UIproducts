import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList();
  }

deleteProduct(id: number){
  //console.log('id: ' + id)
  if(confirm('Are you sure you want to delete thi item?')){
    this.productService.deleteProductService(id).subscribe(data =>{
      console.log('Deleted')
      this.productService.getProductList();
    });
  }
}
editProduct(product: Product){
  this.productService.updateProductFormData(product);
}

}
