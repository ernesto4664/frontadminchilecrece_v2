import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-notificacion',
  standalone: true,
  imports: [],
  templateUrl: './detalle-notificacion.component.html',
  styleUrls: ['./detalle-notificacion.component.scss'],

})
export class DetalleNotificacionComponent {

  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
