import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../models/tag.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
// Nuevo método para redirigir a la página de edición
navigateToEdit(id: number): void {
  this.router.navigate([`/admin/tags/edit/${id}`]);
}
  tags: Tag[] = [];
  errorMessage: string = '';
  editTagId: number | null = null;
  editedTag: Partial<Tag> = {};

  constructor(
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }
  
  loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.tags = Array.isArray(response) ? response : [];
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los tags. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }
  

  editTag(tag: Tag): void {
    this.editTagId = tag.idtags;
    this.editedTag = { ...tag };
  }

  saveEdit(): void {
    if (this.editTagId !== null && this.editedTag.nombre && this.editedTag.prioridad !== undefined) {
      const tagToUpdate: Tag = {
        idtags: this.editTagId,
        nombre: this.editedTag.nombre,
        prioridad: this.editedTag.prioridad,
        created_at: null,
        updated_at: null
      };
  
      this.tagService.updateTag(this.editTagId, tagToUpdate).subscribe({
        next: () => {
          this.loadTags();
          this.editTagId = null;
          this.editedTag = {};
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el tag. Inténtalo de nuevo más tarde.';
          console.error(error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos antes de guardar.';
    }
  }
  

  cancelEdit(): void {
    this.editTagId = null;
    this.editedTag = {};
  }

  deleteTag(id: number | undefined): void {
    if (id !== undefined && confirm('¿Estás seguro de que deseas eliminar este tag?')) {
      this.tagService.deleteTag(id).subscribe({
        next: () => {
          this.tags = this.tags.filter(tag => tag.idtags !== id);
        },
        error: (error) => {
          console.error('Error deleting tag:', error); // Esto imprimirá el error completo
          this.errorMessage = `Error al eliminar el tag.`;
        }
      });
    }
  }
  
}
