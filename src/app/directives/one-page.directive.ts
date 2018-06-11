import {
  Directive, ElementRef, Output, TemplateRef, ViewContainerRef, AfterViewInit,
  Input, OnDestroy, ChangeDetectorRef, EventEmitter
} from '@angular/core';
import { element } from 'protractor';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, delay, debounceTime } from 'rxjs/operators';
import { DOWN_SELECTOR, UP_SELECTOR, PAGE_SELECTOR } from './definitions';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Directive({

  selector: PAGE_SELECTOR
})
export class OnePageDirective implements AfterViewInit, OnDestroy {
  @Input() delay = 1000;
  @Input()
  public set sectionIndex(index: number) {
    if (index > -1 && this.viewInitComplete) {
      this._sectionIndex = index;
      this.scrollToSection(index);
    }
  }

  public get sectionIndex(): number {
    return this._sectionIndex;
  }

  @Output() scroll = new EventEmitter<number>();
  _sectionIndex = 0;

  pageOffsets: number[];
  $windowScroll: Observable<Event>;
  scrollEvents: Subscription;
  viewInitComplete = false;

  halfway = window.innerHeight / 2;
  current = 0;

  upArrows;
  downArrows;

  anchorNodes;
  nativeEl;

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
    this.scrollEvents = this.$windowScroll.pipe(
      debounceTime(this.delay))
      .subscribe(
        event => {
          this._sectionIndex = Math.round(this.ratio());
          this.scroll.emit(this._sectionIndex);
          this.scrollToSection(this._sectionIndex);
        });

    // Add-handlers to arrows
    this.downArrows = Array.from(this.nativeEl.querySelectorAll(DOWN_SELECTOR));
    this.downArrows.forEach((arrow: any) => arrow.onclick = () => { this.scrollDown(); });

    this.upArrows = Array.from(this.nativeEl.querySelectorAll(UP_SELECTOR));
    this.upArrows.forEach((arrow: any) => arrow.onclick = () => { this.scrollUp(); });

    this.checkArrows();

    this.cdRef.detectChanges();
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
    if (this._sectionIndex === 0)
      this.upArrows.forEach(arrow => {
        arrow.style.display = 'none';
      });
    if (this._sectionIndex === 1)
      this.upArrows.forEach(arrow => {
        arrow.style.display = 'block';
      });
    if (this._sectionIndex === this.pageOffsets.length - 2)
      this.downArrows.forEach(arrow => {
        arrow.style.display = 'block';
      });
    if (this._sectionIndex === this.pageOffsets.length - 1)
      this.downArrows.forEach(arrow => {
        arrow.style.display = 'none';
      });
  }

  ngOnDestroy() {
    // Release ALL DOM references, new ones will be picked up on next view init
    this.scrollEvents.unsubscribe();
    this.$windowScroll = null;
    this.downArrows.forEach((arrow: any) => arrow.onclick = null);
    this.downArrows = null;
    this.upArrows.forEach((arrow: any) => arrow.onclick = null);
    this.upArrows = null;
    this.anchorNodes = null;
    this.nativeEl = null;
  }
}
