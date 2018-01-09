import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public selectedCharacter: any;

  constructor(
    private _marvelService: MarvelService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getCharacter();
  }

  getCharacter() {
    this.selectedCharacter = this._marvelService.selectedCharacter || this._router.navigateByUrl('');
  }

}
