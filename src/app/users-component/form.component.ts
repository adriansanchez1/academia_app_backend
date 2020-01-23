import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UsersService } from './users.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public user: User = new User();
  public titulo = 'Create User';
  public errores: string[];


  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      console.log(id);
      if (id) {
        this.userService.getUser(id).subscribe( (user) => this.user = user );
      }
    });
  }

   create(): void {
    this.userService.create(this.user).subscribe(
      user => {
        this.router.navigate(['/users']);
        swal.fire(  'New User', `User ${user.name} created ` ,  'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
        console.log('codigo de error: ' + err.status);
      }
    );
  }

   update(): void {
     this.userService.update(this.user).subscribe(json => {
       this.router.navigate(['/users']);
       swal.fire(  'User', `User ${json.mensaje} : ${json.user.name} edited ` ,  'success');
     },
     err => {
       this.errores = err.error.errors as string[];
       console.log(err.error.errors);
       console.log('codigo de error: ' + err.status);
     }
    );
   }



}
