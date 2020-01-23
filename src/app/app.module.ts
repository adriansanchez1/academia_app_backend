import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { UsersComponentComponent } from './users-component/users-component.component';
import { UsersService } from './users-component/users.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './users-component/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { PaginatorUsersComponent } from './paginator-users/paginator-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { DetalleComponent } from './users-component/detalle/detalle.component';


registerLocaleData(localeEsMx, 'mx');


const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponentComponent },
  { path: 'users/form', component: FormComponent },
  { path: 'users/form/:id', component: FormComponent },
  { path: 'users/page/:page', component: UsersComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    FooterComponentComponent,
    UsersComponentComponent,
    FormComponent,
    PaginatorUsersComponent,
    DetalleComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule

  ],
  providers: [UsersService, { provide: LOCALE_ID, useValue: 'mx' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
