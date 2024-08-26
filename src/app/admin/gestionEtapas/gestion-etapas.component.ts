import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EtapaService } from './../../services/etapa.service';

@Component({
  selector: 'app-gestion-etapas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-etapas.component.html',
  styleUrls: ['./gestion-etapas.component.scss']
})
export class GestionEtapasComponent implements OnInit {
  etapas: any[] = [];
  router: any;

  constructor(private etapaService: EtapaService) {}

  ngOnInit(): void {
    this.loadEtapas();
  }

  loadEtapas(): void {
    this.etapaService.getEtapas().subscribe(
      data => this.etapas = data,
      error => console.error('Error loading etapas', error)
    );
  }

  deleteEtapa(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta etapa?')) {
      this.etapaService.deleteEtapa(id).subscribe(
        () => this.loadEtapas(),
        error => console.error('Error deleting etapa', error)
      );
    }
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }

  editEtapa(etapaId: number): void {
    this.router.navigate(['/admin/gestion-etapas/edit', etapaId]);
  }
}
