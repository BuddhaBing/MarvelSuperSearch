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
  private characterNames: Array<string> = [];

  constructor(private http: Http) {}

  public search(searchTerm: string): Observable<any> {
    if (searchTerm.length < 2) return Observable.of([]);
    this.searchTerm = searchTerm;
    const cachedResults = this.getFromCache(searchTerm);
    if (cachedResults.toString()) return Observable.of(cachedResults);
    return this.http.get(this.url)
        .map((res: Response) => {
          const characters = res.json().data.results;
          this.addToCharacters(characters);
          return this.characterNames;
        })
        .catch(err => Observable.of([]));
  }

  private addToCharacters(characters: any): void {
    for (const character of characters) {
      if (!this.isDuplicate(this.characterNames, character.name)) {
        this.characterNames.push(character.name);
      }
    }
  }

  private isDuplicate(arr: Array<any>, el: any): boolean {
    return arr.indexOf(el) !== -1;
  }

  private getFromCache(searchTerm: string): Array<string> {
    return this.characterNames.filter(name => name.toLowerCase().substring(0, searchTerm.length) === searchTerm.toLowerCase());
  }

  private get url(): string {
    return `${MARVEL_CONSTANTS.baseUrl}?${MARVEL_CONSTANTS.searchQuery}=${this.searchTerm}&apikey=${MARVEL_CONSTANTS.publicApiKey}`;
  }

}
