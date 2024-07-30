import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeneficioService } from '../../../services/beneficio.service';

@Component({
  standalone: true,
  selector: 'app-add-beneficio',
  templateUrl: './add-beneficio.component.html',
  styleUrls: ['./add-beneficio.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddBeneficioComponent {
  beneficioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficioService,
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
