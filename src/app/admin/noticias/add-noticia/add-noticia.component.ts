import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../../services/noticia.service';
import { format } from 'date-fns';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-add-noticia',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorModule],
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.scss'],
  providers: [
    NoticiaService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' }
  ],
})
export class AddNoticiaComponent implements OnInit {
  noticia: any = {
    titulo: '',
    descripcion: '',
    imagen: null,
    fecha_hora: '',
    status: '',
    privilegio: 1,  // Default value
    tags_idtags: '',
    usuariop_id: 1  // Default value for testing purposes
  };
  errorMessage: string = '';
  tags: any[] = [];
  public editorConfig: any;

  constructor(
    private noticiaService: NoticiaService,
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
    this.loadTags();
  }

  loadTags(): void {
    this.noticiaService.getTags().subscribe({
      next: (response) => {
        console.log('Tags cargados:', response);  // Verifying the tags loaded
        this.tags = Array.isArray(response) ? response : [];
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los tags. Inténtalo de nuevo más tarde.';
        console.error(error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.noticia.imagen = file;
    }
  }

  formatDateForBackend(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

  saveNoticia(): void {
    const formData = new FormData();
    formData.append('titulo', this.noticia.titulo);
    formData.append('descripcion', this.noticia.descripcion);
    formData.append('fecha_hora', this.formatDateForBackend(this.noticia.fecha_hora));
    formData.append('status', this.noticia.status);
    formData.append('privilegio', this.noticia.privilegio.toString());
    formData.append('tags_idtags', this.noticia.tags_idtags.toString());
    formData.append('usuariop_id', this.noticia.usuariop_id.toString());

    if (this.noticia.imagen) {
      formData.append('imagen', this.noticia.imagen);
    }

    this.noticiaService.createNoticia(formData).subscribe({
      next: () => {
        alert('Noticia creada exitosamente.');
        this.router.navigate(['/admin/noticias']);
      },
      error: (error) => {
        if (error.status === 422) {
          this.errorMessage = 'Error de validación. Por favor, revisa los datos ingresados.';
          console.error('Validation errors:', error.error.errors);
        } else {
          this.errorMessage = 'Error al crear la noticia. Inténtalo de nuevo más tarde.';
        }
        console.error(error);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('AddNoticiaComponent se está destruyendo');
  }
}
