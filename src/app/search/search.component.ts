import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ISubscription } from 'rxjs/Subscription';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  private sub: ISubscription;

  constructor(
    private _marvelService: MarvelService,
    private _router: Router
  ) {}

  getCharacter(event: NgbTypeaheadSelectItemEvent) {
    this.sub = this._marvelService.getCharacter(event.item).subscribe(
      character => this._router.navigate(['/character', character.id]),
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

}
