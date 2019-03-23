import { Component, OnInit } from '@angular/core';
import { MouseEvent, LatLngLiteral } from '@agm/core';
import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { DataService } from '../utils/data.service';
import { User } from '../identity/user';
import { DonationRequest } from '../models/donation-request';
import { Observable, identity } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdentityService } from '../identity/identity.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  centers: User[];
  requests: DonationRequest[];
  radius: number;
  coords: LatLngLiteral;

  async initMyData() {
    let a = await this.identity.findMe();
    console.log(a);
    this.coords = {lat: a.lat, lng: a.lon};
    let c = await this.data.getCentre();
    c = this.sortCenters(c, this.coords, this.radius);
    c.subscribe(comp => {
      console.log(comp);
      this.centers = comp;
    });
    console.log(this.centers);
    this.data.getDonationRequests().subscribe(r => {
      this.requests = r;
    });
  }
  ngOnInit(): void {
    this.initMyData().then(a => {});

    
  }

  constructor(public dialog: MatDialog, private data: DataService, private identity: IdentityService) {

  }
  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  openDialog(lat: number, lon: number): void {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '250px',
      data: {lat, lon}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  filterRequests(email) {
    const temp = this.requests.find(r => {
        return r.email === email;
      });
    if (temp !== undefined) {
      return temp.items;
    }
    return [];
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  circleDragEnd($event: MouseEvent) {
    // EventEmitter<LatLngLiteral>
    console.log('centerChanged', $event);
    this.coords = $event.coords as LatLngLiteral;
  }

  radiusChanged($event) {
    // EventEmitter<number> in meters
    console.log('radiusChanged', $event);
    this.radius = $event as number;
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
          console.log(this.distanceBetweenTwoPoints(a.lat, a.lon, startPos.lat, startPos.lng));
          return this.distanceBetweenTwoPoints(a.lat, a.lon, startPos.lat, startPos.lng) <= maxDist;
        });})
      );
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
