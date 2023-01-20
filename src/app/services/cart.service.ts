import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import  Product  from 'src/app/models/Product';
import Cart from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartLocalStorage:Product[] = [];
  cart:any;
  cartObservable = new Subject<any>();

  constructor() {}


  getItemsCart(): Observable<any>{
    return this.cartObservable.asObservable();
  }


  addProductCart = (product: Product) =>{
    if(localStorage.getItem('cart') === null){
      this.cartLocalStorage.push(product)
    }
    else{ 
      var id = product._id
      let index:number = -1;
      this.cart = JSON.parse(localStorage.getItem('cart') as string);
      this.cartLocalStorage = this.cart.product
      
      //refatorar
      for(let i=0; i<this.cartLocalStorage.length; i++){
        if(id == this.cartLocalStorage[i]._id){
          this.cartLocalStorage[i].quantity =  product.quantity;
            index = i;
            break;
        }
      }

      if(index == -1)
        this.cartLocalStorage.push(product) 
    }
    this.updateCart(this.cartLocalStorage)
  }


  updateCart(products: Product[]){
    let totalItems: number = 0    
    products.map((product:Product) => totalItems += product.quantity);

    let total: number = 0; 
    products.map( p => total += (p.quantity*p.price))

    let newCart = new Cart(products, totalItems, total);

    localStorage.setItem('cart', JSON.stringify(newCart));

    this.cartObservable.next(JSON.parse(localStorage.getItem('cart') as string)); 
  }


  deleteProductCart(product: Product){
    this.cart = JSON.parse(localStorage.getItem('cart') as string);
    let newCart = this.cart.product.filter((prod:any) => prod._id !==  product._id);

    this.updateCart(newCart)
  }

  clearCart(){
    localStorage.removeItem('cart');
  }
}