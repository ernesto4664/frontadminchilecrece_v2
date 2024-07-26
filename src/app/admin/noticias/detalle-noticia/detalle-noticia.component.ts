import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../../services/noticia.service';
import { Noticia } from '../../../models/noticia.interface';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {
  noticia: Noticia | undefined;
  errorMessage: string = '';

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idnoticia');
      console.log('ID de la noticia:', id); // Depuración
      if (id) {
        const idNumber = parseInt(id, 10);
        if (!isNaN(idNumber)) {
          this.loadNoticia(idNumber);
        } else {
          console.error('ID inválido para la noticia:', id);
          this.errorMessage = 'ID inválido para la noticia.';
        }
      } else {
        console.error('No se encontró el ID de la noticia en la ruta.');
        this.errorMessage = 'No se encontró el ID de la noticia en la ruta.';
      }
    });
  }

  loadNoticia(id: number): void {
    this.noticiaService.getNoticiaById(id).subscribe({
      next: (data) => {
        console.log('Datos de la noticia:', data); // Depuración
        this.noticia = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la noticia. Inténtalo de nuevo más tarde.';
        console.error('Error al obtener la noticia:', error); // Depuración
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin/noticias']);
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }
}
