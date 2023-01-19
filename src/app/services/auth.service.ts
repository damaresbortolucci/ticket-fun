import { TokenService } from './token.service';
import { UsersService } from './users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role = localStorage.getItem("role") ?? '';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private tokenService: TokenService
  ) {}


  validaLogin = (token: string) =>
    this.http.post(
      'http://localhost:5000/valida',
      { token },
      {
        headers: this.tokenService.buildHeaders(),
        observe: 'response',
      }
  );


  login = (email: string, senha: string) =>
    this.http.post('http://localhost:5000/login', { email, senha });


  canActivate(route: ActivatedRouteSnapshot) {

    if (!this.tokenService.token) {
      this.router.navigate(["/login"]);
    }

    this.validaLogin(this.tokenService.token).subscribe((retorno) => {
      /* console.log(route.url[0].toString()); */

      if (
        route.url[0].path.includes('usuarios') &&
        (retorno as any).body.role != 'administrador'
      ) {
        console.log("Sem permissão de administrador");
        this.router.navigate(['/home']);
      }

      if (
        route.url[0].path.includes('produtos') &&
        (retorno as any).body.role != 'administrador' &&
        (retorno as any).body.role != 'vendedor'
      ) {
        console.log("Sem permissão de administrador ou vendedor");
        this.router.navigate(['/home']);
      }
    })
  }

  
  persistCredential(role: string) {
    localStorage.setItem('role', role);
    this.role = role;
  }

  getCredential(): string {
    this.role = localStorage.getItem("role") ?? '';
    return this.role;
  }

  clearCredential(){
    localStorage.clear();
  }
}