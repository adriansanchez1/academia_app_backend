import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  public  autor: any = {autor : 'Academia Digital Softtek 2020'};

  constructor() { }

  ngOnInit() {
  }

}
