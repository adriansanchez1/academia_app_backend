import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator-users',
  templateUrl: './paginator-users.component.html'
})
export class PaginatorUsersComponent implements OnInit {

  @Input() paginador: any;
  paginas:number[];


  constructor() { }


  ngOnInit() {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }

}
