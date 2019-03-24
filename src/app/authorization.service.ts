import { Injectable } from '@angular/core';
import { IdentityService } from './identity/identity.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  userRoles: Array<string>;
  approved = false;
  loggedIn = false;
  /// the rule

  get isUser(): boolean {
    const allowed = 'user';
    return this.matchingRole(allowed);
  }

  get isCenter(): boolean {
    const allowed = 'center';
    return this.matchingRole(allowed);
  }

  get isAdmin(): boolean {
    const allowed = 'admin';
    return this.matchingRole(allowed);
  }

  get isApproved(): boolean {
    return this.approved;
  }
  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  /// Determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return this.userRoles == allowedRoles;
  }
  constructor(private auth: IdentityService,
              private db: AngularFireDatabase) {

      auth.user.pipe(map(user => {
        return this.userRoles = _.findKey(_.get(user, 'roles'), value => {
          return value == true;
        });
      }))
      .subscribe();
      auth.user.pipe(map(user => {
        console.log(_.get(user, 'approved'));
        console.log(user);
        if (user == null) {
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
        return this.approved = _.get(user, 'approved');
      })).subscribe();
    }
}
