import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { IVatRate } from '../models/vatrate';
import { Endpoints } from '../helpers/endpoints';

@Injectable({
  providedIn: 'root'
})
export class VatService {

  private baseURL = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.baseURL = baseUrl }

  /** Method to get Country List from Api*/
  getCountry(): Observable<any>{
    return this.http.get<any>(this.baseURL + Endpoints.ENDPOINT_GETCOUNTRIES);
  }

  /** Method to get VatRates from Api*/
  getVatRates(): Observable<any>{
    return this.http.get<IVatRate[]>(this.baseURL + Endpoints.ENDPOINT_GETVATRATES);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
