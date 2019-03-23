import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {

  categories = ['food', 'money', 'clothes', 'meds', 'volunteering'];
  foodTypes = ['perisable', 'nonperisable'];
  sexes = ['male', 'female'];
  clothSizes = [
    {
      value: 'under2',
      label: '< 2 years'
    }, {
      value: 'three_four',
      label: '3-4 years'
    }, {
      value: 'five_six',
      label: '5-6 years'
    }, {
      value: 'seven_eight',
      label: '7-8 years'
    }, {
      value: 'XS',
      label: 'XS'
    }, {
      value: 'S',
      label: 'S'
    }, {
      value: 'M',
      label: 'M'
    }, {
      value: 'L',
      label: 'L'
    }, {
      value: 'XL',
      label: 'XL'
    }, {
      value: 'XXL',
      label: 'XXL'
    }
  ];

  donationForm = new FormGroup({
    'category': new FormControl(null, Validators.required),
    'foodType': new FormControl(null),
    'sex': new FormControl(null),
    'clothSize': new FormControl(null),
    'medName': new FormControl(null)
  });

  constructor(private bottomSheetRef: MatBottomSheetRef<DonationFormComponent>) { }

  ngOnInit() {
  }

  get category() {
    return this.donationForm.get('category').value;
  }

  onSubmit(event: MouseEvent): void {
    if (this.donationForm.valid) {
      console.log(this.donationForm);
    }
  }

}
