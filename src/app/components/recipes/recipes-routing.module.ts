import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {AuthGaurd} from '../../auth/auth-gaurd.service';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';


const recipesRoutes: Routes = [
  {path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGaurd]}, // now is protected by this guard
      {path: ':id', component: RecipeDetailComponent}, // moet na 'new', angular weet niet of 'new' een id is of een hardcoded path
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGaurd]} // now is protected by this guard
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes) /* ALTIJD forChild() als het niet de root is */
  ],
  exports: [RouterModule],
  // Alleen een gaurd mag hier ge-provided worden andere servides zouden provided moeten worden in recipes.module.ts
  providers: [AuthGaurd] // provide hier ipv application wide, omdat deze service enkel en alleen hier word gebruikt
})


export class RecipesRoutingModule {}
