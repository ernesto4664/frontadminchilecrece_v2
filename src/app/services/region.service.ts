import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regiones`);
  }

  getComunasByRegions(regionIds: number[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/comunas-by-region`, { regionIds });
  }

  getUbicacionesByRegionsAndComunas(regionIds: number[], comunaIds: number[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/ubicaciones-by-regions-and-comunas`, { regionIds, comunaIds });
  }
}
