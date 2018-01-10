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
  private characterIdList: DynamicStringObjInterface = {};
  private characters: Array<any> = [];

  public character: any;

  constructor(private http: Http) {}

  public search(searchTerm: string): Observable<any> {
    if (searchTerm.length < 2) return Observable.of([]);
    this.searchTerm = searchTerm;
    const names: Array<string> = this.filter.names(searchTerm);
    if (names[0]) return Observable.of(names);
    return this.http.get(this.url.search)
        .map((res: Response) => {
          const characters = res.json().data.results;
          this.extractCharacters(characters);
          return this.returnNewCharacters(characters);
        })
        .catch(err => Observable.of([]));
  }

  public getCharacter(characterName: string) {
    this.selectedCharacter = null;
    this.characterId = this.characterIdList[characterName];
    const character: Array<any> = this.filter.character(characterName);
    if (character[0]) {
      this.selectedCharacter = character[0];
      return Observable.of(this.selectedCharacter);
    }
    return this.http.get(this.url.character)
        .map((res: Response) => {
          this.selectedCharacter = res.json().data.results[0];
          return this.selectedCharacter;
        })
        .catch(err => Observable.throw(err));
  }

  public get selectedCharacter(): any {
    return this.character;
  }

  public set selectedCharacter(character: any) {
    if (character && !this.isDuplicate(this.characters, character)) {
      this.characters.push(character);
    }
    this.character = character;
  }

  private extractCharacters(characters: Array<any>): void {
    for (const character of characters) {
      this.characterNames.push(character.name);
      this.characterIdList[character.name] = character.id;
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

  private get filter(): { [key: string]: (string) => Array<string> } {
    return {
      names: (searchTerm: string) => this.characterNames.filter(name => this.isMatchingSubstring(name, searchTerm)),
      character: (characterName: string) => this.characters.filter(character => character.name === characterName)
    };
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
