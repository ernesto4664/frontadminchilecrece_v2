import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../services/beneficio.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-gestiondebeneficios',
  templateUrl: './gestiondebeneficios.component.html',
  styleUrls: ['./gestiondebeneficios.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class GestiondebeneficiosComponent implements OnInit {
  beneficios: any[] = [];

  constructor(private beneficioService: BeneficioService, private router: Router) { }

  ngOnInit(): void {
    this.getBeneficios();
  }

  getBeneficios(): void {
    this.beneficioService.getBeneficios().subscribe(data => {
      this.beneficios = data; // Elimina el filtro temporalmente
    });
  }

  confirmDeleteBeneficio(id: number): void {
    const confirmed = confirm('¿Estás seguro de eliminar este beneficio?');
    if (confirmed) {
      this.deleteBeneficio(id);
    }
  }

  deleteBeneficio(id: number): void {
    this.beneficioService.deleteBeneficio(id).subscribe(() => {
      this.beneficios = this.beneficios.filter(beneficio => beneficio.id !== id);
    }, error => {
      console.error('Error al eliminar el beneficio:', error);
      alert('Hubo un error al eliminar el beneficio. Por favor, inténtelo de nuevo.');
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

  verDetalle(id: number): void {
    this.router.navigate([`/admin/gestiondebeneficios/${id}`]);
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }

  editarBeneficio(id: number): void {
    this.router.navigate(['/admin/gestiondebeneficios/edit', id]); // Redirigir a la vista de edición
  }
}
