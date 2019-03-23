import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }
  // google maps zoom level
  zoom: number = 8;
    
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

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

  ngOnInit() {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
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
    //EventEmitter<LatLngLiteral>
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
