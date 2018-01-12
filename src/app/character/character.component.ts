import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public selectedCharacter: any;

  constructor(
    public _marvelService: MarvelService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter() {
    this.selectedCharacter = this._marvelService.selectedCharacter;
  }

  back() {
    this._router.navigate(['']);
  }

}
