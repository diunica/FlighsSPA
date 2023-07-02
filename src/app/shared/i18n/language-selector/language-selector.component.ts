import { Component, OnInit } from '@angular/core';
import { languages } from '../languages.model';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'sa-language-selector',
  templateUrl: './language-selector.component.html',
})

export class LanguageSelectorComponent implements OnInit {

  public languages: Array<any>;
  public currentLanguage: any;

  constructor(private translate: TranslateService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.languages = languages;
    this.currentLanguage = languages.find(lang => lang.key === this.translate.currentLang);

    if (this.currentLanguage === undefined) {
      this.currentLanguage = languages.find(lang => lang.key === 'en-US');
    }

  }

  setLanguage(language) {
    this.cookieService.set('.AspNetCore.Culture', `c=${language.key}|uic=${language.key}`, 365, '/', null, false, 'Lax');
    this.currentLanguage = language;
    this.translate.use(language.key);
    localStorage.setItem('preferredLanguage', language.key);
  }

  getLanguageImage(lang) {
    return 'assets/img/flags/lang-' + lang + '.png';
  }
}
