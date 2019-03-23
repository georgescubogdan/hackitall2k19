import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CameraViewComponent } from './camera/camera-view/camera-view.component';
import { LoginComponent } from './identity/login/login.component';
import { RegisterComponent } from './identity/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './utils/safe-url.pipe';
import { RequestFormComponent } from './request-form/request-form.component';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { SentDonationsComponent } from './sent-donations/sent-donations.component';
import { RecivedDonationsComponent } from './recived-donations/recived-donations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CameraViewComponent,
    LoginComponent,
    RegisterComponent,
    SafeUrlPipe,
    RequestFormComponent,
    DonationFormComponent,
    SentDonationsComponent,
    RecivedDonationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
