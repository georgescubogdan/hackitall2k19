import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-received-donation-form',
  templateUrl: './received-donation-form.component.html',
  styleUrls: ['./received-donation-form.component.css']
})
export class ReceivedDonationFormComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

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

  itemForm = new FormGroup({
    'category': new FormControl(null, Validators.required),
    'description': new FormControl(null),
    'foodType': new FormControl(null),
    'sex': new FormControl(null),
    'clothSize': new FormControl(null),
    'medName': new FormControl(null),
    'sum': new FormControl(null, Validators.pattern('[0-9]*'))
  });
  
  items = [];

  constructor() { }

  ngOnInit() {
  }

  get category() {
    return this.itemForm.get('category').value;
  }

  get user() {
    return this.emailFormControl.value;
  }

  addItem() {
    if (this.itemForm.valid) {
      if (this.category === 'food') {
        this.items.push({
          category: this.category,
          description: this.itemForm.get('description').value,
          type: this.itemForm.get('foodType').value
        });
      } else if (this.category === 'money') {
        this.items.push({
          category: this.category,
          description: this.itemForm.get('description').value,
          sum: this.itemForm.get('sum').value
        });
      } else if (this.category === 'clothes') {
        this.items.push({
          category: this.category,
          description: this.itemForm.get('description').value,
          sex: this.itemForm.get('sex').value,
          size:  this.itemForm.get('clothSize').value
        });
      }  else if (this.category === 'meds') {
        this.items.push({
          category: this.category,
          description: this.itemForm.get('description').value,
          name: this.itemForm.get('medName').value
        });
      } else if (this.category === 'volunteering') {
        this.items.push({
          category: this.category,
          description: this.itemForm.get('description').value,
        });
      }
      this.itemForm.reset();
    }
  }

  onSubmit() {
    console.log(this.items);
    console.log(this.user);
  }
}
