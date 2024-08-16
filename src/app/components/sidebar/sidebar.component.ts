import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  menuState: { [key: string]: boolean } = {
    noticias: false,
    tags: false,
    etapas: false,
    usuariosapp: false,
    beneficios: false,
    ubicaciones: false,
    baseestablecimientos: false,
    notificaciones: false
  };

  toggleMenu(menu: string): void {
    this.menuState[menu] = !this.menuState[menu];
  }
}
