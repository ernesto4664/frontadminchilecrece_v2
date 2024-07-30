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
      codigoantiguo: ['', Validators.required],
      codigovigente: ['', Validators.required],
      codigomadreantiguo: ['', Validators.required],
      codigomadrenuevo: ['', Validators.required],
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
          console.error(error);
        }
      );
    }
  }
}
