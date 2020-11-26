import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Body} from '../interfaces/body.interface';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  private readonly _backendURL: any;
  private readonly _defaultBody: Body;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  get defaultBody(): Body {
    return this._defaultBody;
  }

  fetch(): Observable<Body[]> {
    return this._http.get<Body[]>(this._backendURL.allBodies)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  create(body: Body): Observable<any> {
    return this._http.post<Body>(this._backendURL.allBodies, body, this._options());
  }

  update(body: Body): Observable<any> {
    return this._http.post<Body>(this._backendURL.oneBody.replace(':name', body.name), body, this._options())
  }

  delete(name: string): Observable<string> {
    return this._http.delete(this._backendURL.oneBody.replace(':name', name), this._options())
      .pipe(
        map(_ => name)
      );
  }

  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList)) };
  }

}
