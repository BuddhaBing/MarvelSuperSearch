import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { MARVEL_CONSTANTS } from './../constants/marvel.constants';
import { default as DynamicStringObjInterface } from '../interfaces/dynamic-string-object.interface';

@Injectable()
export class MarvelService {

  private searchTerm: string;
  private characterId: string;
  private characterNames: Array<string> = [];
  private characterList: DynamicStringObjInterface = {};

  public character: any;

  constructor(private http: Http) {}

  public search(searchTerm: string): Observable<any> {
    if (searchTerm.length < 2) return Observable.of([]);
    this.searchTerm = searchTerm;
    const cachedResults = this.getFromCache(searchTerm);
    if (cachedResults.toString()) return Observable.of(cachedResults);
    return this.http.get(this.url.search)
        .map((res: Response) => {
          const characters = res.json().data.results;
          this.extractCharacters(characters);
          return this.returnNewCharacters(characters);
        })
        .catch(err => Observable.of([]));
  }

  public get selectedCharacter() {
    return this.character;
  }

  public getCharacter(characterName: string) {
    this.characterId = this.characterList[characterName];
    return this.http.get(this.url.character)
        .map((res: Response) => {
          return this.character = res.json().data.results[0];
        })
        .catch(err => Observable.throw(err));
  }

  private extractCharacters(characters: Array<any>): void {
    for (const character of characters) {
      this.characterNames.push(character.name);
      this.characterList[character.name] = character.id;
    }
  }

  private returnNewCharacters(characters: any): Array<string> {
    const start = this.characterNames.length - characters.length;
    const end = this.characterNames.length;
    return this.characterNames.slice(start, end);
  }

  private isDuplicate(arr: Array<any>, el: any): boolean {
    return arr.indexOf(el) !== -1;
  }

  private getFromCache(searchTerm: string): Array<string> {
    return this.characterNames.filter(name => this.isMatchingSubstring(name, searchTerm));
  }

  private isMatchingSubstring(string: string, substring): boolean {
    return string.toLowerCase().substring(0, substring.length) === substring.toLowerCase();
  }

  private get url(): DynamicStringObjInterface {
    return {
      search: `${MARVEL_CONSTANTS.baseUrl}?${MARVEL_CONSTANTS.searchQuery}=${this.searchTerm}&apikey=${MARVEL_CONSTANTS.publicApiKey}`,
      character: `${MARVEL_CONSTANTS.baseUrl}/${this.characterId}?apikey=${MARVEL_CONSTANTS.publicApiKey}`
    };
  }

}
