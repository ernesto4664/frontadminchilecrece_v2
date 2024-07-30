import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEstablecimientoService } from '../../services/baseestablecimiento.service';

@Component({
  standalone: true,
  selector: 'app-gestiondebaseestablecimientos',
  templateUrl: './gestiondebaseestablecimientos.component.html',
  styleUrls: ['./gestiondebaseestablecimientos.component.scss'],
  imports: [CommonModule]
})
export class GestiondebaseestablecimientosComponent implements OnInit {
  baseEstablecimientos: any[] = [];

  constructor(private baseEstablecimientoService: BaseEstablecimientoService) { }

  ngOnInit(): void {
    this.baseEstablecimientoService.getBaseEstablecimientos().subscribe(data => {
      this.baseEstablecimientos = data;
    });
  }

  deleteBaseEstablecimiento(id: number): void {
    this.baseEstablecimientoService.deleteBaseEstablecimiento(id).subscribe(response => {
      this.baseEstablecimientos = this.baseEstablecimientos.filter(baseEstablecimiento => baseEstablecimiento.id !== id);
    });
  }
}
