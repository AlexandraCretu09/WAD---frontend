import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
//import { AboutComponent } from './about/about.component';
//import { FaqComponent } from './faq/faq.component';
//import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'faq', component: FaqComponent },
  //{ path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
