import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isSpinning: Subject<boolean>

  public ShowSpinner() {
    this._isSpinning.next(true);
  }

  public HideSpinner() {
    this._isSpinning.next(false);
  }

  public Spinner(): Observable<boolean> {
    return this._isSpinning.asObservable();
  }

  constructor() {
    this._isSpinning = new ReplaySubject(1);
  }
}
