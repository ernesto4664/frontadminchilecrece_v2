import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../models/tag.interface';

@Component({
  selector: 'app-edit-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit {
  tag: Tag | null = null; // Asegúrate de inicializarlo como null
  errorMessage: string = '';

  constructor(
    private tagService: TagService,
    private router: Router,
    private route: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTag(Number(id));
    }
  }
  
  loadTag(id: number): void {
    this.tagService.getTagById(id).subscribe({
      next: (response: Tag) => {
        this.tag = response;
        console.log('Tag cargado:', this.tag); // Depuración
      },
      error: (error: any) => {
        this.errorMessage = 'Error al cargar el tag. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }
  

  updateTag(): void {
    if (this.tag && this.tag.idtags) {
      this.tagService.updateTag(this.tag.idtags, this.tag).subscribe({
        next: () => {
          alert('Tag actualizado exitosamente.');
          this.router.navigate(['/admin/tags']);
        },
        error: (error: any) => {
          if (error.status === 422) {
            this.errorMessage = 'Error de validación. Por favor, revisa los datos ingresados.';
            console.error('Validation errors:', error.error.errors);
          } else {
            this.errorMessage = 'Error al actualizar el tag. Inténtalo de nuevo más tarde.';
          }
          console.error(error);
        }
      });
    }
  }
}
