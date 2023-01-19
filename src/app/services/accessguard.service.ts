import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccessguardService implements CanActivate{

  constructor(private tokenService: TokenService) { }

  role: string = "";

  canActivate(route: ActivatedRouteSnapshot) {
    this.role = this.tokenService.getToken();
    return  this.role == "administrador";
  }

}