import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import 'hammerjs';
import { debounceTime } from 'rxjs/operators';


@Directive({
  selector: '[appCarousel]'
})
export class CarouselDirective implements AfterViewInit {

  carousel: HTMLDivElement;
  viewport: HTMLDivElement;
  wrapper: HTMLDivElement;

  dotContainer: HTMLDivElement;
  dot: HTMLDivElement;
  dots: HTMLDivElement[];
  hammertime: HammerManager;

  index = 0;
  pan = 0;
  count: number;
  width: number;

  loopFunc;

  @Input()
  animationTimer = 700;

  animation = `transform ${this.animationTimer}ms ease`;


  constructor(el: ElementRef) {
    this.carousel = el.nativeElement;
    if (!this.carousel)
      return;

    this.carousel.classList.add('app-carousel');
  }

  ngAfterViewInit() {
    const carouselItems: any[] = Array.from(this.carousel.querySelectorAll('.app-carousel-item'));
    this.count = carouselItems.length;

    // Add a wrapper to the carousel items
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'app-carousel-wrapper';
    this.wrapper.style.width = `${this.count * 100}%`;

    carouselItems[0].parentNode.insertBefore(this.wrapper, carouselItems[0]);
    carouselItems.forEach(item => this.wrapper.appendChild(item));

    // Create a viewport
    this.viewport = document.createElement('div');
    this.viewport.className = 'app-carousel-viewport';

    this.wrapper.parentNode.insertBefore(this.viewport, this.wrapper);
    this.viewport.appendChild(this.wrapper);

    // Insert arrows
    const leftArrow = document.createElement('div');
    leftArrow.className = 'left-arrow';
    const rightArrow = document.createElement('div');
    rightArrow.className = 'right-arrow';

    // 
    this.carousel.insertBefore(leftArrow, this.viewport);
    this.carousel.appendChild(rightArrow);

    this.loopFunc = () => {
      this.index = (this.index < this.count - 1) ? this.index + 1 : 0;
      const delta = (-100 / this.count) * this.index;
      this.moveWrapper(delta, true);
      this.setDot(this.index);
    };
    // setInterval(loopFunc, 6000);

    // loopFunc = () => {
    //   index = (index < count - 1) ? index + 1 : 0;
    //   wrapper.style.transform = `translateX(${(-100 / count) * index}%)`;
    // };

    this.width = this.viewport.offsetWidth;
    console.log(this.viewport);
    console.log(this.viewport.offsetWidth);
    // Init gesture handlers
    this.hammertime = new Hammer(this.viewport);
    fromEvent(this.hammertime, 'pan').subscribe((ev: HammerInput) => {
      this.moveWrapper(this.pan + ev.deltaX);
    });

    fromEvent(this.hammertime, 'panend').pipe(debounceTime(100))
      .subscribe((ev: HammerInput) => {
        // calc
        if (-ev.deltaX > this.width / 2)
          this.pan = -((this.index < this.count - 1) ? ++this.index : this.index) * this.width;
        if (ev.deltaX > this.width / 2)
          this.pan = -(this.index > 0 ? --this.index : this.index) * this.width;
        this.moveWrapper(this.pan, true);
        this.setDot(this.index);
        console.log(this.width);
      });

    fromEvent(this.hammertime, 'swipeleft').subscribe(() => this.scrollLeft());
    fromEvent(this.hammertime, 'swiperight').subscribe(() => this.scrollRight());

    // setup dots
    this.dotContainer = document.querySelector<HTMLDivElement>('.dots');
    this.dot = this.dotContainer.querySelector<HTMLDivElement>('.dot');
    this.dots = [this.dot];

    for (let i = 1; i < this.count; i++) {
      this.dots.push(<HTMLDivElement>this.dot.cloneNode());
      this.dotContainer.appendChild(this.dots[i]);
    }

    // Add resize handler
    fromEvent(window, 'resize').subscribe(() => {this.width = this.viewport.offsetWidth; this.moveWrapper(this.index, true); });

    this.scrollLeft();
  }

  moveWrapper(position: number, animate = false) {
    if (animate) {
      this.wrapper.style.transition = this.animation;
      setTimeout(() => this.wrapper.style.transition = '', this.animationTimer);
    }
    this.wrapper.style.transform = `translateX(${position}px)`;
  }

  scrollLeft() {
    this.pan = -((this.index < this.count - 1) ? ++this.index : this.index) * this.width;
    this.moveWrapper(this.pan, true);
    this.setDot(this.index);
  }

  scrollRight() {
    this.pan = -((this.index > 0 ? --this.index : this.index) * this.width);
    this.moveWrapper(this.pan, true);
    this.setDot(this.index);
  }

  setDot(index: number) {
    this.dots.forEach(dot => dot.classList.remove('dot-selected'));
    this.dots[index].classList.add('dot-selected');
  }
}
