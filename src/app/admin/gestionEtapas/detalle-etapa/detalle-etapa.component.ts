import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtapaService } from './../../../services/etapa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-etapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-etapa.component.html',
  styleUrls: ['./detalle-etapa.component.scss']
})
export class DetalleEtapaComponent implements OnInit {
  etapa: any = {};

  constructor(
    private route: ActivatedRoute,
    private etapaService: EtapaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('idetapa')!;
    this.etapaService.getEtapa(id).subscribe(
      data => {
        this.etapa = data;
      },
      error => {
        console.error('Error loading etapa', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin/gestion-etapas']);
  }

  goToEdit(): void {
    const id = +this.route.snapshot.paramMap.get('idetapa')!;
    this.router.navigate(['/admin/gestion-etapas/edit', id]); // Redirigir a la vista de edición
  }

  ngOnDestroy(): void {
    console.log('DetalleEtapaComponent se está destruyendo');
  }
}
