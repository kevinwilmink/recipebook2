import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {HomeComponent} from './components/core/home/home.component';

// de componenten waar de routes heenlinken hoeven niet hier gedeclareerd worden, maar wel VOORDAT een route hierheen wordt geopend
const appRoutes: Routes = [
  // {path: '', redirectTo: '/recipes', pathMatch: 'full'}, // only redirect if the FULL path is empty (before lazy loading)
  {path: '', component: HomeComponent},
  /* Lazy load the recipe module, only if needed and NOT at init. Syntax: pathFromHere#ModuleName */
  {path: 'recipes', loadChildren: './components/recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', component: ShoppingListComponent} // zie recipe.module.ts voor voorbeeld met apparte routes file
]

@NgModule({
  /* - ALLEEN in app-routing.module forRoot, anders altijd forChild()
   * - preloadingStrategy -> dit is een lazyLoad module, maar laad de module alvast in als de gebruiker andere dingen doet */
  imports: [RouterModule.forRoot(appRoutes ,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule] /* export de module, dit komt er binnen bij een andere module die deze module import */
})


export class AppRoutingModule { /* what is exported here, will be imported the moment this module is imported */
}
