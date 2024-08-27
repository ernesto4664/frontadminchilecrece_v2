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
  invisibleForm!: FormGroup;
  originalValues: any;
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
    // Inicializamos ambos formularios
    this.inicializarFormularioVisible();
    this.inicializarFormularioInvisible();

    // Verificamos que el control 'nombre' esté correctamente inicializado
    this.verificarNombreControl();

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

// Inicializamos el formulario visible
private inicializarFormularioVisible(): void {
  this.beneficioForm = this.formBuilder.group({
    nombre: [''],
    descripcion: [''],
    tipo_usuario: [''],
    etapa_id: [''],
    tipo_beneficio: [''],
    requisitos: [''],
    vigencia: [''],
    region_id: [[]], // Agregamos todos los campos para mantener consistencia
    comuna_id: [[]],
    ubicacion_id: [[]],
    imagen: [null] // Para manejar la imagen, si aplica
  });

  // Verificación y configuración del control 'nombre'
  const nombreControl = this.beneficioForm.get('nombre');
  if (nombreControl) {
    console.log('Control "nombre" inicializado correctamente:', nombreControl);
    nombreControl.setValidators([Validators.required]);
    nombreControl.updateValueAndValidity();
  } else {
    console.error('El control "nombre" no está disponible.');
  }
}

// Inicializamos el formulario invisible
private inicializarFormularioInvisible(): void {
  this.invisibleForm = this.formBuilder.group({
    nombre: [''], // Mantenemos todos los campos en ambos formularios
    descripcion: [''],
    tipo_usuario: [''],
    etapa_id: [''],
    tipo_beneficio: [''],
    requisitos: [''],
    vigencia: [''],
    region_id: [[]],
    comuna_id: [[]],
    ubicacion_id: [[]],
    imagen: [null] // Para manejar la imagen, si aplica
  });

  // Verificación de los controles del formulario invisible
  this.verificarControlInvisible('region_id');
  this.verificarControlInvisible('comuna_id');
  this.verificarControlInvisible('ubicacion_id');
  // Repetir esta verificación para todos los demás controles si es necesario
}

// Método de verificación para controles en el formulario invisible
private verificarControlInvisible(controlName: string): void {
  const control = this.invisibleForm.get(controlName);
  if (control) {
    console.log(`Control "${controlName}" inicializado correctamente:`, control);
  } else {
    console.error(`El control "${controlName}" no está disponible.`);
  }
}

private verificarNombreControl(): void {
  const nombreControl = this.beneficioForm.get('nombre');
  
  if (nombreControl) {
    console.log('Control "nombre" inicializado correctamente:', nombreControl);
    nombreControl.setValidators([Validators.required]);
    nombreControl.updateValueAndValidity(); // Actualiza el estado del control después de establecer los validadores
  } else {
    console.error('El control "nombre" es nulo o no se encuentra inicializado.');
  }
}

ngAfterViewInit(): void {
    this.modificarPlaceholdersDropdowns();
}

ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}

