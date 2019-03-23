import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../identity/login/login.component';
import { Router } from '@angular/router';
import { IdentityService } from '../identity/identity.service';
import { MatSnackBar, MatBottomSheetRef } from '@angular/material';
import { DonationRequest } from '../models/donation-request';
import { User } from '../identity/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<EditProfileComponent>
  ) { }

  user: User = null;
  requests: DonationRequest[] = [];

  ngOnInit() {
    this.identityService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
      if (user) {
        this.registerForm = new FormGroup({
          'name': new FormControl(user.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
          'surname': new FormControl(user.surname, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
          'id': new FormControl(user.id, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(13), Validators.minLength(13)]),
          'fatherInitial': new FormControl(user.fatherInitial, user.center ? [] : [Validators.required, Validators.pattern('[A-Z]')]),
          'phone': new FormControl(user.phone, [Validators.required, Validators.pattern('[0-9 ]*')]),
          'fax': new FormControl(user.fax, []),
          'street': new FormControl(user.street, [Validators.required]),
          'streetNumber': new FormControl(user.streetNumber, [Validators.required, Validators.pattern('[0-9]*')]),
          'building':  new FormControl(user.building, [Validators.required]),
          'block':  new FormControl(user.block, [Validators.required]),
          'appartment':  new FormControl(user.appartment, [Validators.required]),
          'city':  new FormControl(user.city, [Validators.required]),
          'county':  new FormControl(user.county, [Validators.required]),
          'country':  new FormControl(user.country, [Validators.required]),
          'postalCode':  new FormControl(user.postalCode, [Validators.required, Validators.pattern('[0-9]*')]),
          'centerName': new FormControl(user.centerName, user.center ? [Validators.required] : []),
          'iban': new FormControl(user.iban, user.center ? [Validators.required] : []),
          'fic': new FormControl(user.fic, user.center ? [Validators.required] : []),
      });
      }
    });

    // Clear validators, for dev only
    // Object.keys(this.registerForm.controls).forEach(key => {
    //   this.registerForm.get(key).clearValidators();
    // });
  }

  onSubmit() {
    this.registerForm.updateValueAndValidity();
    if (this.registerForm.valid) {
      const response = { 
        name: this.registerForm.get('name').value,
        surname: this.registerForm.get('surname').value,
        id: this.registerForm.get('id').value,
        fatherInitial: this.registerForm.get('fatherInitial').value,
        phone: this.registerForm.get('phone').value,
        fax: this.registerForm.get('fax').value,
        street: this.registerForm.get('street').value,
        streetNumber: this.registerForm.get('streetNumber').value,
        building: this.registerForm.get('building').value,
        block: this.registerForm.get('block').value,
        appartment: this.registerForm.get('appartment').value,
        city: this.registerForm.get('city').value,
        county: this.registerForm.get('county').value,
        country: this.registerForm.get('country').value,
        postalCode: this.registerForm.get('postalCode').value,
        centerName: this.registerForm.get('centerName').value,
        iban: this.registerForm.get('iban').value,
        fic: this.registerForm.get('fic').value,
      };

      console.log(response);

      this.identityService.updateUser(response).then(response => {
        this.snackBar.open("Account updated!", "Close", {
          duration: 2000,
        });
        this.bottomSheetRef.dismiss();
        // this.router.navigate(['/login']);
      }).catch(err => {
        console.log(err);
        this.snackBar.open(err.message, "Close", {
          duration: 2000,
        });
      });
    }
  }
}
