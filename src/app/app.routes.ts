import { Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { FictivoComponent } from './page/fictivo/fictivo.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'fictivo', component: FictivoComponent },
  { path: '**', redirectTo: '' },
];
