import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(
    private _marvelService: MarvelService,
    private _router: Router
  ) {}

  getCharacter(event: NgbTypeaheadSelectItemEvent) {
    this._marvelService.getCharacter(event.item).subscribe((character) => {
      this._router.navigate(['/character', character.id]);
    });
  }

}
