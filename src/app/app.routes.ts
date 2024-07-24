import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NoticiasComponent } from './admin/noticias/noticias.component';
import { TagsComponent } from './admin/tags/tags.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddNoticiaComponent } from './admin/noticias/add-noticia/add-noticia.component';
import { DetalleNoticiaComponent } from './admin/noticias/detalle-noticia/detalle-noticia.component';
import { EditNoticiaComponent } from './admin/noticias/edit-noticia/edit-noticia.component';
import { UsuariosListComponent } from '../app/admin/usuariosapp/usuarios-list/usuarios-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
      { path: 'admin', component: DashboardComponent },
      { path: 'admin/noticias', component: NoticiasComponent },
      { path: 'admin/noticias/add', component: AddNoticiaComponent },
      { path: 'admin/noticias/edit/:idnoticia', component: EditNoticiaComponent },
      { path: 'admin/noticias/:idnoticia', component: DetalleNoticiaComponent },
      { path: 'admin/tags', component: TagsComponent },
      { path: 'usuariosapp', component: UsuariosListComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
