import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Familiar {
  id: number;
  nombres: string;
  apellidos: string;
  parentesco?: string;
  edad?: number;
  sexo?: string;
  fecha_nacimiento?: string;
  semanasEmbarazo?: { semana: number };
  tipoderegistro_id: number;
}

interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  region?: { nombre: string };
  comuna?: { nombre: string };
  edad?: number;
  sexo?: string;
  familiares?: Familiar[];
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosAppService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ data: Usuario[] }>(`${this.apiUrl}/users-with-families`).pipe(
      map(response => {
        console.log('Response:', response);
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Error al cargar los usuarios; intente nuevamente más tarde.');
  }
}
