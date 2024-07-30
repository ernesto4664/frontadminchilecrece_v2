import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../../services/ubicacion.service';

@Component({
  standalone: true,
  selector: 'app-gestiondeubicaciones',
  templateUrl: './gestiondeubicaciones.component.html',
  styleUrls: ['./gestiondeubicaciones.component.scss'],
  imports: [CommonModule]
})
export class GestiondeubicacionesComponent implements OnInit {
  ubicaciones: any[] = [];

  constructor(private ubicacionService: UbicacionService) { }

  ngOnInit(): void {
    this.ubicacionService.getUbicaciones().subscribe(data => {
      this.ubicaciones = data;
    });
  }

  deleteUbicacion(id: number): void {
    this.ubicacionService.deleteUbicacion(id).subscribe(response => {
      this.ubicaciones = this.ubicaciones.filter(ubicacion => ubicacion.id !== id);
    });
  }
}
