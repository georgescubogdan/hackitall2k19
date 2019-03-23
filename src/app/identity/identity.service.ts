import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable()
export class IdentityService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {


      this.afAuth.authState.pipe(
        switchMap(auth => {
          if (auth) {
            /// signed in
            return this.db.object('user/' + auth.uid).valueChanges();
          } else {
            /// not signed in
            return of(null);
          }
        }))
        .subscribe(user => {
          this.user.next(user);
        });
    }


    ///// SignIn - SignOut Process /////

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const promise = this.afAuth.auth.signInWithPopup(provider);
      promise.then(credential =>  {
        this.updateUser(credential.user);
      });
      return promise;
    }

    signOut() {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }

    doLogin(email: string, password: string, role: string = 'user'): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
      });
    }

    doRegister(value, additionalData = null): Promise<any> {
      const userData = value as User;
      return new Promise<any>((resolve, reject) => {
        let coords;
        this.findMe().then(a => coords = a);
        const provider = new firebase.auth.EmailAuthProvider();
        this.afAuth.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.db.object('user/' + res.user.uid).snapshotChanges().subscribe(docSnapshot => {
            if (!docSnapshot.key) {
              let roles_tmp = { user: false, doctor: false, nurse: false};

              roles_tmp[value.role] = true;
              if (value.center) {
                value.lat = coords.lat;
                value.lon = coords.lon;
              }

              this.db.object('user/' + res.user.uid).set({...value, roles: roles_tmp});
            }});
          resolve(res);
        }, err => {
          reject(err);
        });
      });
    }

  findMe(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
         resolve({lat: position.coords.latitude, lon: position.coords.longitude});
        });
      } else {
        alert('Geolocation is not supported by this browser.');
        reject(null);
      }
    });
  }

  ngOnInit() {
    this.findMe().then(a => {
      console.log(a);
    });
  }
    //// Update user data ////

    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateUser(authData) {
      const userData = new User(authData);
      const ref = this.db.object('users/' + authData.uid);
      ref.valueChanges()
         .subscribe(user => {
          if (!user.roles) {
            ref.update(userData);
          }
      });
    }
}
