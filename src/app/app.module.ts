import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CdsButtonModule,
  CdsDividerModule,
  CdsIconModule,
  CdsToolbarModule,
} from '@criteo/cds15-library';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './form/create/create.component';
import { ListComponent } from './list/list/list.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CreateComponent,
    ListComponent,
    FlexModule,
    CdsToolbarModule,
    CdsDividerModule,
    CdsIconModule,
    CdsButtonModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '0ms' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
