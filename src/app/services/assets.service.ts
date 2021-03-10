import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  url = 'https://localhost:44321/';

  constructor(private _http: HttpClient) {
    this._http.get(this.url);
  }

  getMiData(API: string): Observable<any>{
    return this._http.get(this.url + API);
  }

  addMiData(API: string, data: any): Observable<any>{
    return this._http.post(this.url + API, data);
  }
}
