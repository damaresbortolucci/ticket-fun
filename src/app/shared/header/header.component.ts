import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: string = "";
  role: string = "";
  items: any = 0;
  home: boolean = true;
  public isCollapsed: boolean;


  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ){
    this.isCollapsed = true;
  }


  ngOnInit(): void {
    this.cartService.getItemsCart().subscribe(
      (product) => {this.items = product.quantity}
    );

    let cart = JSON.parse(localStorage.getItem('cart') as string)
    this.items = cart.quantity;
  }


  userLog(): boolean{
    this.token = this.tokenService.getToken();
    return this.token == "";
  }

  
  logout(){
    this.tokenService.clearToken();
    this.authService.clearCredential();
    this.router.navigate(['/home']);
  }

  accessRole(): boolean{
    this.role = this.authService.getCredential();
    return this.role == 'cliente' || this.role == '';
  }
}