import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficioService } from '../../../services/beneficio.service';
import { RegionService } from '../../../services/region.service';
import { EtapaService } from '../../../services/etapa.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-beneficio',
  templateUrl: './add-beneficio.component.html',
  styleUrls: ['./add-beneficio.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class AddBeneficioComponent implements OnInit {
  beneficioForm: FormGroup;
  etapas: any[] = [];
  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficioService,
    private regionService: RegionService,
    private etapaService: EtapaService,
    private router: Router
  ) {
    this.beneficioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      etapa_id: ['', Validators.required],
      tipo_beneficio: ['', Validators.required],
      region_id: ['', Validators.required],
      comuna_id: ['', Validators.required],
      requisitos: ['', Validators.required],
      vigencia: ['', Validators.required],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.regionService.getRegiones().subscribe(data => {
      this.regiones = data;
    });

    this.beneficioForm.get('tipo_usuario')?.valueChanges.subscribe(tipoUsuario => {
      this.cargarEtapas(tipoUsuario);
    });

    this.beneficioForm.get('region_id')?.valueChanges.subscribe(regionId => {
      this.cargarComunas(regionId);
    });
  }

  cargarEtapas(tipoUsuario: string): void {
    this.etapaService.getEtapasByTipoUsuario(tipoUsuario).subscribe(etapas => {
      this.etapas = [
        { id: 'all', nombre: 'Seleccionar todas las etapas' },
        ...etapas
      ];
    });
  }

  cargarComunas(regionId: number): void {
    this.regionService.getComunasByRegion(regionId).subscribe(data => {
      this.comunas = data;
    });
  }

  onSubmit(): void {
    if (this.beneficioForm.valid) {
      this.beneficioService.addBeneficio(this.beneficioForm.value).subscribe(
        response => {
          this.router.navigate(['/admin/gestiondebeneficios']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
