import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {AuthGaurd} from '../../auth/auth-gaurd.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule, // header uses the dropdown directive in here
    AppRoutingModule // worden gebruikt in de header (en ge-export in app-routing.module)
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  /*  is 1 en dezelfde service in de gehele applicatie omdat de coreModule op top level word ingeladen (niet lazy loaded) >
      alles word geinjecteerd via de root injector,
      als je een service provide in een lazy load module, dan word er een nieuwe instance aangemaakt van de service*/
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    // AuthGaurd //omdat deze alleen in recipe-routing.module wordt gebruikt provide ik hem op die plaats
  ]
})

export class CoreModule {}
