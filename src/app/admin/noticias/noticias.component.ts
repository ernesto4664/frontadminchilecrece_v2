import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.interface';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  errorMessage: string = '';

  constructor(
    private noticiaService: NoticiaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.noticiaService.getNoticiasPaginadas().subscribe({
      next: (response) => {
        this.noticias = response.data || [];
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las noticias. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }

  eliminarNoticia(id: number | undefined): void {
    if (id !== undefined && confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.noticiaService.deleteNoticia(id).subscribe({
        next: () => {
          this.noticias = this.noticias.filter(noticia => noticia.idnoticia !== id);
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la noticia. Inténtalo de nuevo más tarde.';
          console.error(error);
        }
      });
    }
  }

  verDetalle(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/admin/noticias', id]);
    }
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
