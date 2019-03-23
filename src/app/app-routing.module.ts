import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './identity/login/login.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RecivedDonationsComponent } from './recived-donations/recived-donations.component';
import { SentDonationsComponent } from './sent-donations/sent-donations.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { RegisterComponent } from './identity/register/register.component';
import { DonationConcludeComponent } from './donation-conclude/donation-conclude.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'donate',
    component: DonationFormComponent
  },
  {
    path: 'test',
    component: DonationConcludeComponent
  },
  {
    path: 'testmap',
    component: MapComponent
  },
  { path: 'received-donations', component: RecivedDonationsComponent },
  { path: 'profile', component: SentDonationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
