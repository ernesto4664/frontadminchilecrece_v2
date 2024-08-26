import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
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

  getComunasByRegions(regionIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comunas-by-regions`, { region_ids: regionIds });
}
  
  getUbicacionesByRegionsAndComunas(regionIds: number[], comunaIds: number[]): Observable<any[]> {
    const params = {
      region_ids: regionIds.join(','),
      comuna_ids: comunaIds.join(',')
    };
    return this.http.get<any[]>(`${this.apiUrl}/ubicaciones`, { params });
  }

  getAllRegionsWithComunasAndUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regions-with-comunas-and-ubicaciones`);
  }
}
