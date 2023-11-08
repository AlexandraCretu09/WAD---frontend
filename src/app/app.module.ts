import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InterpretationComponent } from './components/interpretation/interpretation.component';
import { LanguageTrainingComponent } from './components/language-training/language-training.component';
import { ContentCreationComponent } from './components/content-creation/content-creation.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PolicyComponent } from './components/policy/policy.component';
import { ScrollToTheTopDirective } from './directives/scroll-to-the-top.directive';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ProductsPageComponent,
    LoginComponent,
    HomepageComponent,
    SignupComponent,
    InterpretationComponent,
    LanguageTrainingComponent,
    ContentCreationComponent,
    AboutUsComponent,
    PolicyComponent,
    ScrollToTheTopDirective,
    MyAccountComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
