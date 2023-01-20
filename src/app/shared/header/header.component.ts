import { RoleService } from './../../services/role.service';
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
  role?: any = '';
  items: any = 0;
  public isCollapsed: boolean;


  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private roleService: RoleService
  ){
    this.isCollapsed = true;
  }


  ngOnInit(): void {
   
    let cart = JSON.parse(localStorage.getItem('cart') as string)
    if(cart!=null)
      this.items = cart.quantity;

    this.cartService.getItemsCart().subscribe(
      (product) => {this.items = product.quantity}
    );
  }


  userLog(): boolean{
    this.token = this.tokenService.getToken();
    return this.token == "";
  }

  
  logout(){
    this.authService.clearSession();
    this.router.navigate(['/home']);
  }

  accessRole(): boolean{
    this.role = this.authService.getUser();       
    return this.role?.role == 'cliente' || this.role?.role == null;
  }
}