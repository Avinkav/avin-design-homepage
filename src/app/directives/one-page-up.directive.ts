import { Directive, ElementRef } from '@angular/core';
import { UP_SELECTOR } from './definitions';

@Directive({
  selector: UP_SELECTOR
})
export class OnePageUpDirective {

  constructor(private el: ElementRef) {
    const nativeEl = el.nativeElement;
    if (!nativeEl)
      return;

    nativeEl.classList.add('one-page-up-arrow');
  }
}
