import { Component, PipeTransform, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from 'src/app/services/product.services';
import Product from 'src/app/models/Product';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  encapsulation: ViewEncapsulation.None, // prop do modal
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  searchField: FormControl = new FormControl();
  hasError: boolean = false;
  closeResult: string="";
  
  @ViewChild('dialogTemplateUpdate') dialogTemplateUpdate?: TemplateRef<any>;
  @ViewChild('dialogTemplateDelete') dialogTemplateDelete?: TemplateRef<any>;


	constructor(
    private productService: ProductService, 
    private modalService: NgbModal) {
	}


  ngOnInit(): void {
    this.productService.listaProdutos().subscribe({
      next: (response) => {
        this.products = response;
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
      switchMap((pesquisa) => this.productService.buscaProduto(pesquisa))
    )
    .subscribe((produtos) => (this.products = produtos));
  }


  deleteProduct(product: Product){
    this.productService.removerProduto(product).subscribe({
      next: (response) => {
        this.products = this.products.filter(
          (prod) => prod._id != product._id
        );
        this.modalService.dismissAll();
      },
      error: (err) => console.log(err)
    });
  }


  openDeleteModal(content: any) {
		this.modalService.open(content, { centered: true,  size: 'sm'});
	}


  search(text: string, pipe: PipeTransform): Product[] {
    return this.products.filter((product) => {
      const term = text.toLowerCase();
      return (
        product.title.toLowerCase().includes(term)
      );
    });
  }
}
