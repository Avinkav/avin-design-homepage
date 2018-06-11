import { Component, OnInit, Input, AfterViewInit, ElementRef, ChangeDetectorRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NAV_SELECTOR } from '../directives/definitions';
import { INVALID } from '@angular/forms/src/model';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: NAV_SELECTOR,
  templateUrl: './one-page-nav.component.html',
  styleUrls: ['./one-page-nav.component.css']
})
export class OnePageNavComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() anchorClick = new EventEmitter();
  @Input() anchors;
  @Input()
  public set sectionIndex(val: number) {
    this._sectionIndex = val;
    this.moveSlider(val);
  }

  public get sectionIndex(): number {
    return this._sectionIndex;
  }
  _sectionIndex: number;

  indicatorLeft = '0px';
  indicatorWidth = '0px';
  anchorEls: any[];

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) {
  }

  clickAnchor(index: number) {
    this.anchorClick.emit(index);
    this.moveSlider(index);
    return false;
  }

  moveSlider(index: number) {
    // Check for DOM access
    if (!this.anchorEls)
      return;
    this.indicatorWidth = `${this.anchorEls[index].offsetWidth}px`;
    this.indicatorLeft = `translateX(${this.anchorEls[index].offsetLeft}px)`;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.anchorEls = Array.from(this.el.nativeElement.querySelectorAll('.one-page-nav-item'))
      .map((node: any) => ({
        offsetWidth: node.offsetWidth,
        offsetLeft: node.offsetLeft
      }));

    this.moveSlider(this._sectionIndex);
    const totalwidth = this.anchorEls.reduce((acc, val) => val.offsetWidth + acc, 0);
  }

  ratio() {
    return (window.scrollY / window.innerHeight) / this.anchorEls.length;
  }

  ngOnDestroy() {
    this.anchorEls = null;
  }
}
