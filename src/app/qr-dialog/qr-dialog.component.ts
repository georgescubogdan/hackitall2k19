import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.sass']
})
export class QrDialogComponent implements OnInit {
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.value = 'https://www.google.com/maps/dir//' + data.lat + "%2C" + data.lon;
  }

  ngOnInit() {
  }

}
