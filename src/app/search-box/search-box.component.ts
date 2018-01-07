import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { MarvelService } from './../services/marvel.service';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder?: string;
  @Input() selectedItem: EventEmitter<any>;

  public searchTerm: string;

  constructor(private _marvelService: MarvelService) { }

  ngOnInit() {
    this.search(Observable.of('searchTerm'));
  }

  public search = (searchTerm$: Observable<string>) =>
    searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this._marvelService.search(term))

  @Output('selectItem')
  onSelectItem(event: NgbTypeaheadSelectItemEvent): void {
    this._marvelService.getCharacter(event.item);
  }

}
