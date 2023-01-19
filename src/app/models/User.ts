export default class User {
  nome: string='';
  email: string='';
  senha: string='';
  role: string='';
  _id: string='';

  constructor(nome: string, email: string, senha: string, role: string, id: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = role;
    this._id = id;
  }
}
