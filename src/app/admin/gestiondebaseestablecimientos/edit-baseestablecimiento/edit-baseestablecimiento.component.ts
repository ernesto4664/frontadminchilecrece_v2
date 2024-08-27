import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseEstablecimientoService } from '../../../services/baseestablecimiento.service';

@Component({
  standalone: true,
  selector: 'app-edit-baseestablecimiento',
  templateUrl: './edit-baseestablecimiento.component.html',
  styleUrls: ['./edit-baseestablecimiento.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditBaseEstablecimientoComponent implements OnInit {
  baseEstablecimientoForm: FormGroup;
  baseEstablecimientoId: number;

  constructor(
    private fb: FormBuilder,
    private baseEstablecimientoService: BaseEstablecimientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.baseEstablecimientoForm = this.fb.group({
      codigoantiguo: ['', Validators.required],
      codigovigente: ['', Validators.required],
      codigomadreantiguo: ['', Validators.required],
      codigomadrenuevo: ['', Validators.required],
      codigo_region: ['', Validators.required],
    });
    this.baseEstablecimientoId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.baseEstablecimientoService.getBaseEstablecimiento(this.baseEstablecimientoId).subscribe(data => {
      this.baseEstablecimientoForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.baseEstablecimientoForm.valid) {
      this.baseEstablecimientoService.editBaseEstablecimiento(this.baseEstablecimientoId, this.baseEstablecimientoForm.value).subscribe(
        response => {
          this.router.navigate(['/admin/gestiondebaseestablecimientos']);
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
