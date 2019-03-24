import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../identity/user';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DonationRequest } from '../models/donation-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Donation } from '../models/donation';
import { IdentityService } from '../identity/identity.service';
import { BaseItem } from '../models/base-item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _centreObservable: Observable<User[]>;
  private _centreSubject: Subject<User[]>;

  private _requestsObservable: Observable<DonationRequest[]>;
  private _requestsSubject: Subject<DonationRequest[]>;

  private _donationsObservable: Observable<Donation[]>;
  private _donationsSubject: Subject<Donation[]>;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private identityService: IdentityService
  ){
    this._centreSubject = new ReplaySubject(1);
    this._requestsSubject = new ReplaySubject(1);
    this._donationsSubject = new ReplaySubject(1);
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

  public getDonations(from?: string, to?: string): Observable<Donation[]> {
    if (isNullOrUndefined(this._donationsObservable)) {
      this._donationsObservable = this.db.list('/donations')
                                      .valueChanges()
                                      .pipe(map(data => data as Donation[]));

      this._donationsObservable.subscribe(data => this._donationsSubject.next(data)); 
    }
    return this._donationsSubject.asObservable().pipe(map(donations => {
      return donations.filter(donation => {
        let result = true;
        console.log(donation, "PULA IN CUR");
        if (!isNullOrUndefined(from)) {
          result = result && donation.sender == from;
        }
        if (!isNullOrUndefined(to)) {
          result = result && donation.destination == to;
        }

        return result;
      })
    }));
  }

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

  public addDonationRequest(requestData: BaseItem[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.list('/requests').push({email: this.identityService.userData.email, items: requestData} as DonationRequest).then(a => resolve(a)).catch(err => reject(err));
    })
  }

  public addDonation(requestData: any): Promise<any> {
    console.log({...requestData, to: this.identityService.userData.email} as Donation);
    return new Promise<any>((resolve, reject) => {
      this.db.list('/donations').push({...requestData, destination: this.identityService.userData.email} as Donation).then(a => resolve(a)).catch(err => reject(err));
    })
  }

  // public get

  public getPDF(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5002/api/values', `<?xml version="1.0" encoding="UTF-8"?>
        <form1>
           <body1>
              <Header>
                 <universalCode>D230_A1.0.0</universalCode>
                 <an_r>2019</an_r>
                 <d_rec>0</d_rec>
                 <luna_r>3</luna_r>
                 <totalPlata_A>0</totalPlata_A>
              </Header>
              <ident_contrib>
                 <ID_NUME>{surname}</ID_NUME>
                 <ID_INITIALA>{fatherInitial}</ID_INITIALA>
                 <ID_PRENUME>{name}</ID_PRENUME>
                 <cif>{id}</cif>
                 <ID_STRADA>{street}</ID_STRADA>
                 <ID_NR>{streetnumber}</ID_NR>
                 <ID_BL>{building}</ID_BL>
                 <ID_SC>{block}</ID_SC>
                 <ID_ET/>
                 <ID_AP>{appartment}</ID_AP>
                 <ID_LOCALIT>{city}</ID_LOCALIT>
                 <ID_COD_POSTAL>{postalCode}</ID_COD_POSTAL>
                 <ID_TEL>{phone}</ID_TEL>
                 <ID_FAX>{fax}</ID_FAX>
                 <ID_EMAIL>{email}</ID_EMAIL>
                 <ID_JUDET>{county}</ID_JUDET>
                 <AP_FOCUS />
                 <ID_SECTOR />
              </ident_contrib>
              <repet1>
                 <seq1>1</seq1>
                 <sal_pensii>
                    <bifa_sal>1</bifa_sal>
                    <bifa_pens />
                 </sal_pensii>
                 <destinatia_sumei>
                    <Bursa_privata />
                    <S_bursa>
                       <D_DOC_PLATA />
                       <D_CONTRACT_NR />
                       <D_SUMA_PLATITA />
                    </S_bursa>
                    <S_entit>
                       <D_CIF_ENTIT>{cif_dest}</D_CIF_ENTIT>
                       <ENTIT_IBAN>{iban_dest}</ENTIT_IBAN>
                       <ENTIT_SUMA />
                       <D_DENUMIRE_ENTIT>{den}</D_DENUMIRE_ENTIT>
                       <cota>1</cota>
                    </S_entit>
                    <Entitate>1</Entitate>
                 </destinatia_sumei>
              </repet1>
              <repet2 xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/" xfa:dataNode="dataGroup" />
              <ident_rep_fiscal>
                 <F_NUME />
                 <F_CIF />
                 <F_TEL />
                 <F_FAX />
                 <F_EMAIL />
                 <F_JUDET />
                 <box_submit xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/" xfa:dataNode="dataGroup" />
                 <F_COD_POSTAL />
                 <F_BL />
                 <F_NR />
                 <F_STRADA />
                 <F_AP />
                 <F_SC />
                 <F_LOCALIT />
                 <F_SECTOR />
              </ident_rep_fiscal>
           </body1>
        </form1>`, { 
          responseType: "blob",
          headers: new HttpHeaders({'Content-Type': 'application/text'})
        }).toPromise().then((response) => { // download file
          var blob = new Blob([response], {type: 'application/pdf'});
          const blobUrl = URL.createObjectURL(blob);
            // const iframe = document.createElement('iframe');
            // iframe.style.display = 'none';
            // iframe.src = blobUrl;
            // document.body.appendChild(iframe);
            // iframe.contentWindow.();
            const anchor = document.createElement('a');
            anchor.download = `anexa.pdf`;
            anchor.href = blobUrl;
            anchor.click();
      });
    });
  }
}
