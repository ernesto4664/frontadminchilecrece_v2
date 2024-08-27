import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../services/tag.service'; // Asegúrate de tener este servicio

@Component({
  selector: 'app-add-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {
  tag: any = {
    nombre: '',
    prioridad: null
  };
  errorMessage: string = '';

  constructor(
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveTag(): void {
    this.tagService.createTag(this.tag).subscribe({
      next: () => {
        alert('Tag creado exitosamente.');
        this.router.navigate(['/admin/tags']);
      },
      error: (error: { status: number; error: { errors: any; }; }) => {
        if (error.status === 422) {
          this.errorMessage = 'Error de validación. Por favor, revisa los datos ingresados.';
          console.error('Validation errors:', error.error.errors);
        } else {
          this.errorMessage = 'Error al crear el tag. Inténtalo de nuevo más tarde.';
        }
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
