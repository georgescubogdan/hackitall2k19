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

@Component({
  selector: 'app-sent-donations',
  templateUrl: './sent-donations.component.html',
  styleUrls: ['./sent-donations.component.css']
})
export class SentDonationsComponent implements OnInit {
  panelOpenState = false;

  donations: Donation[] = [
    {
      date: Date.now(),
      destination: "test address",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    }];

  constructor(
    private bottomSheet: MatBottomSheet,
    private identityService: IdentityService,
    private dataService: DataService,
    private router: Router
  ) { }

  user: User = null;
  requests: DonationRequest[] = [];

  ngOnInit() {
    this.identityService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
      if (user) {
        this.dataService.getDonationRequests(user.email).subscribe(requests => {
          this.requests = requests;
          console.log(this.requests);
        });
      }
    });
  }

  edit() {
    this.bottomSheet.open(RegisterComponent);
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
