import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  crearNotificacion(notificacionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/notificaciones`, notificacionData);
  }
}
