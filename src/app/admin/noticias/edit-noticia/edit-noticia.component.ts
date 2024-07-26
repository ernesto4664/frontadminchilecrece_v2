import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';
import { Noticia, Tag } from '../../../models/noticia.interface';

@Component({
  selector: 'app-edit-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.scss']
})
export class EditNoticiaComponent implements OnInit {
  noticia: Noticia | undefined;
  tags: Tag[] = [];
  errorMessage: string = '';
  selectedFile: File | null = null;

  titulo: string = '';
  descripcion: string = '';
  fecha_hora: string = '';
  status: string = '';
  privilegio: string | undefined;
  tags_idtags: number | undefined;
  usuariop_id: number | undefined;

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idnoticia');
    if (id) {
      const idNumber = parseInt(id, 10);
      if (!isNaN(idNumber)) {
        this.loadNoticia(idNumber);
      } else {
        console.error('ID inválido para la noticia:', id);
        this.errorMessage = 'ID inválido para la noticia.';
      }
    }
    this.loadTags();
  }

  loadNoticia(id: number): void {
    this.noticiaService.getNoticiaById(id).subscribe({
      next: (data) => {
        console.log('Noticia cargada:', data);
        this.noticia = data;
        this.titulo = data.titulo;
        this.descripcion = data.descripcion;
        this.fecha_hora = data.fecha_hora;
        this.status = data.status;
        this.privilegio = data.privilegio;
        this.tags_idtags = data.tags_idtags;
        this.usuariop_id = data.usuariop_id;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la noticia. Inténtalo de nuevo más tarde.';
        console.error('Error al cargar la noticia:', error);
      }
    });
  }

  loadTags(): void {
    this.noticiaService.getTags().subscribe({
      next: (data) => {
        console.log('Tags cargados:', data);
        this.tags = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los tags. Inténtalo de nuevo más tarde.';
        console.error('Error al cargar los tags:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async updateNoticia(): Promise<void> {
    if (!this.noticia || this.noticia.idnoticia === undefined) {
      console.error('No se ha cargado ninguna noticia para actualizar o ID de noticia no definido.');
      return;
    }

    const noticia: any = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      fecha_hora: this.fecha_hora,
      status: this.status,
      privilegio: this.privilegio,
      tags_idtags: this.tags_idtags,
      usuariop_id: this.usuariop_id
    };

    if (this.selectedFile) {
      try {
        const base64Image = await this.convertFileToBase64(this.selectedFile);
        noticia.imagen = base64Image;
      } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
        this.errorMessage = 'Error al procesar la imagen. Inténtalo de nuevo más tarde.';
        return;
      }
    }

    this.noticiaService.updateNoticia(this.noticia.idnoticia, noticia).subscribe({
      next: () => {
        console.log('Noticia actualizada exitosamente');
        this.router.navigate(['/admin/noticias']);
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar la noticia. Inténtalo de nuevo más tarde.';
        console.error('Error al actualizar la noticia:', error);
      }
    });
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }

  volver(): void {
    this.router.navigate(['/admin/noticias']);
  }
}