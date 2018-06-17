import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCarouselItem]'
})
export class CarouselItemDirective {

  constructor(private el: ElementRef) {
    const nativeEl = el.nativeElement;
    if (!nativeEl)
      return;

    nativeEl.classList.add('app-carousel-item');
  }

}
