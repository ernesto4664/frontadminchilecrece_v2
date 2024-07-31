import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RegionService } from '../../../services/region.service';
import { BaseEstablecimientoService } from '../../../services/baseestablecimiento.service';

@Component({
  standalone: true,
  selector: 'app-add-ubicacion',
  templateUrl: './add-ubicacion.component.html',
  styleUrls: ['./add-ubicacion.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddUbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;
  regiones: any[] = [];
  comunas: any[] = [];
  baseEstablecimientos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private regionService: RegionService,
    private baseEstablecimientoService: BaseEstablecimientoService,
    private router: Router
  ) {
    this.ubicacionForm = this.fb.group({
      fk_beneficio: ['', Validators.required],
      region_id: ['', Validators.required],
      comuna_id: ['', Validators.required],
      tipo_establecimiento: ['', Validators.required],
      nombre_establecimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      horarios: ['', Validators.required],
      contacto: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      codigo_madre_nuevo: ['', Validators.required],
      id_establecimiento: ['']  // Agregar id_establecimiento al formulario
    });
  }

  ngOnInit(): void {
    this.cargarRegiones();
    this.cargarBaseEstablecimientos();
  }

  cargarRegiones(): void {
    this.regionService.getRegiones().subscribe((data: any) => {
      this.regiones = data;
    });
  }

  cargarComunas(regionId: number): void {
    this.regionService.getComunasByRegion(regionId).subscribe((data: any) => {
      this.comunas = data;
    });
  }

  cargarBaseEstablecimientos(): void {
    this.baseEstablecimientoService.getBaseEstablecimientos().subscribe((data: any) => {
      this.baseEstablecimientos = data;
    });
  }

  onRegionChange(event: any): void {
    const regionId = event.target.value;
    this.cargarComunas(regionId);
  }

  onSubmit(): void {
    console.log("Form Submitted", this.ubicacionForm.value);

    if (this.ubicacionForm.valid) {
      const selectedBaseEstablecimiento = this.baseEstablecimientos.find(base => base.codigo_madre_nuevo === this.ubicacionForm.value.codigo_madre_nuevo);
      if (selectedBaseEstablecimiento) {
        this.ubicacionForm.patchValue({ id_establecimiento: selectedBaseEstablecimiento.id });
      } else {
        console.error("No se encontró el establecimiento con el código madre nuevo proporcionado.");
        return;
      }

      const formData = { ...this.ubicacionForm.value };

      // Normalizar los valores de lat y long para eliminar caracteres no numéricos
      formData.lat = formData.lat.replace(/[^0-9.-]/g, '');
      formData.long = formData.long.replace(/[^0-9.-]/g, '');

      console.log("Datos enviados:", formData);

      this.ubicacionService.addUbicacion(formData).subscribe(
        response => {
          console.log("Ubicacion guardada con éxito", response);
          this.router.navigate(['/admin/gestiondeubicaciones']);
        },
        error => {
          console.error("Error al guardar la ubicación", error);
        }
      );
    } else {
      console.log("Formulario no válido", this.ubicacionForm.errors);
    }
  }
}
