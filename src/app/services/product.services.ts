import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import Product from 'src/app/models/Product';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ){}


  listaProdutos = (): Observable<Product[]> => {
    return this.http.get<Product[]>('http://localhost:5000/produtos');
  };


  retornaProduto = (id: String) =>
  this.http.get<Product>(`http://localhost:5000/produtos/${id}`);



  adicionaProduto = (produto: Product) =>
    this.http.post('http://localhost:5000/produto', produto, {
      headers: this.tokenService.buildHeaders(),
    });


  atualizaProduto = (id: string, produto: Product) =>
    this.http.put(`http://localhost:5000/produtos/${id}`, produto, {
      headers: this.tokenService.buildHeaders(),
    });
  

  removerProduto = (product: Product) =>
  this.http.delete(`http://localhost:5000/produtos/${product._id}`, {
    headers: this.tokenService.buildHeaders(),
  })


  buscaProduto = (title: string): Observable<Product[]> =>
  this.http.get<Product[]>(`http://localhost:5000/filtro?title=${title}`, {
    headers: this.tokenService.buildHeaders(),
  });
}
