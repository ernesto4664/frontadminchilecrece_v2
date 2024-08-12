import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {
  private apiUrl = 'http://localhost:8000/api/etapas';
  
  constructor(private http: HttpClient) {}

  getEtapas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEtapa(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEtapa(etapa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, etapa);
  }

  updateEtapa(id: number, etapa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, etapa);
  }

  deleteEtapa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getEtapasByTipoUsuario(tipoUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipoUsuario/${tipoUsuario}`);
  }

  obtenerEtapaGestacion(semanasEmbarazoId: number | null): Observable<any> {
    if (semanasEmbarazoId === null) {
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/gestacion/${semanasEmbarazoId}`);
  }

  obtenerEtapaCrecimiento(edad: number | null): Observable<any> {
    if (edad === null) {
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/crecimiento/${edad}`);
  }
}
