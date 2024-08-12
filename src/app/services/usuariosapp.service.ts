import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/interfaces';

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
        return response.data.map(usuario => {
          // Asignar etapa en base al tipoderegistro_id
          if (usuario.familiares) {
            usuario.familiares.forEach(familiar => {
              if (familiar.tipoderegistro_id === 1 || familiar.tipoderegistro_id === 3) {
                familiar.etapa = 'Gestación';
              } else if (familiar.tipoderegistro_id === 2) {
                familiar.etapa = 'Crecimiento';
              }
            });
          }
          return usuario;
        });
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Error al cargar los usuarios; intente nuevamente más tarde.');
  }

  getAllUsersWithFamilies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios-familiares`);
  }
}