private cargarBeneficio(id: number): void {
  this.beneficioService.getBeneficio(id).subscribe(
    (beneficio) => {
      if (this.beneficioForm && this.invisibleForm) {
        this.originalValues = { ...beneficio };

        // Verifica que los controles existen antes de intentar parcharlos
        if (this.beneficioForm.get('nombre')) {
          this.beneficioForm.patchValue({
            nombre: beneficio.nombre || '',
            descripcion: beneficio.descripcion || '',
            tipo_usuario: beneficio.tipo_usuario || '',
            etapa_id: beneficio.etapa_id || '',
            tipo_beneficio: beneficio.tipo_beneficio || '',
            requisitos: beneficio.requisitos || '',
            vigencia: beneficio.vigencia || '',
          });
        } else {
          console.error('El formulario o uno de sus controles no está disponible.');
        }

        // Parchar el formulario invisible si los controles existen
        if (this.invisibleForm.get('region_id')) {
          this.invisibleForm.patchValue({
            region_id: beneficio.region_id || [],
            comuna_id: beneficio.comuna_id || [],
            ubicacion_id: beneficio.ubicacion_id || [],
          });
        } else {
          console.error('El formulario invisible o uno de sus controles no está disponible.');
        }

        console.log('Beneficio cargado:', this.beneficioForm.value);
        console.log('Valores originales guardados:', this.originalValues);
      } else {
        console.error('Formulario no inicializado.');
      }
    },
    (error) => {
      console.error('Error al cargar el beneficio:', error);
    }
  );
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
  const regionControl = this.beneficioForm.get('region_id');
  const comunaControl = this.beneficioForm.get('comuna_id');

  if (regionControl) {
    regionControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((valor) => {
        if (valor && valor.length > 0) {
          this.cargarComunas();
        } else {
          this.comunas = [];
          if (comunaControl) {
            comunaControl.reset();
          }
        }
      });
  } else {
    console.error('El control "region_id" no está disponible.');
  }

  if (comunaControl) {
    comunaControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((valor) => {
        if (valor && valor.length > 0) {
          this.cargarUbicaciones();
        } else {
          this.filteredUbicaciones = [];
          const ubicacionControl = this.beneficioForm.get('ubicacion_id');
          if (ubicacionControl) {
            ubicacionControl.reset();
          }
        }
      });
  } else {
    console.error('El control "comuna_id" no está disponible.');
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

onSubmit(): void {
  console.log('onSubmit() se ha llamado');
  
  // Verificar el contenido de los formularios antes de crear el FormData
  console.log('Contenido del formulario visible:', this.beneficioForm.value);
  console.log('Contenido del formulario invisible:', this.invisibleForm.value);

  if (this.beneficioForm.valid && this.invisibleForm.valid) {
    const beneficioId = this.route.snapshot.paramMap.get('id');
    console.log('Beneficio ID:', beneficioId);

    if (beneficioId) {
      // Combina los valores actualizados de ambos formularios
      const updatedValuesVisible = this.getUpdatedValues(this.beneficioForm.value, this.originalValues);
      const updatedValuesInvisible = this.getUpdatedValues(this.invisibleForm.value, this.originalValues);

      console.log('Valores actualizados antes de enviar (visible):', updatedValuesVisible);
      console.log('Valores actualizados antes de enviar (invisible):', updatedValuesInvisible);

      // Crear FormData combinando los valores visibles e invisibles
      const formData = this.createFormData({
        ...this.originalValues,
        ...updatedValuesInvisible,
        ...updatedValuesVisible
      });
      console.log('FormData preparado para enviar:', formData);

      // Verificar todos los campos del FormData antes de enviarlo
      formData.forEach((value, key) => {
        console.log(`FormData enviado: ${key}: ${value}`);
      });

      // Realizar la solicitud para actualizar el beneficio
      this.beneficioService.editBeneficio(+beneficioId, formData).subscribe(
        (response) => {
          console.log('Beneficio actualizado correctamente:', response);
          this.router.navigate(['/admin/gestiondebeneficios']);
        },
        (error) => {
          console.error('Error al actualizar el beneficio:', error);
        }
      );
    }
  } else {
    console.warn('Uno o ambos formularios no son válidos');
  }
}

// Método para obtener los valores combinados
private getUpdatedValues(newValues: any, originalValues: any): any {
  const updatedValues: any = {};

  if (newValues && originalValues) {
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] !== undefined && originalValues[key] !== undefined) {
        updatedValues[key] = newValues[key] !== originalValues[key] ? newValues[key] : originalValues[key];
      } else if (newValues[key] !== undefined) {
        updatedValues[key] = newValues[key];
      }
    });
  } else {
    console.error('newValues u originalValues no son válidos:', { newValues, originalValues });
  }

  return updatedValues;
}

private createFormData(formValue: any): FormData {
  const formData = new FormData();

  Object.entries(formValue).forEach(([key, value]) => {
    if (key === 'imagen' && value instanceof File) {
      formData.append(key, value, value.name);
    } else if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => {
        if (typeof item === 'object' && item !== null && 'id' in item) {
          formData.append(`${key}[]`, String(item.id));
        } else {
          formData.append(`${key}[]`, String(item));
        }
      });
    } else if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value as string);
      console.log(`FormData enviado: ${key}: ${value}`);
    }
  });

  console.log('FormData completo:', formData);
  return formData;
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
  const etapaControl = this.beneficioForm.get('etapa_id'); // Obtén el control 'etapa_id'

  if (etapaControl) { // Verifica si el control existe antes de acceder a él
    const currentEtapaIds = etapaControl.value || [];

    if (target.checked) {
      etapaControl.setValue([...currentEtapaIds, selectedEtapaId]);
    } else {
      etapaControl.setValue(
        currentEtapaIds.filter((id: number) => id !== selectedEtapaId)
      );
    }
  } else {
    console.error('El control "etapa_id" no está disponible.');
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

private marcarCamposComoTocados() {
  Object.keys(this.beneficioForm.controls).forEach(field => {
    const control = this.beneficioForm.get(field);
    if (control) {
      control.markAsTouched({ onlySelf: true });
    }
  });
}

}