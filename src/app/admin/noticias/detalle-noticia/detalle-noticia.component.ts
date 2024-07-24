import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../../services/noticia.service';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {
  noticia: any;
  errorMessage: string = '';

  constructor(public noticiaService: NoticiaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idnoticia');
    console.log('ID de la noticia:', id); // Añadir depuración aquí
    if (id) {
      const idNumber = parseInt(id, 10);
      if (!isNaN(idNumber)) {
        this.loadNoticia(idNumber);
      } else {
        console.error('ID inválido para la noticia:', id);
        this.errorMessage = 'ID inválido para la noticia.';
      }
    }
  }

  loadNoticia(id: number): void {
    this.noticiaService.getNoticiaById(id).subscribe({
      next: (data) => {
        console.log('Datos de la noticia:', data); // Añadir depuración aquí
        this.noticia = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la noticia. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin/noticias']);
  }

  getFullImageUrl(imagePath: string | undefined): string {
    return imagePath ? `http://127.0.0.1:8000${imagePath}` : 'assets/default-image.png';
  }
}
