import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../services/beneficio.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-gestiondebeneficios',
  templateUrl: './gestiondebeneficios.component.html',
  styleUrls: ['./gestiondebeneficios.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class GestiondebeneficiosComponent implements OnInit {
  beneficios: any[] = [];

  constructor(private beneficioService: BeneficioService) { }

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
}
