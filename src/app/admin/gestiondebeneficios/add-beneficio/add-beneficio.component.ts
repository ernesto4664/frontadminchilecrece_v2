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
  filteredUbicaciones: any[] = [];
  public editorConfig: any;

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficioService,
    private etapaService: EtapaService,
    private regionService: RegionService,
    private ubicacionService: UbicacionService,
    private router: Router
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
      region_id: [[], Validators.required], // Cambiado a array para selección múltiple
      comuna_id: [[], Validators.required], // Cambiado a array para selección múltiple
      ubicacion_id: [[], Validators.required], // Cambiado a array para selección múltiple
      requisitos: ['', Validators.required],
      vigencia: ['', Validators.required],
      imagen: [null], // Cambiado a null para manejar archivos
    });
  }

  ngOnInit(): void {
    this.cargarEtapas();
    this.cargarRegiones();
    this.beneficioForm.get('region_id')?.valueChanges.subscribe(() => {
      this.cargarComunas();
      this.cargarUbicaciones();
    });
    this.beneficioForm.get('comuna_id')?.valueChanges.subscribe(() => {
      this.cargarUbicaciones();
    });
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

  cargarComunas(): void {
    const regionIds = this.beneficioForm.get('region_id')?.value;
    if (regionIds && regionIds.length > 0) {
      this.regionService.getComunasByRegions(regionIds).subscribe((comunas) => {
        this.comunas = comunas;
        this.beneficioForm.get('comuna_id')?.reset();
      });
    } else {
      this.comunas = [];
      this.beneficioForm.get('comuna_id')?.reset();
    }
  }

  cargarUbicaciones(): void {
    const regionIds = this.beneficioForm.get('region_id')?.value;
    const comunaIds = this.beneficioForm.get('comuna_id')?.value;
    if (regionIds && comunaIds && regionIds.length > 0 && comunaIds.length > 0) {
      this.ubicacionService.getUbicacionesByRegionAndComuna(regionIds, comunaIds).subscribe((ubicaciones) => {
        this.filteredUbicaciones = ubicaciones;
      });
    } else {
      this.filteredUbicaciones = [];
    }
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
        } else if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}[]`, String(val)));
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
