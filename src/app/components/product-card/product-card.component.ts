import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from '../../services/product.services';
import Product from 'src/app/models/Product';
import User from 'src/app/models/User';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  products: Product[] = [];
  hasError: boolean = false;
  user?: any;

  value: number =1;

  constructor(   
    private productService: ProductService, 
    private authService: AuthService,
    private cartService: CartService
  ) {}


  ngOnInit(): void {
    this.productService.listaProdutos().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        this.hasError = true;
      },
    });
  }


  addToCart(product: Product){
    this.cartService.addProductCart(product);
  }


  addItem(product: Product):void{
    if(product.quantity == product.stock)
        product.quantity = product.stock;
    else
      product.quantity++;
  }

  removeItem(product: Product):void{
    if(product.quantity==1)
      product.quantity = 1;
    else
      product.quantity--;
  }

  
  accessRole(): boolean{
    this.user = this.authService.getUser();
    return this.user?.role == 'cliente' || this.user?.role == null;
  }
}