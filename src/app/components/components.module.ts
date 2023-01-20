import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from '../app-routing.module';

import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SumaryDetailsComponent } from './sumary-details/sumary-details.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsListComponent,
    UsersListComponent,
    SumaryDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule

  ],
  exports: [
    ProductCardComponent, 
    ProductsListComponent, 
    UsersListComponent,
    SumaryDetailsComponent,
  ]
})
export class ComponentsModule { }
