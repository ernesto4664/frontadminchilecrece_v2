import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';  
import { RegionService } from '../../../services/region.service';  
import { BeneficioService } from '../../../services/beneficio.service';  

@Component({
  selector: 'app-add-notificacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-notificacion.component.html',
  styleUrls: ['./add-notificacion.component.scss'],
})
export class AddNotificacionComponent implements OnInit {
  tipoNotificacion: string = '';
  noticias: any[] = [];  // Almacenar todas las noticias
  beneficios: any[] = [];  // Almacenar todos los beneficios
  regiones: any[] = [];  // Almacenar todas las regiones
  comunas: any[] = [];  // Almacenar todas las comunas

  selectedNoticias: any[] = [];  // Almacenar las noticias seleccionadas con todos sus detalles
  selectedBeneficios: any[] = [];  // Almacenar los beneficios seleccionados con todos sus detalles
  selectedRegion: string = '';
  selectedComuna: string = '';

  targetAudience: string = 'todos';
  fechaProgramada: string = '';
  fechaCreacion: string = '';

  ofertaMunicipal: any = {
    nombre: '',
    descripcion: '',
    archivo: null,
    url: '',
  };

  constructor(
    private noticiaService: NoticiaService,
    private regionService: RegionService,
    private beneficioService: BeneficioService
  ) {}

  ngOnInit() {
    this.loadRegiones();  // Cargar las regiones al iniciar
  }

  onTipoNotificacionChange(event: any) {
    this.tipoNotificacion = event.target.value;

    // Reiniciar los valores seleccionados
    this.selectedNoticias = [];
    this.selectedBeneficios = [];
    this.selectedRegion = '';
    this.selectedComuna = '';

    // Cargar las noticias o beneficios según el tipo de notificación seleccionado
    if (this.tipoNotificacion === 'noticia') {
      console.log('Tipo de notificación es noticia, cargando noticias...');
      this.loadNoticias();  // Cargar noticias
    } else if (this.tipoNotificacion === 'beneficio') {
      console.log('Tipo de notificación es beneficio, cargando beneficios...');
      this.loadBeneficios();  // Cargar beneficios
    }
  }

  onFileSelected(event: any) {
    this.ofertaMunicipal.archivo = event.target.files[0];
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.target.value;
    this.loadComunasForRegion(this.selectedRegion);
  }

  loadRegiones() {
    this.regionService.getRegiones().subscribe(
      (data) => {
        this.regiones = data;
        console.log('Regiones cargadas:', this.regiones);
      },
      (error) => {
        console.error('Error al cargar regiones:', error);
      }
    );
  }

  loadComunasForRegion(regionId: string) {
    this.regionService.getComunasByRegions([+regionId]).subscribe(
      (data) => {
        this.comunas = data;
        console.log('Comunas cargadas:', this.comunas);
      },
      (error) => {
        console.error('Error al cargar comunas:', error);
      }
    );
  }

  loadNoticias() {
    this.noticiaService.getNoticias().subscribe(
      (data) => {
        console.log('Respuesta cruda de noticias:', data);

        if (data && Array.isArray(data) && data.length > 0) {
          this.noticias = data.map(noticia => ({
            id: noticia.idnoticia,  // Aquí usamos 'idnoticia' según el formato de la API
            titulo: noticia.titulo
          }));
        } else {
          console.warn('No se encontraron noticias.');
        }

        console.log('Noticias cargadas:', this.noticias);
      },
      (error) => {
        console.error('Error al cargar noticias:', error);
      }
    );
  }

  loadBeneficios() {
    this.beneficioService.getBeneficios().subscribe(
      (data) => {
        console.log('Respuesta cruda de beneficios:', data);

        if (data && Array.isArray(data) && data.length > 0) {
          this.beneficios = data.map(beneficio => ({
            id: beneficio.id,
            nombre: beneficio.nombre
          }));
        } else {
          console.warn('No se encontraron beneficios.');
        }

        console.log('Beneficios cargados:', this.beneficios);
      },
      (error) => {
        console.error('Error al cargar beneficios:', error);
      }
    );
  }

  onCheckboxChange(event: any, id: number, type: string) {
    const checked = event.target.checked;

    if (type === 'beneficio') {
        if (checked) {
            // Llamar a getBeneficio para obtener los detalles completos del beneficio
            this.beneficioService.getBeneficio(id).subscribe(
                (beneficioDetalle) => {
                    console.log('Detalles completos del beneficio seleccionado:', beneficioDetalle);
                    this.selectedBeneficios.push(beneficioDetalle); // Almacenar todos los detalles del beneficio

                    // Manejar regiones y comunas específicas del beneficio
                    if (beneficioDetalle.regiones && beneficioDetalle.regiones.length > 0) {
                        this.regiones = beneficioDetalle.regiones; // Cargar solo las regiones del beneficio
                        this.selectedRegion = this.regiones[0].id; // Seleccionar la primera región como predeterminada
                        this.comunas = beneficioDetalle.comunas || []; // Cargar las comunas asociadas
                        this.selectedComuna = this.comunas.length > 0 ? this.comunas[0].id : ''; // Seleccionar la primera comuna como predeterminada, si existe
                    }
                },
                (error) => {
                    console.error('Error al obtener los detalles del beneficio:', error);
                }
            );
        } else {
            this.selectedBeneficios = this.selectedBeneficios.filter(beneficio => beneficio.id !== id);
            this.selectedRegion = '';
            this.selectedComuna = '';
        }
        console.log('Beneficios seleccionados:', this.selectedBeneficios);
    } else if (type === 'noticia') {
        if (checked) {
            this.noticiaService.getNoticiaById(id).subscribe(
                (noticiaDetalle) => {
                    console.log('Detalles completos de la noticia seleccionada:', noticiaDetalle);
                    this.selectedNoticias.push(noticiaDetalle); // Almacenar todos los detalles de la noticia
                },
                (error) => {
                    console.error('Error al obtener los detalles de la noticia:', error);
                }
            );
        } else {
            this.selectedNoticias = this.selectedNoticias.filter(noticia => noticia.id !== id);
        }
        console.log('Noticias seleccionadas:', this.selectedNoticias);
    }
}

  crearNotificacion() {
    const notificacionData = {
      tipoNotificacion: this.tipoNotificacion,
      noticias: this.selectedNoticias,  // Enviar todas las noticias seleccionadas con detalles completos
      beneficios: this.selectedBeneficios,  // Enviar todos los beneficios seleccionados con detalles completos
      regionId: this.selectedRegion,
      comunaId: this.selectedComuna,
      targetAudience: this.targetAudience,
      scheduled_time: this.fechaProgramada,  // Programar el envío de la notificación
      fecha_creacion: this.fechaCreacion,  // Fecha de creación de la notificación
      ofertaMunicipal: this.tipoNotificacion === 'ofertaMunicipal' ? this.ofertaMunicipal : null,
    };

    console.log('Notificación creada:', notificacionData);
    // Aquí se realizaría la llamada al servicio para guardar la notificación
  }
}
