import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  standalone: true,
  selector: 'app-edit-ubicacion',
  templateUrl: './edit-ubicacion.component.html',
  styleUrls: ['./edit-ubicacion.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditUbicacionComponent implements OnInit {
  ubicacionForm: FormGroup;
  ubicacionId: number;

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private router: Router,
    private route: ActivatedRoute
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
    this.ubicacionId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ubicacionService.getUbicacion(this.ubicacionId).subscribe(data => {
      this.ubicacionForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.ubicacionForm.valid) {
      this.ubicacionService.editUbicacion(this.ubicacionId, this.ubicacionForm.value).subscribe(
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
