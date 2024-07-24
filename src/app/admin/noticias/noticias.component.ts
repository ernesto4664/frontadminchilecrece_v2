import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: any[] = [];
  errorMessage: string = '';

  constructor(private noticiaService: NoticiaService, private router: Router) {}

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.noticiaService.getNoticias().subscribe({
      next: (data) => {
        console.log('Noticias cargadas:', data); // Añadir depuración aquí
        this.noticias = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las noticias. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  editarNoticia(id: number): void {
    this.router.navigate([`/admin/noticias/${id}/edit`]);
  }

  eliminarNoticia(id: number): void {
    // Implementar la lógica de eliminación aquí
  }

  verDetalle(id: number): void {
    console.log('Ver detalles de la noticia con ID:', id); // Añadir depuración aquí
    this.router.navigate([`/admin/noticias/${id}`]);
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }
}
