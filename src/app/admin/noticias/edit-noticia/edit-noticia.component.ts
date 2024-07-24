import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';

@Component({
  selector: 'app-edit-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.scss']
})
export class EditNoticiaComponent implements OnInit {
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
  originalNoticia: any;
  errorMessage: string = '';
  tags: any[] = [];

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
    const id = this.route.snapshot.paramMap.get('idnoticia');
    if (id) {
      this.loadNoticia(parseInt(id, 10));
    }
  }

loadTags(): void {
  this.noticiaService.getTags().subscribe({
    next: (data) => {
      console.log('Datos de los tags recibidos:', data);
      this.tags = data.data;
      console.log('Tags cargados:', this.tags);
    },
    error: (error) => {
      this.errorMessage = 'Error al cargar los tags. Inténtalo de nuevo más tarde.';
      console.error(error);
    }
  });
}

  loadNoticia(id: number): void {
    this.noticiaService.getNoticiaById(id).subscribe({
      next: (data) => {
        console.log('Datos de la noticia recibidos:', data);
        this.noticia = data;
        this.originalNoticia = { ...data };
        if (typeof this.noticia.tags_idtags === 'string') {
          this.noticia.tags_idtags = JSON.parse(this.noticia.tags_idtags);
        }
        if (!Array.isArray(this.noticia.tags_idtags)) {
          this.noticia.tags_idtags = [];
        }
        console.log('Noticia cargada:', this.noticia);
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la noticia. Inténtalo de nuevo más tarde.';
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
    const formData = new FormData();

    Object.keys(this.noticia).forEach(key => {
      if (key === 'imagen' && this.noticia[key] !== this.originalNoticia[key]) {
        formData.append(key, this.noticia[key]);
      } else if (key === 'tags_idtags') {
        const originalTags = JSON.stringify(this.originalNoticia[key] || []);
        const currentTags = JSON.stringify(this.noticia[key] || []);
        if (originalTags !== currentTags) {
          formData.append(key, currentTags);
        }
      } else if (this.noticia[key] !== this.originalNoticia[key]) {
        formData.append(key, this.noticia[key]);
      }
    });

    this.noticiaService.updateNoticia(this.noticia.idnoticia, formData).subscribe({
      next: () => {
        alert('Noticia actualizada exitosamente.');
        this.router.navigate(['/admin/noticias']);
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar la noticia. Inténtalo de nuevo más tarde.';
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
    console.log(`Tag encontrado para ID ${tagId}:`, tag);
    return tag ? tag.nombre : '';
  }
}
