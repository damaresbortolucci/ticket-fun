import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';


const routes: Routes = [
  { path:"home", component: ProductCardComponent},

  { path:"produtos", component: ProductsComponent, 
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: ProductsListComponent,
        canActivate: [AuthService],
      },
      {
        path: 'editar/:id',
        component: ProductFormComponent,
        canActivate: [AuthService],
      }
  ]},

  { path:"cadastro", component: ProductFormComponent},

  { path:"usuarios", component: UsersComponent, 
    canActivate: [AuthService],
    children: [
    {
      path: '',
      component: UsersListComponent,
      canActivate: [AuthService],
    },
    {
      path: 'editar/:id',
      component: RegisterComponent,
      canActivate: [AuthService],
    }
  ]},

  { path:"login", component: LoginComponent},
  { path:"registro", component: RegisterComponent },

  { path:"cart", component: CartComponent},

  { path:"", redirectTo: "home", pathMatch: "full" },
  { path:"**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }