import { Directive, ElementRef, Output } from '@angular/core';
import { SECTION_SELECTOR } from './definitions';

@Directive({
  selector: SECTION_SELECTOR
})
export class OnePageSectionDirective {


  constructor(private el: ElementRef) {
    const nativeEl = el.nativeElement;
    if (!nativeEl)
      return;

    nativeEl.classList.add('one-page-section');

  }

}
