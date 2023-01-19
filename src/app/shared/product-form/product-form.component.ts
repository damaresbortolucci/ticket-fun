import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.services';
import Product from 'src/app/models/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  
  id: string = "";
  @Input() requestType: string = "post";

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private route: Router, // para mudar rota
    private activatedRoute: ActivatedRoute, //recuperar o caminho da rota para leitura
  ) {}
  
  productForm = this.formBuilder.group({
    image: '',
    title: '',
    description: '',
    price: 0,
    quantity: 1,
    stock: 0
  });

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];  

    if (this.id) {
      this.requestType = "put";
      this.productService.retornaProduto(this.id).subscribe({
        next: (produto) => {
          this.productForm.patchValue({
            image: produto.image,
            title: produto.title,
            description: produto.description,
            price: produto.price,
            stock: produto.stock
          })
        },
        error: (error) => console.error(error)
      })
    }
  }
  
  onSubmit() {
    const product = new Product(
      this.productForm.value.image ?? '',
      this.productForm.value.title?.toLowerCase() ?? '',
      this.productForm.value.description ?? '',
      this.productForm.value.price ?? 0,
      this.productForm.value.quantity ?? 1,
      this.productForm.value.stock ?? 0,
      ''
    );
      
  if (this.id) {
      product._id = this.id;
      this.productService.atualizaProduto(product._id, product).subscribe({
        next: (retorno) => this.route.navigate(["/produtos"])
      });
    } else {    
      this.productService.adicionaProduto(product).subscribe({       
        next: (retorno) => this.route.navigate(['/produtos'])
      });
    }
  }
}
