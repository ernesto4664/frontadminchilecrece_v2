import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getBeneficios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/beneficios`);
  }

  getBeneficio(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/beneficios/${id}`);
  }

  addBeneficio(beneficio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/beneficios`, beneficio);
  }

  editBeneficio(id: number, beneficio: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/beneficios/${id}`, beneficio);
  }

  deleteBeneficio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/beneficios/${id}`);
  }
}
