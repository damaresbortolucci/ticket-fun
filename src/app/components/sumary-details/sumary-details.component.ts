import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { Component, Input } from '@angular/core';
import Product from 'src/app/models/Product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sumary-details',
  templateUrl: './sumary-details.component.html',
  styleUrls: ['./sumary-details.component.css']
})
export class SumaryDetailsComponent{

  @Input() products?: Product[];
  @Input() subTotal?:any;
  cartEmpty: boolean = true
  logged: boolean=false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private modalService: NgbModal,
    private cartService: CartService
  ){}


  checkLogin = () => {
    if(this.tokenService.getToken() == '')
      this.router.navigate(['/login'])
  }

  openDeleteModal(content: any) {
		this.modalService.open(content, { centered: true,  size: 'sm'});
	}

  deleteProduct(){
    this.cartService.clearCart();
    this.router.navigate(['/home']);
    this.modalService.dismissAll();
  }
}
