import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtapaService } from '../../../services/etapa.service';

@Component({
  selector: 'app-edit-etapa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-etapa.component.html',
  styleUrls: ['./edit-etapa.component.scss']
})
export class EditEtapaComponent implements OnInit {
  etapa: any = {};
  esGestacion: boolean = false;
  esCrecimiento: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private etapaService: EtapaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etapaService.getEtapa(id).subscribe(
      data => {
        this.etapa = data;
        this.onTipoRegistroChange();
      },
      error => {
        console.error('Error loading etapa', error);
      }
    );
  }

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

  updateEtapa(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.etapa.tipo_registro_id === '1' || this.etapa.tipo_registro_id === '3') {
      this.etapa.etapa = 'Gestación';
    } else if (this.etapa.tipo_registro_id === '2') {
      this.etapa.etapa = 'Crecimiento';
    }

    this.etapaService.updateEtapa(id, this.etapa).subscribe(
      response => {
        this.router.navigate(['/admin/gestion-etapas']);
      },
      error => {
        console.error('Error updating etapa', error);
      }
    );
  }
}
