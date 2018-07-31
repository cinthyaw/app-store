import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _cart;

  
  constructor(private db:AngularFireDatabase) { 
  }

  products(): Observable<any> {
    return this.db.list('/products').valueChanges();
  }

  get cart() {
    return localStorage.cart ? JSON.parse(localStorage.cart) : [];
  }

  set cart(products) {
    localStorage.setItem('cart', JSON.stringify(products));
  }

}
