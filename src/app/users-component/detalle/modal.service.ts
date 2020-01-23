import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;
  private NotificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this.NotificarUpload;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

}
