import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';

/*
    Compiling
    Just in Time Compiling (development)
    Met $ng serve word het project gebouwd met waarbij de client zowel de app als de compiler download. Op de client word daarna het project
    gecompiled. (just-in-time compilation)
    Ahead of Time Compiling (production)
    - Je kunt de app ook compilen en als pakketje aan de client aanbieden, de app is dan al gecompiled en daardoor sneller en kleiner.
    Build de app met: $ng build --prod --aot (aot is niet meer nodig sinds --prod deze functionaliteit ook al toepast)
    De build versie word geplaats in project/dist (daarna gzipt de server (of jij) dit ook nog eens)
 */


// NOOT: RecipeService moet niet in de RecipeModule, omdat deze in de gehele app word gebruikt

// maakt van een normale TS class een object dat Angular kan herkennen (module)
@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule, /* Importeer de standaard Module directives (bijv ngClass, ngFor, ngIf, etc) */
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule // word op meerdere plaatsen geimport (andere is app.module.ts)
  ]
})
export class RecipesModule {}
