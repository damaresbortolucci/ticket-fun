import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FooterComponent } from './footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HeaderComponent, 
    ProductFormComponent,
    FooterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent
  ],
})
export class SharedModule {}
