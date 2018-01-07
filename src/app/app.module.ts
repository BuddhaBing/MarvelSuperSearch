import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';

import { MarvelService } from './services/marvel.service';
import { AppRoutingModule, routingComponents } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgbTypeaheadModule
  ],
  providers: [
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
