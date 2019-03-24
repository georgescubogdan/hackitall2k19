import { Component, OnInit } from '@angular/core';
import { MouseEvent, LatLngLiteral } from '@agm/core';
import { EventEmitter } from 'protractor';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { DataService } from '../utils/data.service';
import { User } from '../identity/user';
import { DonationRequest } from '../models/donation-request';
import { Observable, identity } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdentityService } from '../identity/identity.service';
import { DonationFormComponent } from '../donation-form/donation-form.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  centers: User[];
  requests: DonationRequest[];
  radius: number = 5;
  coords: LatLngLiteral;

  async initMyData(first = true) {
    if (first) {
      let a = await this.identityService.findMe();
      this.coords = {lat: a.lat, lng: a.lon};
    }
    let c = await this.dataService.getCentre();
    c = this.sortCenters(c, this.coords, this.radius);
    c.subscribe(comp => {
      comp.forEach(ce => this.markers.push({lat: ce.lat, lng: ce.lon, draggable: false, title: ce.centerName, markerClickable: false}));
      this.centers = comp.filter(
        b => {
          return this.distanceBetweenTwoPoints(b.lat, b.lon, this.coords.lat, this.coords.lng) <= this.radius;
        });
    });
  }

  categories = ['None', 'Food', 'Meds', 'Money', 'Volunteering', 'Clothes']
  selectedCategory = 'None';

  selectCategory(category) {
    this.selectedCategory = category;
  }

  filterCenters(): User[] {
    if (this.selectedCategory == 'None') {
      return this.centers;
    }

    if (!this.centers) {
      return [];
    }

    if (!this.requests) {
      return [];
    }


    return this.centers.filter(center => {
      let good = true;

      let requests: DonationRequest[] = this.filterRequests(center.email);
      good = good && requests.some(request => request.items.some(item => item.category.toLowerCase() === this.selectedCategory.toLowerCase()));

      return good;
    })
  }

  ngOnInit(): void {
    this.initMyData(true).then(a => {});
    this.dataService.getDonationRequests().subscribe(r => {
      console.log(r);
      this.requests = r;
    }); 
  }

  constructor(public dialog: MatDialog, private dataService: DataService, private identityService: IdentityService, private bottomSheet: MatBottomSheet) {

  }
  // google maps zoom level
  zoom = 12;

  // initial center position for the map
  lat = 44.441049400000004;
  lng = 26.0513992;

  markers: Marker[] = [];
  //   {
  //     lat: 44.404425,
  //     lng: 26.097031,
  //     label: 'A',
  //     draggable: true
  //   },
  //   {
  //     lat: 44.443651,
  //     lng: 26.035944,
  //     label: 'B',
  //     draggable: false
  //   },
  //   {
  //     lat: 44.448190,
  //     lng: 26.140451,
  //     label: 'C',
  //     draggable: true
  //   }
  // ];

  openDialog(lat: number, lon: number): void {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '250px',
      data: {lat, lon}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  filterRequests(email): DonationRequest[] {
    const temp: DonationRequest[] = this.requests.filter(r => {
        return r.email === email;
      });
    if (temp !== undefined) {
      return temp;
    }
    return [];
  }

  clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    //console.log('dragEnd', m, $event);
  }

  circleDragEnd($event: MouseEvent) {
    // EventEmitter<LatLngLiteral>
    //console.log('centerChanged', $event);
    this.coords = $event.coords as LatLngLiteral;
    this.initMyData(false).then(a => {});
  }

  radiusChanged($event) {
    // EventEmitter<number> in meters
    //console.log('radiusChanged', $event);
    this.radius = $event as number;
    this.radius /= 1000;
    this.initMyData(false).then(a => {});  
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
  sortCenters(centers: Observable<User[]>, startPos: LatLngLiteral, maxDist: number) {
    return centers.pipe(
      tap(c => {
        c.sort(
          (a, b) => {
            return this.distanceBetweenTwoPoints(a.lat, a.lon, startPos.lat, startPos.lng)
                 - this.distanceBetweenTwoPoints(b.lat, b.lon, startPos.lat, startPos.lng);
          }
        );
      })
      ).pipe(
        tap(c => {
          c.filter(a => {
          return this.distanceBetweenTwoPoints(a.lat, a.lon, startPos.lat, startPos.lng) <= maxDist;
        }); })
      );
  }

  public donate(centru: User) {
    this.dataService.getPDF(this.identityService.userData, centru).then(a => a);
  }

  openBottomSheet() {
    this.bottomSheet.open(DonationFormComponent);
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title?: string;
  markerClickable: boolean;
}
