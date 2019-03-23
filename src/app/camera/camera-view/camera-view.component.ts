import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.sass']
})
export class CameraViewComponent implements OnInit {
  selectedFile = null;
  constructor() { }

  ngOnInit() {

  }

  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload()
  {
    console.log(this.selectedFile); // You can use FormData upload to backend server
  }
}
