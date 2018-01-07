import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
  }

  onSelectItem(event: Event) {
    console.log(event);
  }

}
