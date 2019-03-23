import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';
import { MatBottomSheet } from '@angular/material';
import { RequestFormComponent } from '../request-form/request-form.component';

@Component({
  selector: 'app-recived-donations',
  templateUrl: './recived-donations.component.html',
  styleUrls: ['./recived-donations.component.sass']
})
export class RecivedDonationsComponent implements OnInit {
  panelOpenState = false;

  donations: Donation[] = [
    {
      date: Date.now(),
      sender: "test sender",
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
  ];
  
  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
  }

  openBottomSheet() {
    this.bottomSheet.open(RequestFormComponent);
  }

}
