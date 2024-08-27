import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseEstablecimientoService } from '../../../services/baseestablecimiento.service';

@Component({
  standalone: true,
  selector: 'app-detalle-baseestablecimiento',
  templateUrl: './detalle-baseestablecimiento.component.html',
  styleUrls: ['./detalle-baseestablecimiento.component.scss'],
  imports: [CommonModule]
})
export class DetalleBaseEstablecimientoComponent implements OnInit {
  baseEstablecimiento: any;
  baseEstablecimientoId: number;

  constructor(
    private baseEstablecimientoService: BaseEstablecimientoService,
    private route: ActivatedRoute
  ) {
    this.baseEstablecimientoId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.baseEstablecimientoService.getBaseEstablecimiento(this.baseEstablecimientoId).subscribe(data => {
      this.baseEstablecimiento = data;
    });
  }

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
