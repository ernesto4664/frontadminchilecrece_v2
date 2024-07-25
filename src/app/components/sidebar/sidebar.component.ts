import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuState: { [key: string]: boolean } = {
    noticias: false,
    tags: false,
    etapas: false,
    usuariosapp: false,
  };

  toggleMenu(menu: string): void {
    this.menuState[menu] = !this.menuState[menu];
  }
}
