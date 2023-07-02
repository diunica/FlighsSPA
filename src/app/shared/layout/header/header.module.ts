import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {I18nModule} from '../../i18n/i18n.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    I18nModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
