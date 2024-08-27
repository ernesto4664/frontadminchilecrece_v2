import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';
import { RegionService } from '../../../services/region.service';
import { BaseEstablecimientoService } from '../../../services/baseestablecimiento.service';
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  standalone: true,
  selector: 'app-add-ubicacion',
  templateUrl: './add-ubicacion.component.html',
  styleUrls: ['./add-ubicacion.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule]
})
export class AddUbicacionComponent implements OnInit, AfterViewInit {
  ubicacionForm: FormGroup;
  regiones: any[] = [];
  comunas: any[] = [];
  baseEstablecimientos: any[] = [];

  dropdownSettingsRegion: IDropdownSettings = {};
  dropdownSettingsComuna: IDropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private regionService: RegionService,
    private baseEstablecimientoService: BaseEstablecimientoService,
    private router: Router
  ) {
    this.ubicacionForm = this.fb.group({
      fk_beneficio: [''],
      region_id: [[], Validators.required],
      comuna_id: [[], Validators.required],
      tipo_establecimiento: [''],
      nombre_establecimiento: ['', Validators.required],
      direccion: [''],
      horarios: [''],
      contacto: [''],
      lat: [''],
      long: [''],
      codigo_madre_nuevo: ['', Validators.required],
      id_establecimiento: ['']
    });
  }

  ngOnInit(): void {
    this.cargarRegiones();
    this.cargarBaseEstablecimientos();
    this.ubicacionForm.get('region_id')?.valueChanges.subscribe(() => {
      this.cargarComunas();
    });

    this.dropdownSettingsRegion = {
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar región',
      defaultOpen: false,
    };

    this.dropdownSettingsComuna = {
      singleSelection: true,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar todas',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar comuna',
    };
  }

  ngAfterViewInit(): void {
    // Modificar el texto del select principal de Región
    const selectRegionPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[0] as HTMLElement;
    if (selectRegionPlaceholder) {
      selectRegionPlaceholder.innerText = 'Selecciona una Región';
    }
  
    // Modificar el texto del select principal de Comuna
    const selectComunaPlaceholder = document.querySelectorAll('.multiselect-dropdown .dropdown-btn')[1] as HTMLElement;
    if (selectComunaPlaceholder) {
      selectComunaPlaceholder.innerText = 'Selecciona una Comuna';
    }
  }

  cargarRegiones(): void {
    this.regionService.getRegiones().subscribe((data: any) => {
      this.regiones = data;
    });
  }

  cargarComunas(): void {
    const regionIds = this.ubicacionForm.get('region_id')?.value.map((region: any) => region.id);
    console.log('Regiones seleccionadas para cargar comunas:', regionIds);
    if (regionIds && regionIds.length > 0) {
        this.ubicacionService.getComunasByRegions(regionIds).subscribe(
            (comunas) => {
                console.log('Comunas cargadas:', comunas);
                this.comunas = comunas;
                this.ubicacionForm.get('comuna_id')?.reset();
            },
            (error) => {
                console.error('Error al cargar comunas:', error);
            }
        );
    } else {
        this.comunas = [];
        this.ubicacionForm.get('comuna_id')?.reset();
    }
  }


  cargarBaseEstablecimientos(): void {
    this.baseEstablecimientoService.getBaseEstablecimientos().subscribe((data: any) => {
      this.baseEstablecimientos = data;
      console.log('Base Establecimientos cargados:', this.baseEstablecimientos);
    }, error => {
      console.error('Error al cargar los establecimientos base:', error);
    });
  }

  onSubmit(): void {
    // Lógica para manejar la sumisión del formulario.
  }
}
