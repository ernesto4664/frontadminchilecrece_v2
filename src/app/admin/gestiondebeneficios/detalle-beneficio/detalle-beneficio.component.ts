import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../../services/beneficio.service';
import { Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.beneficioId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.beneficioService.getBeneficio(this.beneficioId).subscribe(data => {
      this.beneficio = data;
    });
  }

  getFullImageUrl(imagePath: string | File | null | undefined): string {
    if (imagePath instanceof File) {
      return URL.createObjectURL(imagePath);
    }
    const url = imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : 'assets/default-image.png';
    return url;
  }

  volver(): void {
    this.router.navigate(['/admin/gestiondebeneficios']);
  }
}
