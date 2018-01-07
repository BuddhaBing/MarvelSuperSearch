import { Component, Input, OnInit  } from '@angular/core';

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

  @Input() placeholder: string;
  public searchTerm: string;

  constructor(private _marvelService: MarvelService) { }

  ngOnInit() {
  }

  search = (searchTerm$: Observable<string>) => {
    searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      // .switchMap(term => this._marvelService.search(term));
  }

}
