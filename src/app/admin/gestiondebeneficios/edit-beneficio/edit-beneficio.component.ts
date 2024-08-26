import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BeneficioService } from '../../../services/beneficio.service';
import { EtapaService } from '../../../services/etapa.service';
import { RegionService } from '../../../services/region.service';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-beneficio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    EditorModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './edit-beneficio.component.html',
  styleUrls: ['./edit-beneficio.component.scss'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' }
  ]
})
export class EditBeneficioComponent implements OnInit, AfterViewInit, OnDestroy {
  beneficioForm!: FormGroup;
  etapas: any[] = [];
  regiones: any[] = [];
  comunas: any[] = [];
  filteredUbicaciones: any[] = [];
  dropdownSettingsRegion: IDropdownSettings = {};
  dropdownSettingsComuna: IDropdownSettings = {};
  dropdownSettingsUbicacion: IDropdownSettings = {};
  public editorConfig: any;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private beneficioService: BeneficioService,
    private etapaService: EtapaService,
    private regionService: RegionService,
    private ubicacionService: UbicacionService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  ngOnInit(): void {
    // Inicializamos el formulario
    this.inicializarFormulario();

    // Verificamos que el control 'nombre' esté correctamente inicializado
    const nombreControl = this.beneficioForm.get('nombre');
    if (nombreControl) {
        console.log('Control "nombre" inicializado correctamente:', nombreControl);

        // Añadimos el validador al control 'nombre' para asegurarnos que se hace después de la inicialización
        nombreControl.addValidators(Validators.required);
    } else {
        console.error('El control "nombre" es nulo.');
    }

    // Verificamos si hay un ID de beneficio en la ruta para cargar sus datos
    const beneficioId = this.route.snapshot.paramMap.get('id');
    if (beneficioId) {
        this.cargarBeneficio(+beneficioId);
    }

    // Cargamos las etapas, regiones y configuramos los dropdowns
    this.cargarEtapas();
    this.cargarRegiones();
    this.configurarDropdowns();

    // Nos suscribimos a los cambios del formulario
    this.suscribirseACambiosFormulario();
}

private inicializarFormulario(): void {
  this.beneficioForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    tipo_usuario: ['', Validators.required],
    etapa_id: ['', Validators.required],
    tipo_beneficio: ['', Validators.required],
    region_id: [[]], // Suponiendo que sea un array por el multiselect
    comuna_id: [[]], // Suponiendo que sea un array por el multiselect
    ubicacion_id: [[]], // Suponiendo que sea un array por el multiselect
    requisitos: [''],
    vigencia: ['']
  });

  // Verificar que el control 'nombre' esté correctamente configurado
  const nombreControl = this.beneficioForm.get('nombre');
  if (nombreControl) {
    nombreControl.addValidators(Validators.required);
  } else {
    console.error('El control "nombre" no está disponible.');
  }

  console.log('Form initialized:', this.beneficioForm);
}

  ngAfterViewInit(): void {
    this.modificarPlaceholdersDropdowns();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configurarDropdowns(): void {
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
  }

  private suscribirseACambiosFormulario(): void {
    this.beneficioForm.get('region_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((valor) => {
        if (valor && valor.length > 0) {
          this.cargarComunas();
        } else {
          this.comunas = [];
          this.beneficioForm.get('comuna_id')?.reset();
        }
      });

    this.beneficioForm.get('comuna_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((valor) => {
        if (valor && valor.length > 0) {
          this.cargarUbicaciones();
        } else {
          this.filteredUbicaciones = [];
          this.beneficioForm.get('ubicacion_id')?.reset();
        }
      });
  }

  private modificarPlaceholdersDropdowns(): void {
    const selectRegionPlaceholder = document.querySelector('.multiselect-dropdown .dropdown-btn') as HTMLElement;
    if (selectRegionPlaceholder) {
      selectRegionPlaceholder.innerText = 'Selecciona una Región';
    }

    const selectComunaPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[1] as HTMLElement;
    if (selectComunaPlaceholder) {
      selectComunaPlaceholder.innerText = 'Selecciona una Comuna';
    }

    const selectUbicacionPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[2] as HTMLElement;
    if (selectUbicacionPlaceholder) {
      selectUbicacionPlaceholder.innerText = 'Selecciona una Ubicación';
    }
  }

  cargarRegiones(): void {
    this.ubicacionService.getAllRegionsWithComunasAndUbicaciones().subscribe(
      (regiones) => {
        this.regiones = regiones;
      },
      (error) => {
        console.error('Error al cargar regiones:', error);
      }
    );
  }

  cargarEtapas(): void {
    this.beneficioForm.get('tipo_usuario')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((tipoUsuario) => {
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
      this.ubicacionService.getComunasByRegions(regionIdsMapped).subscribe(
        (response) => {
          this.comunas = response.comunas;
          this.beneficioForm.get('comuna_id')?.reset();
        },
        (error) => {
          console.error('Error al cargar comunas:', error);
        }
      );
    } else {
      this.comunas = [];
      this.beneficioForm.get('comuna_id')?.reset();
    }
  }

  cargarUbicaciones(): void {
    const regionIds = this.beneficioForm.get('region_id')?.value;
    const comunaIds = this.beneficioForm.get('comuna_id')?.value;

    if (
      regionIds &&
      Array.isArray(regionIds) &&
      regionIds.length > 0 &&
      comunaIds &&
      Array.isArray(comunaIds) &&
      comunaIds.length > 0
    ) {
      const regionIdsMapped = regionIds.map((region: any) => region.id);
      const comunaIdsMapped = comunaIds.map((comuna: any) => comuna.id);

      this.ubicacionService.getUbicacionesByRegionsAndComunas(regionIdsMapped, comunaIdsMapped).subscribe(
        (ubicaciones) => {
          this.filteredUbicaciones = ubicaciones.filter(
            (ubicacion) =>
              regionIdsMapped.includes(ubicacion.region_id) &&
              comunaIdsMapped.includes(ubicacion.comuna_id)
          );
        },
        (error) => {
          console.error('Error al cargar ubicaciones:', error);
        }
      );
    } else {
      this.filteredUbicaciones = [];
    }
  }

  private cargarBeneficio(id: number): void {
    this.beneficioService.getBeneficio(id).subscribe(
      (beneficio) => {
        if (this.beneficioForm) {
          this.beneficioForm.patchValue({
            nombre: beneficio.nombre || '',
            descripcion: beneficio.descripcion || '',
            region_id: beneficio.region_id || [],
            comuna_id: beneficio.comuna_id || [],
            ubicacion_id: beneficio.ubicacion_id || [],
            tipo_registro_id: beneficio.tipo_registro_id || '',
            tipo_usuario: beneficio.tipo_usuario || '',
            requisitos: beneficio.requisitos || '',
            vigencia: beneficio.vigencia || '',
          });

          // Verificar que el control 'nombre' esté correctamente configurado
          const nombreControl = this.beneficioForm.get('nombre');
          if (nombreControl) {
            nombreControl.addValidators(Validators.required);
          } else {
            console.error('El control "nombre" no está disponible.');
          }

          if (this.hasValidSelection(beneficio.region_id)) {
            this.cargarComunas();
          }

          if (this.hasValidSelection(beneficio.comuna_id)) {
            this.cargarUbicaciones();
          }

          console.log('Beneficio cargado:', this.beneficioForm.value);
        } else {
          console.error('Formulario no inicializado.');
        }
      },
      (error) => {
        console.error('Error al cargar el beneficio:', error);
      }
    );
  }

  private hasValidSelection(selection: any[]): boolean {
    return Array.isArray(selection) && selection.length > 0;
  }

  toggleAllEtapas(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.beneficioForm.get('etapa_id')?.setValue(this.etapas.map((etapa) => etapa.id));
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
      this.beneficioForm.get('etapa_id')?.setValue(
        currentEtapaIds.filter((id: number) => id !== selectedEtapaId)
      );
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.beneficioForm.patchValue({
        imagen: file,
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/gestiondebeneficios']);
  }

  onSubmit(): void {
    if (this.beneficioForm.valid) {
      const formData = this.createFormData(this.beneficioForm.value);
      const beneficioId = this.route.snapshot.paramMap.get('id');

      if (beneficioId) {
        this.beneficioService.editBeneficio(+beneficioId, formData).subscribe(
          (response) => {
            this.router.navigate(['/admin/gestiondebeneficios']);
          },
          (error) => {
            console.error('Error al actualizar el beneficio:', error);
          }
        );
      }
    } else {
      console.warn('El formulario no es válido');
    }
  }

  private createFormData(formValue: any): FormData {
    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
      if (key === 'imagen' && value instanceof File) {
        formData.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === 'object' && item !== null && 'id' in item) {
            formData.append(`${key}[]`, String(item.id));
          } else {
            formData.append(`${key}[]`, String(item));
          }
        });
      } else {
        formData.append(key, value as string);
      }
    });
    return formData;
  }
}
