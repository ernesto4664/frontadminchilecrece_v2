import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getUbicaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ubicaciones`);
  }

  getUbicacion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ubicaciones/${id}`);
  }

  addUbicacion(ubicacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ubicaciones`, ubicacion);
  }

  editUbicacion(id: number, ubicacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/ubicaciones/${id}`, ubicacion);
  }

  deleteUbicacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ubicaciones/${id}`);
  }

  getUbicacionesByRegionAndComuna(regionIds: number[], comunaIds: number[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/ubicaciones-by-regions-and-comunas`, { regionIds, comunaIds });
  }
}
