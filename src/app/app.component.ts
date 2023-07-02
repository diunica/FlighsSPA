import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from './logger/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { languages } from './shared/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlighsSPA';

  constructor(
    private logger: LoggerService,
    private translate: TranslateService) {
    translate.setDefaultLang('en-US');
    translate.use(this.getUserLanguage());
  }

  private getUserLanguage() {
    if (this.language !== null) {
      return this.language;
    }

    const browserLanguage = this.translate.getBrowserLang();
    const userLanguage = languages.find(language => (language.lang || language.key) === browserLanguage);
    return (userLanguage && userLanguage.key) || this.translate.getDefaultLang();
  }

  get language() {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      return preferredLanguage;
    }
    return null;
  }

}
