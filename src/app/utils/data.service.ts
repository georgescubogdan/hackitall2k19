import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../identity/user';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DonationRequest } from '../models/donation-request';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _centreObservable: Observable<User[]>;
  private _centreSubject: Subject<User[]>;

  private _requestsObservable: Observable<DonationRequest[]>;
  private _requestsSubject: Subject<DonationRequest[]>;

  private _messagesSubject: { [email: string] : Subject<DonationRequest[]> } = {};
  
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

  public 

  public getDonationRequests(email?: string): Observable<DonationRequest[]> {
    if (isNullOrUndefined(this._centreObservable)) {
      this._requestsObservable = this.db.list('/requests')
                                      .valueChanges()
                                      .pipe(map(data => data as DonationRequest[]));
      
      this._requestsObservable.subscribe(data => this._requestsSubject.next(data));
    }
    if (isNullOrUndefined(email)) {
      return this._requestsSubject.asObservable().pipe(map(requests => {
        return requests.filter(request => {
          request.email === email;
        });
      }));
    } else {
      return this._requestsSubject.asObservable();
    }
  }
}
