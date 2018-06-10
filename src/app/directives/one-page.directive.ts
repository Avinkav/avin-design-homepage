import { Directive, ElementRef, Output, TemplateRef, ViewContainerRef, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { element } from 'protractor';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, delay, debounceTime } from 'rxjs/operators';
import { DOWN_SELECTOR, UP_SELECTOR, PAGE_SELECTOR } from './definitions';

@Directive({

  selector: PAGE_SELECTOR
})
export class OnePageDirective implements AfterViewInit, OnDestroy {
  pageOffsets: number[];
  $windowScroll: Observable<Event>;
  scrollEvents: Subscription;

  halfway = window.innerHeight / 2;
  current = 0;
  pageIndex = 0;
  @Input() delay = 1000;

  constructor(private el: ElementRef, private viewContainer: ViewContainerRef) {

  }

  ngAfterViewInit() {
    // If there is no DOM present, do not configure one-page effects. DOM's aren't present on web workers,
    // nor server-side renderers
    if (!this.el.nativeElement)
      return;

    // get all section offsets
    this.pageOffsets = Array.from(this.el.nativeElement.querySelectorAll('.one-page-section'))
      .map((item: any) => item.offsetTop);

    // set up assisted-scrolling
    this.$windowScroll = fromEvent(window, 'scroll');
    this.scrollEvents = this.$windowScroll.pipe(
      debounceTime(this.delay),
      filter((event: any) => this.calcSectionY() > this.halfway))
      .subscribe(
        event => {
          console.log(event);
          this.scrollDown();
        });

    const subscription = this.$windowScroll.pipe(
      debounceTime(this.delay),
      filter((event: any) => this.calcSectionY() < this.halfway))
      .subscribe(
        event => {
          console.log(event);
          this.scrollUp();
        });
    this.scrollEvents.add(subscription);

    // Add-handlers to arrows
    const downArrows = Array.from(this.el.nativeElement.querySelectorAll(DOWN_SELECTOR));
    downArrows.forEach((arrow: any) => arrow.onclick = () => { this.scrollDown(); });

    const upArrows = Array.from(this.el.nativeElement.querySelectorAll(UP_SELECTOR));
    upArrows.forEach((arrow: any) => arrow.onclick = () => { this.scrollUp(); });
  }

  calcSectionY() {
    return window.scrollY - this.pageOffsets.slice(0, this.pageIndex)
      .reduce((acc, val) => acc + val, 0);
  }

  scrollDown() {
    this.pageIndex = this.pageIndex < this.pageOffsets.length - 1 ? this.pageIndex + 1 : this.pageIndex;
    this.scrollToSection(this.pageOffsets[this.pageIndex]);
  }

  scrollUp() {
    this.pageIndex = this.pageIndex > 0 ? this.pageIndex - 1 : this.pageIndex;
    this.scrollToSection(this.pageOffsets[this.pageIndex]);
  }

  scrollToSection(offSet: number) {
    window.scrollTo({ left: 0, top: offSet, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.scrollEvents.unsubscribe();
  }

}
