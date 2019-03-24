import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './utils/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  spinnerVisible: boolean = false;

  ngOnInit(): void {
    this.spinnerService.Spinner().subscribe(spinning => this.spinnerVisible = spinning);
  }

  title = 'HackItAll2k19';

  constructor(private spinnerService: SpinnerService) {
  }
}
