import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';

import { MARVEL_CONSTANTS } from './../constants/marvel.constants';

@Injectable()
export class MarvelService {

  private searchTerm: string;

  constructor(private http: Http) {}

  search(searchTerm: string): Observable<any> {
    this.searchTerm = searchTerm;
    return this.http.get(this.url)
        .map((res: Response) => res.json())
        .catch(err => Observable.of([]));
  }

  public get url(): string {
    return `${MARVEL_CONSTANTS.baseUrl}?${MARVEL_CONSTANTS.searchQuery}=${this.searchTerm}&apikey=${MARVEL_CONSTANTS.publicApiKey}`;
  }

}
