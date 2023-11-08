import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { InterpretationComponent } from './components/interpretation/interpretation.component';
import { LanguageTrainingComponent } from './components/language-training/language-training.component';
import { ContentCreationComponent } from './components/content-creation/content-creation.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PolicyComponent } from './components/policy/policy.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch:'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'products-page', component: ProductsPageComponent},
  { path: 'login' ,component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'product/:type', component: ProductComponent },
  { path: 'interpretation', component : InterpretationComponent},
  { path: 'languageTraining', component : LanguageTrainingComponent},
  { path: 'contentCreation', component : ContentCreationComponent },
  { path: 'aboutUs', component : AboutUsComponent},
  { path: 'policy', component : PolicyComponent},
  { path: 'myAccount', component: MyAccountComponent },
  { path: 'adminPage', component: AdminPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
