import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  standalone: true,
  selector: 'app-add-ubicacion',
  templateUrl: './add-ubicacion.component.html',
  styleUrls: ['./add-ubicacion.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddUbicacionComponent {
  ubicacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private router: Router
  ) {
    this.ubicacionForm = this.fb.group({
      beneficio_id: ['', Validators.required],
      region_id: ['', Validators.required],
      comuna_id: ['', Validators.required],
      tipo_establecimiento: ['', Validators.required],
      nombre_establecimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      horarios: ['', Validators.required],
      contacto: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      id_establecimiento: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ubicacionForm.valid) {
      this.ubicacionService.addUbicacion(this.ubicacionForm.value).subscribe(
        response => {
          this.router.navigate(['/admin/gestiondeubicaciones']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
