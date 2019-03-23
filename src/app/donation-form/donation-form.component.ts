import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    this.donationForm.get('category').valueChanges.subscribe(value => {
      if (value === 'food') {
        this.donationForm.get('foodType').setValidators(Validators.required);
        this.donationForm.get('sex').clearValidators();
        this.donationForm.get('clothSize').clearValidators();
        this.donationForm.get('medName').clearValidators();
      } else if (value === 'money' || value === 'volunteering') {
        this.donationForm.get('foodType').clearValidators();
        this.donationForm.get('sex').clearValidators();
        this.donationForm.get('clothSize').clearValidators();
        this.donationForm.get('medName').clearValidators();
      } else if (value === 'clothes') {
        this.donationForm.get('foodType').clearValidators();
        this.donationForm.get('sex').setValidators(Validators.required);
        this.donationForm.get('clothSize').setValidators(Validators.required);
        this.donationForm.get('medName').clearValidators();
      }  else if (value === 'meds') {
        this.donationForm.get('foodType').clearValidators();
        this.donationForm.get('sex').clearValidators();
        this.donationForm.get('clothSize').clearValidators();
        this.donationForm.get('medName').setValidators(Validators.required);
      }
    });
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
