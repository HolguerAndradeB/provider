import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {

  private appUrl: any = 'https://localhost:44399/';
  private urlEndpoint: any = 'api/Third/';

  constructor(private http: HttpClient) {}

  getListAllThird(): Observable<any>{
    return this.http.get(this.appUrl + this.urlEndpoint);
  }

  saveThird(third: any): Observable<any>{
    return this.http.post(this.appUrl + this.urlEndpoint, third);
  }

  updateThird(id: string, third: any): Observable<any>{
    return this.http.put(this.appUrl + this.urlEndpoint + id, third);
  }

}

