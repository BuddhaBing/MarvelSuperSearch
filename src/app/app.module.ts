import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

// Routing & routing components
import { AppRoutingModule, routingComponents } from './app.routing';

// Components
import { SearchBoxComponent } from './search-box/search-box.component';

// Services
import { MarvelService } from './services/marvel.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
