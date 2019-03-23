import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';

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
  constructor() { }

  ngOnInit() {
  }

}
