import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {

  categories = ['food', 'money', 'clothes', 'meds', 'volunteering'];

  donationForm = new FormGroup({
    'category': new FormControl(null, Validators.required)
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event: MouseEvent): void {
    if (this.donationForm.valid) {
      console.log(this.donationForm);
    }
  }

}
