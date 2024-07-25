// src/app/admin/usuariosapp/usuarios-list/usuarios-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAppService } from '../../../services/usuariosapp.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario, Familiar } from '../../../models/interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  errorMessage: string | null = null;

  constructor(private usuariosAppService: UsuariosAppService) {}

  ngOnInit(): void {
    this.usuariosAppService.getUsuarios().subscribe(
      (response: Usuario[]) => {
        response.forEach(usuario => {
          usuario.familiares?.forEach(familiar => {
            if (familiar.tipoderegistro_id === 1 || familiar.tipoderegistro_id === 3) {
              familiar.etapa = 'Gestación';
            } else if (familiar.tipoderegistro_id === 2) {
              familiar.etapa = 'Crecimiento';
            }
          });
        });
        this.usuarios = response;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los usuarios; intente nuevamente más tarde.';
        console.error('An error occurred:', error);
      }
    );
  }

  calcularEdad(fechaNacimiento: string | undefined): number | null {
    if (!fechaNacimiento) {
      return null;
    }
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
