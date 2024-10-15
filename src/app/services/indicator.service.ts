import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class IndicatorService {
  readonly baseUrl: string = environment.base + environment.api;
  isloading$ = false;
  readonly header = { headers: { SHOW_DEFAULT_ERROR_MODAL: '1' } };

  constructor(private http: HttpClient) {}

  getAll(uri: string) {
    const url = `${this.baseUrl}${uri}`;
    return this.http.get(url, this.header);
  }

  getById(id: number) {
    const url = `${this.baseUrl}indicator/${id}`;
    return this.http.get(url, this.header);
  }

  post(uri: string, body: any, header: boolean = true) {
    const url = `${this.baseUrl}${uri}`;
    if (header) return this.http.post(url, body, this.header);
    return this.http.post(url, body);
  }

  put(id:number, uri: string, body: any) {
    const url = `${this.baseUrl}${uri}/${id}`;
    return this.http.put(url, body, this.header);
  }

  delete(uri: string, id: number) {
    const url = `${this.baseUrl}${uri}/${id}`;
    return this.http.delete(url, this.header);
  }


}
