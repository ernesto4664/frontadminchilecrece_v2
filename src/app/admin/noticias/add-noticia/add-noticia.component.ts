import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-add-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    privilegio: 1,  // Default value
    tags_idtags: '',
    usuariop_id: 1  // Default value for testing purposes
  };
  errorMessage: string = '';
  tags: any[] = [];

  constructor(
    private noticiaService: NoticiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.noticiaService.getTags().subscribe({
      next: (response) => {
        console.log('Tags cargados:', response);  // Verifying the tags loaded
        this.tags = Array.isArray(response) ? response : [];
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

  formatDateForBackend(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

  saveNoticia(): void {
    const formData = new FormData();
    formData.append('titulo', this.noticia.titulo);
    formData.append('descripcion', this.noticia.descripcion);
    formData.append('fecha_hora', this.formatDateForBackend(this.noticia.fecha_hora));
    formData.append('status', this.noticia.status);
    formData.append('privilegio', this.noticia.privilegio.toString());
    formData.append('tags_idtags', this.noticia.tags_idtags.toString());
    formData.append('usuariop_id', this.noticia.usuariop_id.toString());

    if (this.noticia.imagen) {
      formData.append('imagen', this.noticia.imagen);
    }

    this.noticiaService.createNoticia(formData).subscribe({
      next: () => {
        alert('Noticia creada exitosamente.');
        this.router.navigate(['/admin/noticias']);
      },
      error: (error) => {
        if (error.status === 422) {
          this.errorMessage = 'Error de validación. Por favor, revisa los datos ingresados.';
          console.error('Validation errors:', error.error.errors);
        } else {
          this.errorMessage = 'Error al crear la noticia. Inténtalo de nuevo más tarde.';
        }
        console.error(error);
      }
    });
  }
}
