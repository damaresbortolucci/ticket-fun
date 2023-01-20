import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  token = localStorage.getItem("token") ?? '';

  buildHeaders = () =>
  new HttpHeaders().set('X-token', localStorage.getItem('token') ?? '');


  persistToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    this.token = localStorage.getItem("token") ?? '';
    return this.token;
  }
}
