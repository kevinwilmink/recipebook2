import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class RecipeService {

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe('Fruit Bowl', 'Fresh and Healthy',
      'https://c1.staticflickr.com/6/5737/30622968353_35e06fcb52_b.jpg', [
        new Ingredient('Kiwi', 1), new Ingredient('Orange', 3)
      ]),
    new Recipe('Noodles', 'Nie zo best',
      'https://www.maxpixel.net/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg', [
        new Ingredient('Noodles', 50), new Ingredient('Pepper', 5)
      ])
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice(); // returns a COPY of this array
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }


  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
