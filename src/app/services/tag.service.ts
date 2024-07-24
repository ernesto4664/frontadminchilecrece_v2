import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getTags(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tags`);
  }

  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tags`, tag);
  }

  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tags/${id}`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tags/${id}`);
  }
}