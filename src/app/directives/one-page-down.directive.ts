import { Directive, ElementRef } from '@angular/core';
import { DOWN_SELECTOR } from './definitions';

@Directive({
  selector: DOWN_SELECTOR
})
export class OnePageDownDirective {

  constructor(private el: ElementRef) {
    const nativeEl = el.nativeElement;
    if (!nativeEl)
      return;

    nativeEl.classList.add('one-page-down-arrow');

  }
}
