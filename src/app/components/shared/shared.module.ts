// Typicall only 1 shared.module (but you can make more)
// Inprincipe een normale module, maar alleen gebruiken we hem anders

/* voeg aan declarations de directives die je wilt delen, een directive moet precies 1x toegevoegd worden, daarom voeg je hem op shared toe
om hem vervolgens bij exports open te stellen. (Een module kan op meerdere plaatsen geimport worden). (normaal is hetgene geimport alleen
toegankelijk in de module)
 */

import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';

@NgModule({

  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule, // modules hoeven NIET eerst geimport/gedeclared (bij declarations) worden voordat je ze kan exporten
    DropdownDirective // Components, Directives, etc moeten eerst geimport/gedeclared (bij declarations) worden voordat je ze kan exporten
  ]
  /* Je zou ook meer modules kunnen exporten, de reden om dit te doen is om het eenvoudig te maken op andere
      plaatsen veel modules in 1x te importen */
})

export class SharedModule {}
