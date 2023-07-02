import { NgModule } from '@angular/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule,
  ],
  declarations: [
    LanguageSelectorComponent
  ],
  exports: [LanguageSelectorComponent]

})
export class I18nModule { }
