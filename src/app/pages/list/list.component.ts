import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public productList:Array<any>;

  public cartVisible: boolean;

  public adding: boolean;

  public itemAdded: string;
  public qtyAdded: number;

  constructor( private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productService.products().subscribe((r: Array<any>)=>{
      console.log(r);
     this.productList = r;
    });

    this.cartVisible = false;
    this.adding = false;
  }

  addProduct(product){
    let currentCart:Array<any> = this.productService.cart;
    let foundProduct = currentCart.find(p => {
      if (product.name == p.name) {
        return p;
      }
    })

    if (foundProduct) {
      foundProduct.qty++; 
      this.qtyAdded = foundProduct.qty;
    }
    else {
      product.qty = 1;
      currentCart.push(product);
      this.qtyAdded = product.qty;
    }

    this.productService.cart = currentCart;
    this.adding = false;
    this.adding = true;
    this.itemAdded = product.name;

    setTimeout(() => {
      this.adding = false;
    }, 2000 )

  }

  viewCart() {
   this.router.navigate(['/cart']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
