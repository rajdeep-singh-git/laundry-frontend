import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private headers: HttpHeaders;

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error?.error?.error);
  }


  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

  }


  login(loginForm): Observable<any> {
    const url = environment.API_URL + "login";
    return this.http.post(url, loginForm, { headers: this.headers }).pipe(catchError(this.handleError));
  }


  searchClients(searchForm) {
    const url = environment.API_URL + "clients";
    return this.http.get(url, { headers: this.headers, params: searchForm }).pipe(catchError(this.handleError));
  }

  getBatchItems() {
    const url = environment.API_URL + "batch/items";
    return this.http.get(url, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  addBatchToClient(clientId: number, payload) {
    const url = environment.API_URL + "clients/" + clientId + "/batch";
    return this.http.post(url, payload, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  getClientBatches(clientId, filter) {
    const url = environment.API_URL + "clients/" + clientId + "/batches";
    return this.http.get(url, { headers: this.headers, params: filter }).pipe(catchError(this.handleError));
  }

  getBatchByTagId(tagId) {
    const url = environment.API_URL + "batch/tags/" + tagId;
    return this.http.get(url, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  changeStatus(batchId, status) {
    const url = environment.API_URL + "batch/" + batchId + "/status";
    return this.http.put(url, { status }, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  getBatchStatus() {
    const url = environment.API_URL + "batch/statuses";
    return this.http.get(url, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  updateBatch(batchId, payload) {
    const url = environment.API_URL + "batch/" + batchId;
    return this.http.put(url, payload, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  addClient(payload) {
    const url = environment.API_URL + "clients/";
    return this.http.post(url, payload, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  updateClient(clientId, payload) {
    const url = environment.API_URL + "clients/" + clientId;
    return this.http.put(url, payload, { headers: this.headers }).pipe(catchError(this.handleError));
  }

}
