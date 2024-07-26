export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface Noticia {
  idnoticia?: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  fecha_hora: string;
  status: string;
  privilegio: string;
  tags_idtags: number;
  usuariop_id: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  idtags: number;
  nombre: string;
  prioridad: number;
  created_at: string | null;
  updated_at: string | null;
}
