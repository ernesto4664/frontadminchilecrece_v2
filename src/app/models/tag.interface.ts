// src/app/interfaces/tag.interface.ts
export interface Tag {
    idtags: number;
    nombre: string;
    prioridad: number;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface TagResponse {
    current_page: number;
    data: Tag[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  export interface ApiResponse<T> {
    message: string;
    data: T;
  }