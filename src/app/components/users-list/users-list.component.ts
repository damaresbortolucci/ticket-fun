
import { Component, PipeTransform, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import User from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  encapsulation: ViewEncapsulation.None, // prop do modal
})
export class UsersListComponent {

  users: User[] = [];
  searchField: FormControl = new FormControl();
  hasError: boolean = false;
  closeResult: string="";
  
  @ViewChild('dialogTemplateUpdate') dialogTemplateUpdate?: TemplateRef<any>;
  @ViewChild('dialogTemplateDelete') dialogTemplateDelete?: TemplateRef<any>;


	constructor(
    private userService: UsersService, 
    private modalService: NgbModal) {
	}


  ngOnInit(): void {
    this.userService.listaUsuarios().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        this.hasError = true;
      },
    });


    this.searchField.valueChanges // Estou com a referência do observable de mudança
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // map
      // transformar um valor em outro
      // pega o valor do input e transforma -> fazer uma api e devolver o resultado
      switchMap((nome) => this.userService.buscaUsuario(nome))
    )
    .subscribe((usuarios) => (this.users = usuarios));
  }


  deleteUser(user: User){
    this.userService.removerUsuario(user._id).subscribe({
      next: (response) => {
        this.users = this.users.filter(
          (u) => u._id != user._id
        );
        this.modalService.dismissAll();
      },
      error: (err) => console.log(err)
    });
  }


  openDeleteModal(content: any) {
		this.modalService.open(content, { centered: true,  size: 'sm'});
	}


  search(text: string, pipe: PipeTransform): User[] {
    return this.users.filter((user) => {
      const term = text.toLowerCase();
      return (
        user.nome.toLowerCase().includes(term)
      );
    });
  }

}
