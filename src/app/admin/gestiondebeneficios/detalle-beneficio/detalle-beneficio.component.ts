import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../../services/beneficio.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-detalle-beneficio',
  templateUrl: './detalle-beneficio.component.html',
  styleUrls: ['./detalle-beneficio.component.scss'],
  imports: [CommonModule]
})
export class DetalleBeneficioComponent implements OnInit {
  beneficio: any;
  beneficioId: number;

  constructor(
    private beneficioService: BeneficioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.beneficioId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.beneficioService.getBeneficio(this.beneficioId).subscribe({
      next: (data) => {
        this.beneficio = data;
      },
      error: (err) => {
        console.error('Error al cargar el beneficio:', err);
        alert('Error al cargar el beneficio. Inténtelo nuevamente.');
      }
    });
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    if (imagePath) {
      // Si la ruta ya contiene '/storage/', no se agrega de nuevo
      return imagePath.startsWith('/storage/')
        ? `http://127.0.0.1:8000${imagePath}`
        : `http://127.0.0.1:8000/storage/${imagePath}`;
    }
    return 'assets/default-image.png'; // Ruta a una imagen por defecto si no se proporciona imagen
  }

  volver(): void {
    this.router.navigate(['/admin/gestiondebeneficios']);
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
