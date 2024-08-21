import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EtapaService } from '../../../services/etapa.service';
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
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.etapaService.getEtapa(id).subscribe(
      data => {
        this.etapa = data;
        this.onTipoRegistroChange();
      },
      error => {
        console.error('Error loading etapa', error);
      }
    );
  }

  onTipoRegistroChange(): void {
    if (this.etapa.tipo_registro_id === '1' || this.etapa.tipo_registro_id === '3') {
      this.esGestacion = true;
      this.esCrecimiento = false;
      this.etapa.etapa = 'Gestación';
    } else if (this.etapa.tipo_registro_id === '2') {
      this.esGestacion = false;
      this.esCrecimiento = true;
      this.etapa.etapa = 'Crecimiento';
    }
  }

  updateEtapa(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.etapa.tipo_registro_id === '1' || this.etapa.tipo_registro_id === '3') {
      this.etapa.etapa = 'Gestación';
    } else if (this.etapa.tipo_registro_id === '2') {
      this.etapa.etapa = 'Crecimiento';
    }

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
    console.log('UsuariosListComponent se está destruyendo');
  }
}
