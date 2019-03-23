import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { User } from '../identity/user';
import { tap, map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-donation-conclude',
  templateUrl: './donation-conclude.component.html',
  styleUrls: ['./donation-conclude.component.sass']
})
export class DonationConcludeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.test();
  }

  distanceBetweenTwoPoints(lat1, lon1, lat2, lon2, unit="K") {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }
  test() {
    let u1 = new User();
    let u2 = new User();
    let u3 = new User();

    u1.lat = 45;
    u1.lon = 45;
    u2.lat = 46;
    u2.lon = 46;
    u3.lat = 45.1;
    u3.lon = 45.1;

    let o = of([u2, u1]);
    o = this.sortCenters(o, u3, 5);
    o.subscribe(
      p => console.log(p)
    );
  }
  sortCenters(centers: Observable<User[]>, user: User, maxDist: number) {
    return centers.pipe(
      tap(c => {
        c.sort(
          (a, b) => {
            return this.distanceBetweenTwoPoints(a.lat, a.lon, user.lat, user.lon)
                 - this.distanceBetweenTwoPoints(b.lat, b.lon, user.lat, user.lon);
          }
        );
      })
      ).pipe(
        tap(c => {
          c.filter(a => {
          console.log(this.distanceBetweenTwoPoints(a.lat, a.lon, user.lat, user.lon));
          return this.distanceBetweenTwoPoints(a.lat, a.lon, user.lat, user.lon) <= maxDist;
        });})
      );
  }



}
