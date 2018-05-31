import { Component, OnInit } from '@angular/core';

/*
 * Door hem hier te providen word hier de recipeService aangemaakt als nieuwe instance. Als op hoger niveau er al 1 was word de
  * nieuwe instance hier gebruikt. */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /* Als de service een event stuurt dat er een nieuw recipe is geselecteerd dan word this.recipeSelected gezet */
    /*
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      }
    );*/
  }

  /*
  onRecipeClicked(recipeClicked: Recipe) {
    this.recipeSelected = recipeClicked;
  }*/

}
