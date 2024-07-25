// src/app/models/interfaces.ts
export interface Familiar {
    id: number;
    usuarioP_id: number;
    nombres: string;
    apellidos: string;
    sexo: string | null;
    fecha_nacimiento: string;
    semanas_embarazo_id: number | null;
    parentesco: string;
    created_at: string;
    updated_at: string;
    tipoderegistro_id: number;
    etapaactual_id: number | null;
    etapa?: string;
  }
  
  export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    region?: { nombre: string };
    comuna?: { nombre: string };
    fecha_nacimiento?: string;
    familiares?: Familiar[];
  }
  