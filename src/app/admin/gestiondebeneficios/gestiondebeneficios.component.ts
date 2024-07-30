import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../services/beneficio.service';

@Component({
  standalone: true,
  selector: 'app-gestiondebeneficios',
  templateUrl: './gestiondebeneficios.component.html',
  styleUrls: ['./gestiondebeneficios.component.scss'],
  imports: [CommonModule]
})
export class GestiondebeneficiosComponent implements OnInit {
  beneficios: any[] = [];

  constructor(private beneficioService: BeneficioService) { }

  ngOnInit(): void {
    this.beneficioService.getBeneficios().subscribe(data => {
      this.beneficios = data;
    });
  }

  deleteBeneficio(id: number): void {
    this.beneficioService.deleteBeneficio(id).subscribe(response => {
      this.beneficios = this.beneficios.filter(beneficio => beneficio.id !== id);
    });
  }
}
