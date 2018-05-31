import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeServiceSubscription: Subscription;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.recipeServiceSubscription = this.recipeService.recipesChanged.subscribe((nwRecipes: Recipe[]) => {
      this.recipes = nwRecipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeServiceSubscription.unsubscribe();
  }

  onNewRecipe() {
    // navigeer relative van de activatedRoute naar: currentUrl/new
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}
