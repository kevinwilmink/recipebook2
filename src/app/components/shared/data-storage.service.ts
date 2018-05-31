import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  /*  - put= overwrite current data
        - na de url plaats tabelNaam.json -> word in deze tabelnaam gezet en .json is vereist omdat firebase werkt met json
        - de array met objecten wordt door de put method automatisch omgezet naar een json object
        - de put geeft een Observable terug, door hierop te subscriben word de http request daadwerkelijk uitgevoerd, in dit
            geval word de observable terug gegeven.
     */
  storeRecipes() {
    const token = this.authService.getToken(); // token is required to do actions on the DB
    return this.http.put('https://ng-recipe-book-a58e9.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }


  /* - getRecipes meteen subscriben; zodat hier de data verwerkt kan worden ipv op meerdere plaatsen in de code
   */
  getRecipes() {
    /* // oude aanpak: op deze manier kan het voorkomen dat er een object terug komt met hierin geen 'ingredients' array als deze leeg is
    this.http.get('https://ng-recipe-book-a58e9.firebaseio.com/recipes.json').subscribe(
      (response: Response) => {
        const recipes = response.json();
        this.recipeService.setRecipes(recipes);
      }
    );*/

    const token = this.authService.getToken();
    // nieuwe manier zorgt ervoor dat er altijd een ingredients array op een Recipe zit. (zelfs als deze leeg is)
    // ?auth=token -> stuur de token mee, deze is nu vereist om acties op de DB te mogen uitvoeren
    this.http.get('https://ng-recipe-book-a58e9.firebaseio.com/recipes.json?auth=' + token).pipe(map( // map = wijzig de output
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
