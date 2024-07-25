import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EtapaService } from './../../../services/etapa.service';

@Component({
  selector: 'app-add-etapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-etapa.component.html',
  styleUrls: ['./add-etapa.component.scss']
})
export class AddEtapaComponent {
  etapa: any = {};
  esGestacion: boolean = false;
  esCrecimiento: boolean = false;

  constructor(
    private etapaService: EtapaService,
    private router: Router
  ) {}

  onTipoRegistroChange(): void {
    if (this.etapa.tipo_registro_id === '1' || this.etapa.tipo_registro_id === '3') {
      this.esGestacion = true;
      this.esCrecimiento = false;
      this.etapa.etapa = 'Gestación';
    } else if (this.etapa.tipo_registro_id === '2') {
      this.esGestacion = false;
      this.esCrecimiento = true;
      this.etapa.etapa = 'Crecimiento';
    }
  }

  saveEtapa(): void {
    if (this.etapa.tipo_registro_id === '1' || this.etapa.tipo_registro_id === '3') {
      this.etapa.etapa = 'Gestación';
    } else if (this.etapa.tipo_registro_id === '2') {
      this.etapa.etapa = 'Crecimiento';
    }

    this.etapaService.createEtapa(this.etapa).subscribe(
      response => {
        this.router.navigate(['/admin/gestion-etapas']);
      },
      error => {
        console.error('Error creating etapa', error);
      }
    );
  }
}
