import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeneficioService } from '../../../services/beneficio.service';

@Component({
  standalone: true,
  selector: 'app-edit-beneficio',
  templateUrl: './edit-beneficio.component.html',
  styleUrls: ['./edit-beneficio.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditBeneficioComponent implements OnInit {
  beneficioForm: FormGroup;
  beneficioId: number;

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficioService,
    private router: Router,
    private route: ActivatedRoute
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
    this.beneficioId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.beneficioService.getBeneficio(this.beneficioId).subscribe(data => {
      this.beneficioForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.beneficioForm.valid) {
      this.beneficioService.editBeneficio(this.beneficioId, this.beneficioForm.value).subscribe(
        response => {
          this.router.navigate(['/admin/gestiondebeneficios']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
