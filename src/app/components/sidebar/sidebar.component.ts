import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit, OnDestroy {
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

  // Inicializa como null para mayor claridad
  isSidebarOpen = false;
  private sidebarSubscription: Subscription | null = null;

  constructor(
    private eRef: ElementRef,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado del sidebar para actualizar la variable local
    this.sidebarSubscription = this.sidebarService.sidebarStatus$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
     // console.log('Sidebar status changed in component:', isOpen);
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  toggleMenu(menu: string): void {
    this.menuState[menu] = !this.menuState[menu];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
  
    // Verifica si el clic no se realizó en el botón del menú o dentro del sidebar
    if (!this.eRef.nativeElement.contains(clickedElement) && 
        !clickedElement.closest('.navbar-menu') && 
        this.isSidebarOpen) {
      this.closeSidebar();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.closeSidebar();
    }
  }

  // Usar el servicio para alternar el estado del sidebar
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  // Usar el servicio para cerrar el sidebar
  closeSidebar(): void {
    this.sidebarService.closeSidebar();
  }
}
