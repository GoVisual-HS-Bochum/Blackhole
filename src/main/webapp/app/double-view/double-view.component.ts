import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-double-view',
  templateUrl: './double-view.component.html',
  styles: [
    'double-view.css'
  ]
})
export class DoubleViewComponent implements OnInit {

  beschreibungSelected = true;
  zielgruppeSelected: boolean;

  constructor() { }

  ngOnInit() {
  }

  onClickZielgruppe() {
    this.zielgruppeSelected = true;
    this.beschreibungSelected = false;
  }

  onClickBeschreibung() {
    this.zielgruppeSelected = false;
    this.beschreibungSelected = true;
  }

  getBeschreibungClass() {
    if (this.beschreibungSelected) {
      return 'btn btn-primary';
    } else {
      return 'btn btn-info';
    }
  }

  getZielgruppeClass() {
    if (this.zielgruppeSelected) {
      return 'btn btn-primary';
    } else {
      return 'btn btn-info';
    }
  }
}
