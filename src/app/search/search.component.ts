import { Component, OnInit } from '@angular/core';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _marvelService: MarvelService) { }

  ngOnInit() {
  }

  getCharacter(event: any) {
    console.log(event);
    // this._marvelService.getCharacter()
  }

}
