import { TokenService } from './token.service';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role:any;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private tokenService: TokenService,
    ) {   
      if(localStorage.getItem("user") != null)
        this.role = JSON.parse(localStorage.getItem("user")as string)
    }


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

  
  persistUser(role: any) {
    localStorage.setItem('user', JSON.stringify(role));
    this.role = role;
  }

  getUser() {
    this.role = JSON.parse(localStorage.getItem("user") as string);
    return this.role;
  }

  clearSession(){
    localStorage.clear();
  }
}