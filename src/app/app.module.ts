import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    /* Components */
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE' // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
