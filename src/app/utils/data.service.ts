import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../identity/user';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _centreObservable: Observable<User[]>;
  private _centreSubject: Subject<User[]>;
  
  constructor(
    private db: AngularFireDatabase
  ){
    this._centreSubject = new ReplaySubject(1);
  }

  
  public getCentre(): Observable<User[]> {
    if (isNullOrUndefined(this._centreObservable)) {
      this._centreObservable = this.db.list('/user', ref => ref.orderByChild('center')
                                      .equalTo(true))
                                      .valueChanges()
                                      .pipe(map(data => data as User[]));
      
      this._centreObservable.subscribe(data => this._centreSubject.next(data));
    }
    return this._centreSubject.asObservable();
  }
}
