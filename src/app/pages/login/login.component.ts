import { TokenService } from './../../services/token.service';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hasError: boolean = false;
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private route: Router
  ) {}


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  loginForm = this.formBuilder.group({
    email: '',
    senha: '',
  });

  
  onSubmit() {
    this.authService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
    ).subscribe({
      next: (retorno) => {
        this.tokenService.persistToken((retorno as any).accessToken);
        this.authService.persistUser((retorno as any));
        this.route.navigate(["/home"]);
      },
      error: (error) => {
        this.hasError = true;
      }
    })
  }
}
