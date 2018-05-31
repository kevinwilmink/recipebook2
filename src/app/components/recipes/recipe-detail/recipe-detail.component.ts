import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // angular observables worden automatisch verwijderd (als component wordt verwijderd), normaal dien je dit handmatig te doen!
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // to number
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

    // Kevin: if the recipe updates then reload it
    this.recipeService.recipesChanged.subscribe((nwRecipes: Recipe[]) => {
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute}); // currentUrl/edit
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
