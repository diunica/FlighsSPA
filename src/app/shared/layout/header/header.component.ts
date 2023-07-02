import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit, OnDestroy {
  searchMobileActive: boolean;

  translateSubscription: Subscription = null;
  private sub: Subscription = null;

  constructor(
    private translate: TranslateService) {
    this.translateSubscription = this.translate.onLangChange.subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;
    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

}
