import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseEstablecimientoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getBaseEstablecimientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/base-establecimientos`);
  }

  getBaseEstablecimiento(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/base-establecimientos/${id}`);
  }

  addBaseEstablecimiento(baseEstablecimiento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/base-establecimientos`, baseEstablecimiento);
  }

  editBaseEstablecimiento(id: number, baseEstablecimiento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/base-establecimientos/${id}`, baseEstablecimiento);
  }

  deleteBaseEstablecimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/base-establecimientos/${id}`);
  }
}
