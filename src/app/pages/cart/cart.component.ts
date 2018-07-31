import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public currentItems: Array<any>;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {

    this.currentItems = this.productService.cart;

  }

  removeProduct(product) {
    let currentProducts:Array<any> = this.productService.cart;
    let productIndex = currentProducts.findIndex( p => {
      return p.name == product.name;
    } )
    currentProducts.splice(productIndex, 1 );
    this.productService.cart = currentProducts;
    
    this.currentItems = this.productService.cart;
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
