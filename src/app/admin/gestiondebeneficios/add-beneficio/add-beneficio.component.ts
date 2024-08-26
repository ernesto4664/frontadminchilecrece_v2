import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BeneficioService } from '../../../services/beneficio.service';
import { EtapaService } from '../../../services/etapa.service';
import { RegionService } from '../../../services/region.service';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RouterModule, Router } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-beneficio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    EditorModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './add-beneficio.component.html',
  styleUrls: ['./add-beneficio.component.scss'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' }
  ]
})
export class AddBeneficioComponent implements OnInit, AfterViewInit {

  beneficioForm: FormGroup;
  etapas: any[] = [];
  regiones: any[] = [];
  comunas: any[] = [];
  filteredUbicaciones: any[] = [];
  selectedRegion: number[] = [];
  selectedComuna: number[] = [];
  public editorConfig: any;

  dropdownSettingsRegion: IDropdownSettings = {};
  dropdownSettingsComuna: IDropdownSettings = {};
  dropdownSettingsUbicacion: IDropdownSettings = {};

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
      region_id: [[], Validators.required],
      comuna_id: [[], Validators.required],
      ubicacion_id: [[], Validators.required],
      requisitos: ['', Validators.required],
      vigencia: ['', Validators.required],
      imagen: [null],
    });
  }

  ngOnInit(): void {
    this.cargarEtapas();
    this.cargarRegiones();

    // Configuración de los dropdowns con textos personalizados
    this.dropdownSettingsRegion = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar región',
    };

    this.dropdownSettingsComuna = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar comuna',
    };

    this.dropdownSettingsUbicacion = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre_establecimiento',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar ubicación',
    };

    this.beneficioForm.get('region_id')?.valueChanges.subscribe(() => {
      this.cargarComunas();
    });

    this.beneficioForm.get('comuna_id')?.valueChanges.subscribe(() => {
      this.cargarUbicaciones();
    });
  }

  ngAfterViewInit(): void {
    // Modificar el texto del select principal de Región
    const selectRegionPlaceholder = document.querySelector('.multiselect-dropdown .dropdown-btn') as HTMLElement;
    if (selectRegionPlaceholder) {
      selectRegionPlaceholder.innerText = 'Selecciona una Región';
    }
  
    // Modificar el texto del select principal de Comuna
    const selectComunaPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[1] as HTMLElement;
    if (selectComunaPlaceholder) {
      selectComunaPlaceholder.innerText = 'Selecciona una Comuna';
    }
  
    // Modificar el texto del select principal de Ubicación
    const selectUbicacionPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[2] as HTMLElement;
    if (selectUbicacionPlaceholder) {
      selectUbicacionPlaceholder.innerText = 'Selecciona una Ubicación';
    }
  }

  cargarRegiones(): void {
    this.ubicacionService.getAllRegionsWithComunasAndUbicaciones().subscribe(
      (regiones) => {
        this.regiones = regiones;
        console.log('Regiones cargadas:', this.regiones);
      },
      (error) => {
        console.error('Error al cargar regiones:', error);
      }
    );
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

  cargarComunas(): void {
    const regionIds = this.beneficioForm.get('region_id')?.value;
    
    if (regionIds && Array.isArray(regionIds) && regionIds.length > 0) {
        const regionIdsMapped = regionIds.map((region: any) => region.id);
        console.log('Regiones seleccionadas para cargar comunas:', regionIdsMapped);
        
        this.ubicacionService.getComunasByRegions(regionIdsMapped).subscribe(
            (response) => {
                console.log('Comunas cargadas:', response.comunas);
                this.comunas = response.comunas;
                this.beneficioForm.get('comuna_id')?.reset();
            },
            (error) => {
                console.error('Error al cargar comunas:', error);
            }
        );
    } else {
        console.warn('No hay regiones seleccionadas para cargar comunas.');
        this.comunas = [];
        this.beneficioForm.get('comuna_id')?.reset();
    }
}

cargarUbicaciones(): void {
  const regionIds = this.beneficioForm.get('region_id')?.value.map((region: any) => region.id);
  const comunaIds = this.beneficioForm.get('comuna_id')?.value.map((comuna: any) => comuna.id);

  if (!regionIds || regionIds.length === 0 || !comunaIds || comunaIds.length === 0) {
      console.error('No se seleccionaron regiones o comunas, no se puede cargar ubicaciones.');
      this.filteredUbicaciones = [];
      return;
  }

  console.log('Regiones seleccionadas para cargar ubicaciones:', regionIds);
  console.log('Comunas seleccionadas para cargar ubicaciones:', comunaIds);

  this.ubicacionService.getUbicacionesByRegionsAndComunas(regionIds, comunaIds).subscribe(
      (ubicaciones) => {
          // Filtramos las ubicaciones asegurándonos de que coincidan con la región y comuna seleccionadas
          this.filteredUbicaciones = ubicaciones.filter(ubicacion => 
              regionIds.includes(ubicacion.region_id) && comunaIds.includes(ubicacion.comuna_id)
          );
          console.log('Ubicaciones cargadas:', this.filteredUbicaciones);
      },
      (error) => {
          console.error('Error al cargar ubicaciones:', error);
      }
  );
}

  toggleAllEtapas(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.beneficioForm.get('etapa_id')?.setValue(this.etapas.map(etapa => etapa.id));
    } else {
      this.beneficioForm.get('etapa_id')?.setValue([]);
    }
  }

  onEtapaChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedEtapaId = +target.value;
    const currentEtapaIds = this.beneficioForm.get('etapa_id')?.value || [];

    if (target.checked) {
      this.beneficioForm.get('etapa_id')?.setValue([...currentEtapaIds, selectedEtapaId]);
    } else {
      this.beneficioForm.get('etapa_id')?.setValue(currentEtapaIds.filter((id: number) => id !== selectedEtapaId));
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
      const formData = new FormData();
      Object.entries(this.beneficioForm.value).forEach(([key, value]) => {
        if (key === 'imagen' && value instanceof File) {
          formData.append(key, value, value.name);
        } else if (key === 'etapa_id' || key === 'region_id' || key === 'comuna_id' || key === 'ubicacion_id') {
          const arrayValue = Array.isArray(value) ? value : [value];
          arrayValue.forEach((val) => {
            if (typeof val === 'object' && val !== null && 'id' in val) {
              formData.append(`${key}[]`, String(val.id));  // Asegúrate de enviar solo el ID
            } else {
              formData.append(`${key}[]`, String(val));
            }
          });
        } else {
          formData.append(key, value as string);
        }
      });
  
      this.beneficioService.addBeneficio(formData).subscribe(
        (response) => {
          console.log('Beneficio guardado con éxito', response);
          alert('Beneficio guardado con éxito');
          this.router.navigate(['/admin/gestiondebeneficios']);
        },
        (error) => {
          console.error('Error al guardar el beneficio:', error);
        }
      );
    }
  }
}
