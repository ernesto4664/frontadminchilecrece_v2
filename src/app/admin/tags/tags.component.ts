import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: any[] = [];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe({
      next: (data) => {
        this.tags = data;
      },
      error: (error) => {
        console.error('Error al cargar los tags', error);
      }
    });
  }

  crearTag(): void {
    // Lógica para crear un nuevo tag
  }

  editarTag(id: number): void {
    // Lógica para editar un tag
  }

  eliminarTag(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este tag?')) {
      this.tagService.deleteTag(id).subscribe({
        next: () => {
          this.tags = this.tags.filter(tag => tag.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el tag', error);
        }
      });
    }
  }
}
