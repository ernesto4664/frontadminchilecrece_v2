import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../../../services/ubicacion.service';

@Component({
  standalone: true,
  selector: 'app-detalle-ubicacion',
  templateUrl: './detalle-ubicacion.component.html',
  styleUrls: ['./detalle-ubicacion.component.scss'],
  imports: [CommonModule]
})
export class DetalleUbicacionComponent implements OnInit {
  ubicacion: any;
  ubicacionId: number;

  constructor(
    private ubicacionService: UbicacionService,
    private route: ActivatedRoute
  ) {
    this.ubicacionId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.ubicacionService.getUbicacion(this.ubicacionId).subscribe(data => {
      this.ubicacion = data;
    });
  }
}
