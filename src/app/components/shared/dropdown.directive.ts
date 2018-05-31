import {Directive, HostListener, HostBinding} from '@angular/core';


@Directive({
  selector: '[appDropdown]'
})


export class DropdownDirective {
  @HostBinding('class.open') isDropdownOpen = false;


  @HostListener('click') toggleOpen() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('click!s');
  }


}
