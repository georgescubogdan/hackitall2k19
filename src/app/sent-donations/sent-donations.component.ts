import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { MatBottomSheet } from '@angular/material';
import { DonationFormComponent } from '../donation-form/donation-form.component';
import { IdentityService } from '../identity/identity.service';
import { User } from '../identity/user';
import { Router } from '@angular/router';
import { RegisterComponent } from '../identity/register/register.component';
import { DataService } from '../utils/data.service';
import { DonationRequest } from '../models/donation-request';
import { RequestFormComponent } from '../request-form/request-form.component';
import { ReceivedDonationFormComponent } from '../received-donation-form/received-donation-form.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-sent-donations',
  templateUrl: './sent-donations.component.html',
  styleUrls: ['./sent-donations.component.css']
})
export class SentDonationsComponent implements OnInit {
  panelOpenState = false;
  constructor(
    private bottomSheet: MatBottomSheet,
    private identityService: IdentityService,
    private dataService: DataService,
    private router: Router
  ) { }

  user: User = null;
  requests: DonationRequest[] = [];
  donations: Donation[] = [];

  ngOnInit() {
    this.identityService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
      if (user) {
        this.dataService.getDonationRequests(user.email).subscribe(requests => {
          this.requests = requests;
          console.log(this.requests);
        });
        this.dataService.getDonations(null, user.email).subscribe(donations => {
          this.donations = donations;
          console.log(this.donations);
        });
      }
    });
    this.dataService.getPDF(this.identityService.userData, {ceva: 'altceva'}).then(a => console.log(a));
  }

  edit() {
    this.bottomSheet.open(EditProfileComponent);
  }

  donate() {
    this.router.navigate(['centers']);
  }  

  createRequest() {
    this.bottomSheet.open(RequestFormComponent);
  }

  addReceivedDonation() {
    this.bottomSheet.open(ReceivedDonationFormComponent);
  }


}
