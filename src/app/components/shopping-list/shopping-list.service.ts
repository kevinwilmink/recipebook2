import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>(); // subject: if this value changes all subscribed components are also called

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];


  getIngredients() {
    // create a copy of the array
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, nwIngredient: Ingredient) {
    this.ingredients[index] = nwIngredient;
    // call 'ingredientsChanged' to all subscriptions (fire event).
    // slice will create a HARD COPY of the array so the subscribers wont edit the original array
    this.ingredientsChanged.next(this.ingredients.slice());
  }


  addIngredient(nwIngredient: Ingredient) {
    this.ingredients.push(nwIngredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(nwIngredientList: Ingredient[]) {
    /*
    // not the best solution but also not terrible
    for (const ingredient of nwIngredientList) {
      this.addIngredient(ingredient);
    }*/

    this.ingredients.push(...nwIngredientList); // spread operator: dit spreid een array. bv [1,2,3] word: 1,2,3
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
