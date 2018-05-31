/* Recipe-edit is setup with a Reactive Driven Form
  - in app.module.ts import ReactiveFormsModule

  connect in html:
  in <form [formGroup]="recipeForm"> --> angular managed de form niet zelf maar wij nemen controle erover
  in <input> formControlName="controlName" --> bind/connect met FormGroup uit de TS code.
*/

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

/* This module is loaded for both adding a new recipe and for editing a recipe. By
    checking if the id parameter is set, we can determine if we are in editMode (or newMode if editMode = false)
 */


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}


  ngOnInit() {
    // angular observables worden automatisch verwijderd (als component wordt verwijderd), normaal dien je dit handmatig te doen!
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    // navigeer 1 level omhoog. als je dan bv op baseUrl/recipes/12/ bent gaat hij nu naar baseUrl/recipes
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }


  onSubmit() {
    /* this.recipeForm.value is een object met bepaalde data erin, omdat die data EXACT overkomt met het Recipe object dat verwacht
    wordt, kan je het ook op deze manier doorgeven. Dit is een snellere manier ipv:
      const nwRecipe = new Recipe(...) en dan nwRecipe doorgeven
     */
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    // escape out the current selected recipe (same behaviour as onCancel)
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          /* pattern => reguliere expression,
              pattern() is een factory method. Deze geeft een function terug met deze instellingen */
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // if the recipe has ingredients, create a formGroup for each of them.
      // each formGroup holds multiple formControls for the components of a ingredient
      if (recipe['ingredients']) {
        for (let ingr of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup ({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount, [
                Validators.required,
                /* pattern => reguliere expression,
                    pattern() is een factory method. Deze geeft een function terug met deze instellingen */
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
