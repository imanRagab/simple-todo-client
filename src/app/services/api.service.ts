import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  // make api get request
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_host}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  // make api post request 
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_host}${path}`, body
    ).pipe(catchError(this.formatErrors));
  }

  // make api put request 
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_host}${path}`, body
    ).pipe(catchError(this.formatErrors));
  }

  // make api delete request
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_host}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}