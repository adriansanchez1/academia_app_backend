import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() user: User;
  titulo = 'Detalle usuario';
  private imagenSeleccionada: File;
  progreso = 0;

  constructor(private usersService: UsersService, public modalService: ModalService) { }

  ngOnInit() {

  }

  seleccionarImagen(event) {
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.imagenSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionando imagen', 'Imagen debe ser del tipo imagen', 'error');
    }
  }

  subirImagen() {
    if (!this.imagenSeleccionada) {
      swal.fire('Error upload', 'Debe seleccionar una imágen', 'error');
    } else {
      this.usersService.subirFoto(this.imagenSeleccionada, this.user.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
              this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
              const response: any = event.body;
              this.user = response.user as User;
              this.modalService.notificarUpload.emit(this.user);
              swal.fire('La imagen se ha cargado correctamente', response.mensaje, 'success');
          }
        }
      );
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.imagenSeleccionada = null;
    this.progreso = 0;
  }


}
