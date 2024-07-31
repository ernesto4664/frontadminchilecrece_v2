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

  constructor(private beneficioService: BeneficioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBeneficios();
  }

  getBeneficios(): void {
    this.beneficioService.getBeneficios().subscribe(data => {
      this.beneficios = this.filterBeneficios(data);
    });
  }

  filterBeneficios(beneficios: any[]): any[] {
    const uniqueBeneficios = [];
    const seenEtapaIds = new Set();

    for (const beneficio of beneficios) {
      const etapaIds = beneficio.etapas.map((etapa: any) => etapa.id);
      const hasDuplicateEtapa = etapaIds.some((etapaId: number) => seenEtapaIds.has(etapaId));

      if (!hasDuplicateEtapa) {
        uniqueBeneficios.push(beneficio);
        etapaIds.forEach((etapaId: number) => seenEtapaIds.add(etapaId));
      }
    }

    return uniqueBeneficios;
  }

  deleteBeneficio(id: number): void {
    this.beneficioService.deleteBeneficio(id).subscribe(() => {
      this.beneficios = this.beneficios.filter(beneficio => beneficio.id !== id);
    });
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    // Ajustar la URL para que apunte a la carpeta 'storage'
    const url = imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'assets/default-image.png';
    console.log('Image URL:', url); // Debug
    return url;
  }

  verDetalle(id: number): void {
    this.router.navigate([`/admin/gestiondebeneficios/${id}`]);
  }

}
