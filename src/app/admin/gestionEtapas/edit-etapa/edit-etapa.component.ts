import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtapaService } from '../../../services/etapa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-edit-etapa',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './edit-etapa.component.html',
  styleUrls: ['./edit-etapa.component.scss'],
  providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' }]
})
export class EditEtapaComponent implements OnInit {
  etapa: any = {};
  esGestacion: boolean = false;
  esCrecimiento: boolean = false;
  public editorConfig: any;

  constructor(
    private route: ActivatedRoute,
    private etapaService: EtapaService,
    private router: Router,
    private cdr: ChangeDetectorRef // ChangeDetectorRef agregado
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
    const id = Number(this.route.snapshot.paramMap.get('idetapa'));
    if (!id) {
      console.error('ID de etapa inválido');
      this.router.navigate(['/admin/gestion-etapas']);
      return;
    }
  
    this.etapaService.getEtapa(id).subscribe(
      data => {
        this.etapa = data;
        console.log('Etapa cargada:', this.etapa);
        this.onTipoRegistroChange(); // Llamada después de cargar la etapa
      },
      error => {
        console.error('Error loading etapa', error);
      }
    );
  }

  onTipoRegistroChange(): void {
    const tipoRegistroId = Number(this.etapa.tipo_registro_id); // Convertir a número
  
    console.log('Tipo de Registro cambiado:', tipoRegistroId);

    if (tipoRegistroId === 1) { // Gestación
      this.esGestacion = true;
      this.esCrecimiento = false;
    } else if (tipoRegistroId === 2) { // Crecimiento
      this.esGestacion = false;
      this.esCrecimiento = true;
    }
    
    this.cdr.detectChanges(); // Forzar la detección de cambios
    console.log('esGestacion:', this.esGestacion);
    console.log('esCrecimiento:', this.esCrecimiento);
  }

  updateEtapa(): void {
    const id = Number(this.route.snapshot.paramMap.get('idetapa')); 
    
    this.etapaService.updateEtapa(id, this.etapa).subscribe(
      response => {
        this.router.navigate(['/admin/gestion-etapas']);
      },
      error => {
        console.error('Error updating etapa', error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('EditEtapaComponent se está destruyendo');
  }

  goBack(): void {
    this.router.navigate(['/admin/gestion-etapas']);
  }
}
