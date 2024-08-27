import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  public apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getBeneficios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/beneficios`);
  }

  getBeneficio(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/beneficios/${id}`);
  }
  
  getBeneficiosByEtapa(etapaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/beneficios/etapa/${etapaId}`);
  }

  addBeneficio(beneficio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/beneficios`, beneficio);
  }

  editBeneficio(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/beneficios/${id}`, formData);
}

  deleteBeneficio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/beneficios/${id}`);
  }

  getComunasByRegions(regionIds: number[]): Observable<any> {
    console.log('API Request - Region IDs:', regionIds); // Verificar IDs
    return this.http.post(`${this.apiUrl}/comunas-by-regions`, { region_ids: regionIds }).pipe(
      tap((response: any) => console.log('API Response - Comunas:', response)) // Verificar la respuesta
    );
  }

  getUbicacionesByRegionsAndComunas(regionIds: number[], comunaIds: number[]): Observable<any> {
    console.log('API Request - Region IDs:', regionIds, 'Comuna IDs:', comunaIds); // Verificar IDs
    return this.http.post(`${this.apiUrl}/ubicaciones-by-regions-and-comunas`, { regionIds, comunaIds }).pipe(
      tap(response => console.log('API Response - Ubicaciones:', response)) // Verificar la respuesta
    );
  }
  
}
