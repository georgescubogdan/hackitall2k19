import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity/identity.service';
import { FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public authStatus;

  constructor(
    private identityService: IdentityService
  ) { }

  ngOnInit() {
    this.identityService.user.subscribe(userData => {
      this.authStatus = userData;
    });
  }

  logout() {
    this.identityService.signOut();
  }
}
