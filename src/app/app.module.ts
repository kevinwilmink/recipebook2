import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RainbowDirective } from './components/shared/rainbow.directive';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from '@angular/http';
import {SharedModule} from './components/shared/shared.module';
import {ShoppingListModule} from './components/shopping-list/shopping-list.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './components/core/core.module';


/*
  Als je in app.module.ts een module importeerd en in die module exporteer je iets, dan is dat hetzelfde alsof je die export hier zelf zou
  declareren.

  bv in coreModule word de headerComponent ge-export, door de core module hier te importeren, word daardoor hier ook de header gedeclareerd
 */

@NgModule({
  /* All components, directives and pipes go here */
  declarations: [ /* Inprincipe zou hier alleen de AppComponent moeten staan, de rest word via modules gedeclareerd */
    AppComponent,
    RainbowDirective,
  ],
  /* All other modules being used by this module go here */
  imports: [ // all (fully) loaded at the start
    BrowserModule, // Uitgebreidere versie van de commonModule, met features die alleen nodig zijn voor startup (alleen in app.module.ts)
    HttpModule,
    AppRoutingModule,
    SharedModule, // word op meerdere plaatsen geimport (andere is recipes.module.ts)
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  /* Providers is hier niet nodig, All services go into CoreModule */
  /* provide them in the coreModule (omdat core en app.module beiden geen lazy load modules zijn, maakt het niet uit op welke van deze 2
    plekken je ze laad. Pas als je de provider zet op een lazy load module, dan word er een nieuwe instance van deze service aangemaakt.
   */
  // providers: [],

  /* Starting point of the app */
  bootstrap: [AppComponent]
})
export class AppModule { }
