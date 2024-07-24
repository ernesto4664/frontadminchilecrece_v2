import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private baseUrl = 'http://127.0.0.1:8000'; // Asegúrate de tener esto para la URL base de las imágenes

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/noticias`);
  }

  getNoticiaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/noticias/${id}`);
  }

  createNoticia(noticia: any): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', noticia.titulo);
    formData.append('descripcion', noticia.descripcion);
    formData.append('fecha_hora', noticia.fecha_hora);
    formData.append('status', noticia.status);
    formData.append('privilegio', noticia.privilegio);
    formData.append('usuariop_id', noticia.usuariop_id);
    
    if (Array.isArray(noticia.tags_idtags)) {
      formData.append('tags_idtags', JSON.stringify(noticia.tags_idtags));
    } else {
      formData.append('tags_idtags', '[]');
    }

    if (noticia.imagen) {
      formData.append('imagen', noticia.imagen);
    }

    return this.http.post(`${this.apiUrl}/noticias`, formData);
  }

  updateNoticia(id: number, noticia: any): Observable<any> {
    const formData = new FormData();
    
    if (noticia.titulo) {
      formData.append('titulo', noticia.titulo);
    }
    if (noticia.descripcion) {
      formData.append('descripcion', noticia.descripcion);
    }
    if (noticia.fecha_hora) {
      formData.append('fecha_hora', noticia.fecha_hora);
    }
    if (noticia.status) {
      formData.append('status', noticia.status);
    }
    if (noticia.privilegio) {
      formData.append('privilegio', noticia.privilegio);
    }
    if (noticia.usuariop_id) {
      formData.append('usuariop_id', noticia.usuariop_id);
    }

    if (Array.isArray(noticia.tags_idtags)) {
      formData.append('tags_idtags', JSON.stringify(noticia.tags_idtags));
    } else {
      formData.append('tags_idtags', '[]');
    }

    if (noticia.imagen) {
      formData.append('imagen', noticia.imagen);
    }

    return this.http.put(`${this.apiUrl}/noticias/${id}`, formData);
  }

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `${this.baseUrl}/${imagePath}` : '';
  }
}
