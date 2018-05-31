import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    /* zie recipes.module.ts en recipe-routing.module.ts voor een voorbeeld met een apparte file met routes, in dit geval worden de
    routes voor shopping-list gezet in app.module.ts */
    CommonModule,
    FormsModule
  ]
  /*  - het is GEEN good practise om hier de forms module te exporten. Dan gebruiken straks andere modules bepaalde modules zonder
          dat je hier duidelijk zicht op hebt.
      - als je hier de shoppingList service injecteerd(dmv providers: []), dan word er op dit moment een nieuwe service
          aangemaakt van deze service
  */
})

export class ShoppingListModule {}
