import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (nwIngredients: Ingredient[]) => this.ingredients = nwIngredients
    );
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSelectIngredient(indexSelected: number) {
    this.shoppingListService.startedEditing.next(indexSelected); // on the service update the value for startedEditing ingredient
  }
  /*
  onIngredientCreated(nwIngredient: Ingredient) {
    this.ingredients.push(nwIngredient);
  }*/

}
