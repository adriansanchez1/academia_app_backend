import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UsersService } from './users.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';



@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
})

export class UsersComponentComponent implements OnInit {

  users: User[] = [];
  paginador: any;
  isLoaded = false;
  userSelected: User;


  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute, public modalService: ModalService) { }



  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }


      this.usersService.getUsers(page).subscribe(
        response => {
          this.users = response.content as User[];
          this.paginador = response;
          console.log('-> el paginador' + this.paginador.totalElements);
          this.isLoaded = true;
        }
      );
    });
    this.modalService.notificarUpload.subscribe(
      (user: { id: number; foto: string; }) => {
        this.users.map(userOriginal => {
          if (user.id === userOriginal.id) {
            userOriginal.foto = user.foto;
          }
        });
      }
    );
  }

  delete(user: User): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `User ${user.name} ${user.lastname} will be deleted!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usersService.delete(user.id).subscribe(
          response => {
            this.users = this.users.filter(usr => usr !== user);
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
          }
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'User not deleted',
          'error'
        );
      }
    });

  }

  abrirModal(user: User) {
    this.userSelected = user;
    this.modalService.abrirModal();
  }


}
