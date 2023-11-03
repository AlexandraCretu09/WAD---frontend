import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent  } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch:'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'products-page', component: ProductsPageComponent},
  { path: 'cart', component: CartComponent},
  { path: 'login' ,component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
