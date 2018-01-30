import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { MarvelService } from './../services/marvel.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() onSelectItem: Function;
  @Input() placeholder?: string;

  public searchTerm: any;

  constructor(public _marvelService: MarvelService, private _router: Router) { }

  ngOnInit() {
    this.search(Observable.of('searchTerm'));
  }

  search = (searchTerm$: Observable<string>) =>
    searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((term) => this._marvelService.search(term))
        .catch(() => Observable.of([]))

}
