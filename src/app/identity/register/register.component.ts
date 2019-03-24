import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { IdentityService } from '../identity.service';
import { MatSnackBar } from '@angular/material';
import Tesseract from 'tesseract.js';
import { summaryFileName } from '@angular/compiler/src/aot/util';

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

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private snackBar: MatSnackBar
  ) { }

  get isCenter(): boolean {
    return this.registerForm.get('center').value;
  }

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

  selectedFile: ImageSnippet;

  ngOnInit() {
    this.parseData();
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

    // Clear validators, for dev only
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).clearValidators();
    });

    this.registerForm.get('center').valueChanges.subscribe(value => {
      console.log(value);
      if (value === true) {
        console.log('here')
        this.registerForm.get('fatherInitial').clearValidators();
        this.registerForm.get('fatherInitial').updateValueAndValidity();
        this.registerForm.get('centerName').setValidators([Validators.required]);
        this.registerForm.get('centerName').updateValueAndValidity();
        this.registerForm.get('iban').setValidators([Validators.required]);
        this.registerForm.get('iban').updateValueAndValidity();
        this.registerForm.get('fic').setValidators([Validators.required]);
        this.registerForm.get('fic').updateValueAndValidity();
        this.registerForm.updateValueAndValidity();
      } else {
        this.registerForm.get('fatherInitial').setValidators([Validators.required, Validators.pattern('[A-Z]')]);
        this.registerForm.get('centerName').clearValidators();
        this.registerForm.get('iban').clearValidators();
        this.registerForm.get('fic').clearValidators();
        this.registerForm.get('fatherInitial').updateValueAndValidity();
        this.registerForm.get('centerName').updateValueAndValidity();
        this.registerForm.get('iban').updateValueAndValidity();
        this.registerForm.get('fic').updateValueAndValidity();
        this.registerForm.updateValueAndValidity();
      }
    });
  }

  passwordConfirmValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === this.passwordFormControl.value) {return null; }
    return {'passwordsNotMatching': true};
  }

  onSubmit() {
    this.registerForm.updateValueAndValidity();
    if (this.registerForm.valid) {
      const response = {
        center: this.registerForm.get('center').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
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

      this.identityService.doRegister(response).then(response => {
        this.snackBar.open("Account created! Please wait...", "Close", {
          duration: 2000,
        });
        this.router.navigate(['/login']);
      }).catch(err => {
        console.log(err);
        this.snackBar.open(err.message, "Close", {
          duration: 2000,
        });
      });
    }
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    Tesseract.recognize(file, {lang: 'ron'})
    .then((result) => {
        console.log(result.text);
    });
    //reader.readAsDataURL(file);
  }

  parseData(text = "IDROUGEORGESCU«BOGDAN<GABRIEL««« i↵AS993238<2ROU9607147M210714310352636↵↵") {
    const t = text.replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, " ");
    let tokens = t.split(' ');
    let surname = tokens[0].slice(5);
    let name = tokens[1] + " " + tokens[2];
    let cnp = '';
    if (tokens[tokens.length - 2].includes('M')) {
      cnp = '1';
    } else {
      cnp = '2';
    }
    cnp += tokens[tokens.length - 2].slice(4, 10);
    cnp += tokens[tokens.length - 2].slice(20, 26);
    console.log(cnp);
    console.log(surname);
    console.log(name);


    
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
