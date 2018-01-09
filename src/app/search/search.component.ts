import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private _marvelService: MarvelService,
    private _router: Router
  ) {}

  ngOnInit() {
  }

  getCharacter(event: NgbTypeaheadSelectItemEvent) {
    this._marvelService.getCharacter(event.item).subscribe((data) => {
      this._router.navigateByUrl('/details');
    });
  }

}
