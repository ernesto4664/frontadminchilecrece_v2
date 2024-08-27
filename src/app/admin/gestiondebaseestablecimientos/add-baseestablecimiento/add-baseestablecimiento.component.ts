import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseEstablecimientoService } from '../../../services/baseestablecimiento.service';

@Component({
  standalone: true,
  selector: 'app-add-baseestablecimiento',
  templateUrl: './add-baseestablecimiento.component.html',
  styleUrls: ['./add-baseestablecimiento.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddBaseEstablecimientoComponent {
  baseEstablecimientoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private baseEstablecimientoService: BaseEstablecimientoService,
    private router: Router
  ) {
    this.baseEstablecimientoForm = this.fb.group({
      codigo_antiguo: ['', Validators.required],
      codigo_vigente: ['', Validators.required],
      codigo_madre_antiguo: ['', Validators.required],
      codigo_madre_nuevo: ['', Validators.required],
      codigo_region: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.baseEstablecimientoForm.valid) {
      this.baseEstablecimientoService.addBaseEstablecimiento(this.baseEstablecimientoForm.value).subscribe(
        response => {
          this.router.navigate(['/admin/gestiondebaseestablecimientos']);
        },
        error => {
          console.error('Error occurred while adding base establecimiento:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
