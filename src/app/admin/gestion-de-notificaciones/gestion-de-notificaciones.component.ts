import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-de-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-de-notificaciones.component.html',
  styleUrls: ['./gestion-de-notificaciones.component.scss'],
})
export class GestiondeNotificacionesComponent {
  ngOnDestroy(): void {
    console.log('UsuariosListComponent se está destruyendo');
  }
}
