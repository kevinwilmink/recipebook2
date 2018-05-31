/* Shopping-edit is setup with a Template Driven Form */


import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  inEditMode = false;
  editedItemIndex: number;
  itemEdited: Ingredient;
  editSubscription: Subscription;
  @Output() ingredientCreated = new EventEmitter<Ingredient>();
  @ViewChild('shoppingEditForm') shoppingEditForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe((nwIndex: number) => {
      this.editedItemIndex = nwIndex;
      this.inEditMode = true;
      this.itemEdited = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.shoppingEditForm.setValue({
        name: this.itemEdited.name,
        amount: this.itemEdited.amount
      });
    });
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe(); // always remove after use
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const nwIngredient = new Ingredient(value.name, value.amount);

    if (this.inEditMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, nwIngredient);
    } else {
      this.shoppingListService.addIngredient(nwIngredient);
    }
    this.inEditMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingEditForm.reset();
    this.inEditMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
