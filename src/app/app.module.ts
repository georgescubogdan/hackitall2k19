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
import { IdentityService } from './identity/identity.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReceivedDonationFormComponent } from './received-donation-form/received-donation-form.component';
import { DonationConcludeComponent } from './donation-conclude/donation-conclude.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { QrDialogComponent } from './qr-dialog/qr-dialog.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const firebaseConfig = {
  apiKey: "AIzaSyDIE5_BmQL05UYC9kMWaMuB8PoU8IdQ_Xc",
  authDomain: "hackitall2k19.firebaseapp.com",
  databaseURL: "https://hackitall2k19.firebaseio.com",
  projectId: "hackitall2k19",
  storageBucket: "hackitall2k19.appspot.com",
  messagingSenderId: "789959980201"
}

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
    RecivedDonationsComponent,
    ReceivedDonationFormComponent,
    DonationConcludeComponent,
    MapComponent,
    QrDialogComponent,
    EditProfileComponent,
  ],
  entryComponents: [
    RequestFormComponent,
    DonationFormComponent,
    QrDialogComponent,
    ReceivedDonationFormComponent,
    EditProfileComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDIE5_BmQL05UYC9kMWaMuB8PoU8IdQ_Xc'
    }),
    NgxQRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    IdentityService,
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
