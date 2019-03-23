import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
  ]);

  passwordConfirmFormControl = new FormControl('', [
    Validators.required,
    this.passwordConfirmValidator.bind(this)
  ]);

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'center': new FormControl(false, []),
      'email': this.emailFormControl,
      'password': this.passwordFormControl,
      'confirm-password': this.passwordConfirmFormControl,
      'name': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'surname': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'id': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(13), Validators.minLength(13)]),
      'fatherInitial': new FormControl('', [Validators.required, Validators.pattern('[A-Z]')]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*')]),
      'fax': new FormControl('', []),
      'street': new FormControl('', [Validators.required]),
      'streetNumber': new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      'building':  new FormControl('', [Validators.required]),
      'block':  new FormControl('', [Validators.required]),
      'appartment':  new FormControl('', [Validators.required]),
      'city':  new FormControl('', [Validators.required]),
      'county':  new FormControl('', [Validators.required]),
      'country':  new FormControl('', [Validators.required]),
      'postalCode':  new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      'centerName': new FormControl('', []),
      'iban': new FormControl('', []),
      'fic': new FormControl('', []),
    });

    this.registerForm.get('center').valueChanges.subscribe(value => {
      if (value === true) {
        this.registerForm.get('fatherInitial').setValidators([Validators.pattern('[A-Z]')]);
        this.registerForm.get('centerName').setValidators([Validators.required]);
        this.registerForm.get('iban').setValidators([Validators.required]);
        this.registerForm.get('fic').setValidators([Validators.required]);
      } else {
        this.registerForm.get('fatherInitial').setValidators([Validators.required, Validators.pattern('[A-Z]')]);
        this.registerForm.get('centerName').clearValidators();
        this.registerForm.get('iban').clearValidators();
        this.registerForm.get('fic').clearValidators();
      }
    });
  }

  passwordConfirmValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.passwordFormControl.value) {return null; }
    return {'passwordsNotMatching': true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
    }
  }

  get isCenter(): boolean {
    return this.registerForm.get('center').value;
  }
}
