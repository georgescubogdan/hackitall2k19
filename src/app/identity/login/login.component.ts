import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { IdentityService } from '../identity.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/utils/data.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private identityService: IdentityService,
              private snackBar: MatSnackBar,
              private dataService: DataService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({'email': this.emailFormControl, 'password': this.passwordFormControl});
    this.dataService.getCentre().subscribe(a => console.log(a));
  }

  handleLogin(promise: Promise<any>) {
    promise.then(authState => {
      console.log(authState);
      this.snackBar.open('Login successful. Redirecting...', 'Close', {
        duration: 2000,
      });
    }).catch(authState => {
      this.snackBar.open('Invalid login. Please check your user data.', 'Close', {
        duration: 2000,
      });
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const pass = this.loginForm.get('password').value;
      this.handleLogin(this.identityService.doLogin(email, pass));
    }
  }

  loginWithGoogle() {
    this.handleLogin(this.identityService.googleLogin());
  }
}
