import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../../services/beneficio.service';

@Component({
  standalone: true,
  selector: 'app-detalle-beneficio',
  templateUrl: './detalle-beneficio.component.html',
  styleUrls: ['./detalle-beneficio.component.scss'],
  imports: [CommonModule]
})
export class DetalleBeneficioComponent implements OnInit {
  beneficio: any;
  beneficioId: number;

  constructor(
    private beneficioService: BeneficioService,
    private route: ActivatedRoute
  ) {
    this.beneficioId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.beneficioService.getBeneficio(this.beneficioId).subscribe(data => {
      this.beneficio = data;
    });
  }
}
