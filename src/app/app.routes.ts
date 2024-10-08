import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LoginCallbackComponent } from '../app/auth/login-callback/login-callback.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NoticiasComponent } from './admin/noticias/noticias.component';
import { TagsComponent } from './admin/tags/tags.component';
import { AddTagComponent } from './admin/tags/add-tag/add-tag.component';
import { EditTagComponent } from './admin/tags/edit-tag/edit-tag.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddNoticiaComponent } from './admin/noticias/add-noticia/add-noticia.component';
import { DetalleNoticiaComponent } from './admin/noticias/detalle-noticia/detalle-noticia.component';
import { EditNoticiaComponent } from './admin/noticias/edit-noticia/edit-noticia.component';
import { UsuariosListComponent } from './admin/usuariosapp/usuarios-list/usuarios-list.component';
import { GestionEtapasComponent } from './admin/gestionEtapas/gestion-etapas.component';
import { AddEtapaComponent } from './admin/gestionEtapas/add-etapa/add-etapa.component';
import { EditEtapaComponent } from './admin/gestionEtapas/edit-etapa/edit-etapa.component';
import { DetalleEtapaComponent } from './admin/gestionEtapas/detalle-etapa/detalle-etapa.component';

import { GestiondebeneficiosComponent } from './admin/gestiondebeneficios/gestiondebeneficios.component';
import { AddBeneficioComponent } from './admin/gestiondebeneficios/add-beneficio/add-beneficio.component';
import { EditBeneficioComponent } from './admin/gestiondebeneficios/edit-beneficio/edit-beneficio.component';
import { DetalleBeneficioComponent } from './admin/gestiondebeneficios/detalle-beneficio/detalle-beneficio.component';

import { GestiondeubicacionesComponent } from './admin/gestiondeubicaciones/gestiondeubicaciones.component';
import { AddUbicacionComponent } from './admin/gestiondeubicaciones/add-ubicacion/add-ubicacion.component';
import { EditUbicacionComponent } from './admin/gestiondeubicaciones/edit-ubicacion/edit-ubicacion.component';
import { DetalleUbicacionComponent } from './admin/gestiondeubicaciones/detalle-ubicacion/detalle-ubicacion.component';

import { GestiondebaseestablecimientosComponent } from './admin/gestiondebaseestablecimientos/gestiondebaseestablecimientos.component';
import { AddBaseEstablecimientoComponent } from './admin/gestiondebaseestablecimientos/add-baseestablecimiento/add-baseestablecimiento.component';
import { EditBaseEstablecimientoComponent } from './admin/gestiondebaseestablecimientos/edit-baseestablecimiento/edit-baseestablecimiento.component';
import { DetalleBaseEstablecimientoComponent } from './admin/gestiondebaseestablecimientos/detalle-baseestablecimiento/detalle-baseestablecimiento.component';

import { GestiondeNotificacionesComponent } from './admin/gestion-de-notificaciones/gestion-de-notificaciones.component';
import { AddNotificacionComponent } from './admin/gestion-de-notificaciones/add-notificacion/add-notificacion.component';
import { EditNotificacionComponent } from './admin/gestion-de-notificaciones/edit-notificacion/edit-notificacion.component';
import { DetalleNotificacionComponent } from './admin/gestion-de-notificaciones/detalle-notificacion/detalle-notificacion.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },

  // Esta redirección lleva a la página de login si la URL está vacía
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Ruta principal que usa el LayoutComponent para el resto de las rutas
  {
    path: '', component: LayoutComponent, children: [
      { path: 'admin', component: DashboardComponent },
      { path: 'admin/noticias', component: NoticiasComponent },
      { path: 'admin/noticias/add', component: AddNoticiaComponent },
      { path: 'admin/noticias/edit/:idnoticia', component: EditNoticiaComponent },
      { path: 'admin/noticias/:idnoticia', component: DetalleNoticiaComponent },
      { path: 'admin/tags', component: TagsComponent },
      { path: 'admin/tags/add', component: AddTagComponent },
      { path: 'admin/tags/edit/:id', component: EditTagComponent },
      { path: 'admin/gestion-etapas', component: GestionEtapasComponent },
      { path: 'admin/gestion-etapas/add', component: AddEtapaComponent },
      { path: 'admin/gestion-etapas/edit/:idetapa', component: EditEtapaComponent },
      { path: 'admin/gestion-etapas/:idetapa', component: DetalleEtapaComponent },
      { path: 'admin/usuariosapp', component: UsuariosListComponent },

      { path: 'admin/gestiondebeneficios', component: GestiondebeneficiosComponent },
      { path: 'admin/gestiondebeneficios/add', component: AddBeneficioComponent },
      { path: 'admin/gestiondebeneficios/edit/:id', component: EditBeneficioComponent },
      { path: 'admin/gestiondebeneficios/:id', component: DetalleBeneficioComponent },

      { path: 'admin/gestiondeubicaciones', component: GestiondeubicacionesComponent },
      { path: 'admin/gestiondeubicaciones/add', component: AddUbicacionComponent },
      { path: 'admin/gestiondeubicaciones/edit/:id', component: EditUbicacionComponent },
      { path: 'admin/gestiondeubicaciones/:id', component: DetalleUbicacionComponent },

      { path: 'admin/gestiondebaseestablecimientos', component: GestiondebaseestablecimientosComponent },
      { path: 'admin/gestiondebaseestablecimientos/add', component: AddBaseEstablecimientoComponent },
      { path: 'admin/gestiondebaseestablecimientos/edit/:id', component: EditBaseEstablecimientoComponent },
      { path: 'admin/gestiondebaseestablecimientos/:id', component: DetalleBaseEstablecimientoComponent },

      { path: 'admin/gestiondenotificaciones', component: GestiondeNotificacionesComponent },
      { path: 'admin/gestiondenotificaciones/add', component: AddNotificacionComponent },
      { path: 'admin/gestiondenotificaciones/edit/:id', component: EditNotificacionComponent },
      { path: 'admin/gestiondenotificaciones/:id', component: DetalleNotificacionComponent },
    ]
  }
];
