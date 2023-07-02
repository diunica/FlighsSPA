import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsComponent } from './flights/flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FlightsService } from './flights/flights.service';
import { CookieService } from 'ngx-cookie-service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LanguageSelectorComponent } from './shared/i18n';
import { LoggerService } from './logger/logger.service';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { HeaderComponent } from './shared/layout/header/header.component';

import { TooltipModule as KendoTooltipModule } from '@progress/kendo-angular-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  CookieService,
  { provide: LoggerService, useClass: ConsoleLoggerService },
  { provide: APP_BASE_HREF, useValue: environment.path }
];

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/api/langs/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    LanguageSelectorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    KendoTooltipModule,
    BsDropdownModule,
    BrowserModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    APP_PROVIDERS,
    FlightsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
