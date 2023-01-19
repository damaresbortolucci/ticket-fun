import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {


  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) {}

  adicionaUsuario = (usuario: User) =>
    this.http.post('http://localhost:5000/signup', usuario);


  listaUsuarios = (): Observable<User[]> => {
    return this.http.get<User[]>('http://localhost:5000/usuarios', {
      headers: this.tokenService.buildHeaders(),
    });
  };
  
  retornaUsuario = (id: String) =>
    this.http.get<User>(`http://localhost:5000/usuarios/${id}`,{
      headers: this.tokenService.buildHeaders()
    });
  
  atualizaUsuario = (usuario: User) =>
    this.http.put(`http://localhost:5000/usuarios/${usuario._id}`, usuario, {
      headers: this.tokenService.buildHeaders()
    });
  
  removerUsuario = (id: string) =>
    this.http.delete(`http://localhost:5000/usuarios/${id}`, {
      headers: this.tokenService.buildHeaders()
    });

  buscaUsuario = (nome: string): Observable<User[]> =>
  this.http.get<User[]>(`http://localhost:5000/busca?nome=${nome}`, {
    headers: this.tokenService.buildHeaders()
  });  
}
