import { Injectable } from '@angular/core';
import { User } from './user';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';




@Injectable()
export class UsersService {

  private urlEndPoint = 'http://localhost:8080/api/users';
  private httpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private router: Router) { }



  getUsers(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
          (response.content as User[]).forEach(user => {
            console.log(user.name);
          });

        }
      ),
      map((response: any) =>  {
        (response.content as User[]).map(user => {
          user.name = user.name.toUpperCase();
          return user;
        });
        return response;
      }),
      tap(
        response => {
          (response.content as User[]).forEach(user => {
            console.log(user.name);
          });

        }
      )
    );
  }


  /*
    getUsers(): Observable<User[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap(
        response => {
          const users = response as User[];
          users.forEach(user => {
            console.log(user.name);
          });

        }
      ),
      map(response =>  {
        const users = response as User[];
        return users.map(user => {
          user.name = user.name.toUpperCase();
          // tslint:disable-next-line:prefer-const
          let datePipe = new DatePipe('mx');
          // user.createdAt = formatDate(user.createdAt, 'dd-MM-yyyy', 'en-US');
          // user.createdAt = datePipe.transform(user.createdAt, 'EEEE dd, MMMM yyy');
          // user.createdAt = datePipe.transform(user.createdAt, 'fullDate');
          return user;
        });
      }
      ),
      tap(
        response => {
          response.forEach(user => {
            console.log(user.name);
          });

        }
      )
    );
  }
  */


  create(user: User): Observable<any> {
    return this.http.post(this.urlEndPoint, user, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.user as User),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.log(e);
        Swal.fire( 'Error al crear', e.error.mensaje + e.error.error ,  'error');
        return throwError(e);
      })
    );
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/users']);
        console.log(e);
        Swal.fire( 'Error al editar', e.error.mensaje ,  'error');
        return throwError(e);
      })
    );
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${user.id}`, user, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.log(e);
        Swal.fire( 'Error al editar', e.error.mensaje ,  'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e);
        Swal.fire( 'Error al eliminar', e.error.mensaje ,  'error');
        return throwError(e);
      })
    );
  }


  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload/`, formData, {
      reportProgress: true
    });

    return this.http.request(req);


    /*return this.http.post(`${this.urlEndPoint}/upload/`, formData).pipe(
      map((response: any) => response.user as User),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );*/
  }

}
