/*
index word via property binding gezet. Het krijgt de index van waarmee recipe in de recipes list in de recipesService.
als er op dit element word geklikt word de index ook doorgegeven via de routerlink. omdat dit een relative url is word
 de url dan bv: baseUrl/recipe/2 wat de router linkt aan recipeDetails.
 In recipeDetails word dynamisch adhv de index de juiste recipe uit de recipesService geladen
 */


import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
// import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(/*private recipeService: RecipeService*/) { }

  /*
  clickedOnThisRecipe() {
    // this.clickOnRecipe.emit(this.recipe);
    this.recipeService.recipeSelected.emit(this.recipe); // Send the event via de recipeService
  }*/

  ngOnInit() {
  }

}
