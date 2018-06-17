import {
  Directive, ElementRef, Output, TemplateRef, ViewContainerRef, AfterViewInit,
  Input, OnDestroy, ChangeDetectorRef, EventEmitter
} from '@angular/core';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, delay, debounceTime } from 'rxjs/operators';
import { DOWN_SELECTOR, UP_SELECTOR, PAGE_SELECTOR } from './definitions';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import 'hammerjs';

@Directive({

  selector: PAGE_SELECTOR
})
export class OnePageDirective implements AfterViewInit, OnDestroy {

  @Output() scroll = new EventEmitter<number>();
  @Input() delay = 1000;
  @Input()
  public set sectionIndex(index: number) {
    if (index > -1 && this.viewInitComplete) {
      this._sectionIndex = index;
      this.scrollToSection(index);
      this.checkArrows();
    }
  }

  public get sectionIndex(): number {
    return this._sectionIndex;
  }

  _sectionIndex = 0;

  pageOffsets: number[];
  $windowScroll: Observable<Event>;
  events: Subscription;
  viewInitComplete = false;

  halfway = window.innerHeight / 2;
  current = 0;

  upArrows;
  downArrows;

  anchorNodes;
  nativeEl: HTMLElement;

  constructor(el: ElementRef, private cdRef: ChangeDetectorRef) {
    this.nativeEl = el.nativeElement;
  }

  ngAfterViewInit() {
    // If there is no DOM present, do not configure one-page effects. DOM's aren't present on web workers,
    // nor server-side renderers
    if (!this.nativeEl)
      return;

    // get all section offsets
    this.pageOffsets = Array.from(this.nativeEl.querySelectorAll('.one-page-section'))
      .map((item: any) => item.offsetTop);

    // set up assisted-scrolling
    this.$windowScroll = fromEvent(window, 'scroll');
    this.events = this.$windowScroll.pipe(
      debounceTime(this.delay))
      .subscribe(
        event => {
          this._sectionIndex = Math.round(this.ratio());
          this.scroll.emit(this._sectionIndex);
          this.scrollToSection(this._sectionIndex);
        });

    // Add-handlers to arrows
    this.downArrows = Array.from(this.nativeEl.querySelectorAll(DOWN_SELECTOR));
    this.downArrows.forEach(arrow => arrow.onclick = () => this.scrollDown());

    this.upArrows = Array.from(this.nativeEl.querySelectorAll(UP_SELECTOR));
    this.upArrows.forEach(arrow => arrow.onclick = () => this.scrollUp());

    const sectionDownArrows = Array.from(this.nativeEl.querySelectorAll<HTMLDivElement>('.section-down-arrow'));
    sectionDownArrows.forEach(arrow => arrow.onclick = () => this.scrollDown());
    this.checkArrows();

    this.cdRef.detectChanges();

    const subscription = fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe(() => {
      this.halfway = window.innerHeight / 2;
      this.pageOffsets = Array.from(this.nativeEl.querySelectorAll('.one-page-section'))
        .map((item: any) => item.offsetTop);
      this.scrollToSection(this._sectionIndex);
    });

    this.events.add(subscription);


    this.viewInitComplete = true;
  }

  ratio() {
    return window.scrollY / window.innerHeight;
  }

  scrollDown() {
    this._sectionIndex = this._sectionIndex < this.pageOffsets.length - 1 ? this._sectionIndex + 1 : this._sectionIndex;
    this.scrollToSection(this._sectionIndex);
    this.scroll.emit(this._sectionIndex);
  }

  scrollUp() {
    this._sectionIndex = this._sectionIndex > 0 ? this._sectionIndex - 1 : this._sectionIndex;
    this.scrollToSection(this._sectionIndex);
    this.scroll.emit(this._sectionIndex);
  }

  scrollToSection(index: number) {
    window.scrollTo({
      left: 0,
      top: this.pageOffsets[index],
      behavior: 'smooth'
    });
    this.checkArrows();
  }

  checkArrows() {
    switch (this._sectionIndex) {
      case 0:
        this.upArrows.forEach(arrow => arrow.style.display = 'none');
        this.downArrows.forEach(arrow => arrow.style.display = 'block');
        break;
      case this.pageOffsets.length - 1:
        this.upArrows.forEach(arrow => arrow.style.display = 'block');
        this.downArrows.forEach(arrow => arrow.style.display = 'none');
        break;
      default:
        [...this.upArrows, ...this.downArrows].forEach(arrow => arrow.style.display = 'block');
        break;
    }
  }

  ngOnDestroy() {
    // Release ALL DOM references, new ones will be picked up on next view init
    this.events.unsubscribe();
    this.$windowScroll = null;
    this.downArrows.forEach((arrow: any) => arrow.onclick = null);
    this.downArrows = null;
    this.upArrows.forEach((arrow: any) => arrow.onclick = null);
    this.upArrows = null;
    this.anchorNodes = null;
    this.nativeEl = null;
  }


}
