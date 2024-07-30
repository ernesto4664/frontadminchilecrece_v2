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

  getComunasByRegion(regionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regiones/${regionId}/comunas`);
  }
}
