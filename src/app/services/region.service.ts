import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia esto según tu configuración

  constructor(private http: HttpClient) {}

  getRegiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regiones`);
  }

  getComunasByRegions(regionIds: number[]): Observable<any> {
    console.log('API Request - Region IDs:', regionIds); // Verificar IDs
    return this.http.post(`${this.apiUrl}/comunas-by-regions`, { region_ids: regionIds }).pipe(
      tap(response => console.log('API Response - Comunas:', response)) // Verificar la respuesta
    );
  }
  
  getUbicacionesByRegionsAndComunas(regionIds: number[], comunaIds: number[]): Observable<any> {
    console.log('API Request - Region IDs:', regionIds, 'Comuna IDs:', comunaIds); // Verificar IDs
    return this.http.post(`${this.apiUrl}/ubicaciones-by-regions-and-comunas`, { regionIds, comunaIds }).pipe(
      tap(response => console.log('API Response - Ubicaciones:', response)) // Verificar la respuesta
    );
  }

  getAllRegionsWithComunasAndUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>('/api/regions-with-comunas-and-ubicaciones');
  }

}
