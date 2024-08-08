// src/app/admin/usuariosapp/usuarios-list/usuarios-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosAppService } from '../../../services/usuariosapp.service';
import { HttpClientModule } from '@angular/common/http';
import { Usuario, Familiar } from '../../../models/interfaces';
import { EtapaService } from '../../../services/etapa.service';
import { Observable, forkJoin, of } from 'rxjs'; 
import { catchError, map, switchMap } from 'rxjs/operators';

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

  constructor(
    private usuariosAppService: UsuariosAppService,
    private etapaService: EtapaService
  ) {}

  ngOnInit(): void {
    this.usuariosAppService.getUsuarios().pipe(
      switchMap((response: Usuario[]) => {
        const etapaRequests: Observable<any>[] = [];

        response.forEach(usuario => {
          usuario.familiares?.forEach(familiar => {
            if (familiar.tipoderegistro_id === 1 || familiar.tipoderegistro_id === 3) {
              etapaRequests.push(
                this.etapaService.obtenerEtapaGestacion(familiar.semanas_embarazo_id).pipe(
                  map(etapa => familiar.etapa = etapa ? etapa.nombre : 'No definida'),
                  catchError(() => {
                    familiar.etapa = 'No definida';
                    return of(null);
                  })
                )
              );
            } else if (familiar.tipoderegistro_id === 2) {
              const edad = this.calcularEdad(familiar.fecha_nacimiento);
              etapaRequests.push(
                this.etapaService.obtenerEtapaCrecimiento(edad).pipe(
                  map(etapa => familiar.etapa = etapa ? etapa.nombre : 'No definida'),
                  catchError(() => {
                    familiar.etapa = 'No definida';
                    return of(null);
                  })
                )
              );
            }
          });
        });

        return forkJoin(etapaRequests).pipe(
          map(() => response)
        );
      })
    ).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
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
