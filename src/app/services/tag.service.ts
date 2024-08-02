import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag,ApiResponse } from '../models/tag.interface';


@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://127.0.0.1:8000/api/tags';

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<ApiResponse<{ data: Tag[] }>>(`${this.apiUrl}`).pipe(
      map(response => {
        console.log('Respuesta de la API al obtener tags:', response);
        return response.data.data || [];
      })
    );
  }

  getTagById(id: number): Observable<Tag> {
    return this.http.get<ApiResponse<Tag>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<ApiResponse<Tag>>(this.apiUrl, tag).pipe(
      map(response => response.data)
    );
  }

  updateTag(id: number, tag: Tag): Observable<any> {
    return this.http.put<ApiResponse<Tag>>(`${this.apiUrl}/${id}`, tag).pipe(
      map(response => response.data)
    );
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
