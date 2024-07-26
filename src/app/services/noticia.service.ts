import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Noticia, Tag } from '../models/noticia.interface';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticia[]> {
    return this.http.get<ApiResponse<Noticia[]>>(`${this.apiUrl}/noticias`).pipe(
      map(response => response.data || [])
    );
  }

  getNoticiaById(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/noticias/${id}`).pipe(
      map(response => {
        console.log('Respuesta de la API:', response); // Depuración
        return response;
      })
    );
  }

  createNoticia(noticia: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/noticias`, noticia);
  }

  updateNoticia(id: number, noticia: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new HttpParams();
    if (noticia.titulo) body = body.set('titulo', noticia.titulo);
    if (noticia.descripcion) body = body.set('descripcion', noticia.descripcion);
    if (noticia.fecha_hora) body = body.set('fecha_hora', noticia.fecha_hora);
    if (noticia.status) body = body.set('status', noticia.status);
    if (noticia.privilegio !== undefined) body = body.set('privilegio', noticia.privilegio.toString());
    if (noticia.tags_idtags !== undefined) body = body.set('tags_idtags', noticia.tags_idtags.toString());
    if (noticia.usuariop_id !== undefined) body = body.set('usuariop_id', noticia.usuariop_id.toString());
    if (noticia.imagen) body = body.set('imagen', noticia.imagen);  // Agregar la imagen en base64

    return this.http.put(`${this.apiUrl}/noticias/${id}`, body.toString(), { headers });
  }
  
  updateNoticiaWithFormData(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/upload`, formData); // Suponiendo que tienes un endpoint para manejar el archivo
  }

  deleteNoticia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/noticias/${id}`);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<ApiResponse<{data: Tag[]}>>(`${this.apiUrl}/tags`).pipe(
      map(response => response.data.data || [])
    );
  }

  getNoticiasPaginadas(): Observable<ApiResponse<Noticia[]>> {
    return this.http.get<ApiResponse<Noticia[]>>(`${this.apiUrl}/noticias-paginadas`);
  }
}
