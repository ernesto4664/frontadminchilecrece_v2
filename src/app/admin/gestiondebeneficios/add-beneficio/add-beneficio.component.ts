import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BeneficioService } from '../../../services/beneficio.service';
import { EtapaService } from '../../../services/etapa.service';
import { RegionService } from '../../../services/region.service';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RouterModule, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-beneficio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, EditorModule],
  templateUrl: './add-beneficio.component.html',
  styleUrls: ['./add-beneficio.component.scss'],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' }]
})

export class AddBeneficioComponent implements OnInit {
  beneficioForm: FormGroup;
  etapas: any[] = [];
  regiones: any[] = [];
  comunas: any[] = [];
  ubicaciones: any[] = [];
  public editorConfig: any;

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficioService,
    private etapaService: EtapaService,
    private regionService: RegionService,
    private ubicacionService: UbicacionService,
    private router: Router // Inyecta el Router para redirecciones
  ) {
    this.editorConfig = {
      height: 500,
      menubar: false,
      plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
      toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
               'alignleft aligncenter alignright alignjustify | ' +
               'bullist numlist outdent indent | removeformat | help',
      external_plugins: {
        'advlist': '/assets/tinymce/plugins/advlist/plugin.min.js',
        'autolink': '/assets/tinymce/plugins/autolink/plugin.min.js',
        'lists': '/assets/tinymce/plugins/lists/plugin.min.js',
        'link': '/assets/tinymce/plugins/link/plugin.min.js',
        'image': '/assets/tinymce/plugins/image/plugin.min.js',
        'charmap': '/assets/tinymce/plugins/charmap/plugin.min.js',
        'preview': '/assets/tinymce/plugins/preview/plugin.min.js',
        'anchor': '/assets/tinymce/plugins/anchor/plugin.min.js',
        'searchreplace': '/assets/tinymce/plugins/searchreplace/plugin.min.js',
        'visualblocks': '/assets/tinymce/plugins/visualblocks/plugin.min.js',
        'code': '/assets/tinymce/plugins/code/plugin.min.js',
        'fullscreen': '/assets/tinymce/plugins/fullscreen/plugin.min.js',
        'insertdatetime': '/assets/tinymce/plugins/insertdatetime/plugin.min.js',
        'media': '/assets/tinymce/plugins/media/plugin.min.js',
        'table': '/assets/tinymce/plugins/table/plugin.min.js',
        'help': '/assets/tinymce/plugins/help/plugin.min.js',
        'wordcount': '/assets/tinymce/plugins/wordcount/plugin.min.js'
      },
      license_key: 'dwdmqn666qc4ee5f4f4zmw0gei5lppsqh93g8oikwe0jvwnx'
    };
    this.beneficioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      etapa_id: [[], Validators.required],
      tipo_beneficio: ['', Validators.required],
      region_id: ['', Validators.required],
      comuna_id: ['', Validators.required],
      ubicacion_id: ['', Validators.required],
      requisitos: ['', Validators.required],
      vigencia: ['', Validators.required],
      imagen: [null], // Cambiado a null para manejar archivos
    });
  }

  ngOnInit(): void {
    this.cargarEtapas();
    this.cargarRegiones();
    this.cargarUbicaciones();
  }

  cargarEtapas(): void {
    this.beneficioForm.get('tipo_usuario')?.valueChanges.subscribe((tipoUsuario) => {
      if (tipoUsuario) {
        this.etapaService.getEtapasByTipoUsuario(tipoUsuario).subscribe((etapas) => {
          this.etapas = etapas;
        });
      }
    });
  }

  cargarRegiones(): void {
    this.regionService.getRegiones().subscribe((regiones) => {
      this.regiones = regiones;
    });
  }

  cargarUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe((ubicaciones) => {
      this.ubicaciones = ubicaciones;
    });
  }

  onRegionChange(event: any): void {
    const regionId = event.target.value;
    this.regionService.getComunasByRegion(regionId).subscribe((comunas) => {
      this.comunas = comunas;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.beneficioForm.patchValue({
        imagen: file
      });
    }
  }

  onSubmit(): void {
    if (this.beneficioForm.valid) {
      console.log('Formulario válido:', this.beneficioForm.value);

      const formData = new FormData();
      Object.entries(this.beneficioForm.value).forEach(([key, value]) => {
        if (key === 'imagen' && value instanceof File) {
          formData.append(key, value, value.name);
        } else if (key === 'etapa_id') {
          const etapasArray = Array.isArray(value) ? value : [value];
          etapasArray.forEach((val) => formData.append(`${key}[]`, String(val)));
        } else {
          formData.append(key, value as string);
        }
      });

      console.log('Datos del FormData:', formData);

      this.beneficioService.addBeneficio(formData).subscribe(
        (response) => {
          console.log('Beneficio guardado con éxito', response);
          alert('Beneficio guardado con éxito'); // Mensaje de alerta simple
          this.router.navigate(['/admin/gestiondebeneficios']); // Redirige a la página de gestión de beneficios
        },
        (error) => {
          console.error('Error al guardar el beneficio:', error);
        }
      );
    }
  }
}
