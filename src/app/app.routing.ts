import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { CharacterComponent } from './character/character.component';
import { CharacterGuard } from './character/character.guard';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'character', component: CharacterComponent, canActivate: [CharacterGuard] },
  { path: 'character/:id', component: CharacterComponent, canActivate: [CharacterGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CharacterGuard]
})
export class AppRoutingModule { }

export const routingComponents = [SearchComponent, CharacterComponent];
