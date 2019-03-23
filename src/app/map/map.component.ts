import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { EventEmitter } from 'protractor';
import { MatDialog } from '@angular/material';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
  }
  // https://www.google.com/maps/dir//44.84629,24.885659/ link pt qr
  centers = [
    {
      lat: 45.12332,
      lon: 75.125421,
      centerName: 'Centru Test',
      phone: '07noidoi',
      email: 'test@gmail.com',
      street: 'string',
      streetNumber: 'string',
      building: 'string',
      block: 'string',
      appartment: 'string',
      city: 'string',
      county: 'string',
      country: 'string'
    }
  ];

  requests = [
    {
      items: [
        {
          description: 'test desc',
          category: 'food'
        }
      ],
      email: 'test@gmail.com'
    }
  ];
  constructor(public dialog: MatDialog) {

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
  }

  radiusChanged($event) {
    // EventEmitter<number> in meters
    console.log('radiusChanged', $event);
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
