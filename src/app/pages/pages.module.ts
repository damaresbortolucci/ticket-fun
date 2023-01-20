import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UsersComponent } from './users/users.component';
import { ComponentsModule } from '../components/components.module';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    ProductsComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule,
    ComponentsModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbTypeaheadModule,
    AppRoutingModule,
  ],
  exports: []
})
export class PagesModule {}
