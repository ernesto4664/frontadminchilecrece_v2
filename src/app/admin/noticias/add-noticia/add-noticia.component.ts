import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';

@Component({
  selector: 'app-add-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.scss']
})
export class AddNoticiaComponent implements OnInit {
  noticia: any = {
    titulo: '',
    descripcion: '',
    imagen: null,
    fecha_hora: '',
    status: '',
    privilegio: '',
    tags_idtags: [],
    usuariop_id: '1'
  };
  errorMessage: string = '';
  tags: any[] = [];

  constructor(
    public noticiaService: NoticiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.noticiaService.getTags().subscribe({
      next: (data) => {
        this.tags = data.data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los tags. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.noticia.imagen = file;
    }
  }

  addTag(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const tagId = parseInt(selectElement.value, 10);
    const tag = this.tags.find(t => t.idtags === tagId);
    if (tag && !this.noticia.tags_idtags.some((t: any) => t === tagId)) {
      this.noticia.tags_idtags.push(tagId);
    }
    selectElement.value = ''; // Clear the selection
  }

  saveNoticia(): void {
    this.noticiaService.createNoticia(this.noticia).subscribe({
      next: () => {
        alert('Noticia creada exitosamente.');
        this.router.navigate(['/admin/noticias']);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la noticia. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  deleteTag(tagId: number): void {
    this.noticia.tags_idtags = this.noticia.tags_idtags.filter((tag: any) => tag !== tagId);
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }

  getTagNameById(tagId: number): string {
    const tag = this.tags.find(t => t.idtags === tagId);
    return tag ? tag.nombre : '';
  }
}
