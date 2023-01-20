import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsCart:Product[]=[];
  subTotal: any = 0;

  constructor(
    private cartService: CartService,
  ){}

  ngOnInit(): void {
    let cart = JSON.parse(localStorage.getItem('cart') as string)
    if(cart!=null){
      this.productsCart = cart.product;
      this.subTotal = cart.valueTotal;
    }
 
    this.cartService.getItemsCart().subscribe(
      (product) => {
        this.productsCart = product.product
      }
    );

    this.cartService.getItemsCart().subscribe(
      (product) => {
        this.subTotal = product.valueTotal
      }
    );
  }


  addItem(product: Product):void{
    if(product.quantity == product.stock)
        product.quantity = product.stock;
    else
      product.quantity++;

    this.cartService.addProductCart(product)
  }

  removeItem(product: Product):void{
    if(product.quantity==1)
      product.quantity = 1;
    else
      product.quantity--;

    this.cartService.addProductCart(product)
  }


  deleteProduct = (product: Product) => {
    this.cartService.deleteProductCart(product)
  }
}
