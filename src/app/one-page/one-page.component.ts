import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-one-page',
  templateUrl: './one-page.component.html',
  styleUrls: ['./one-page.component.css']
})
export class OnePageComponent implements OnInit {

  sectionIndex = 0;
  anchors = [{ title: 'home' }, { title: 'gms' }, { title: 'about' }, { title: 'contact me' }];
  constructor() { }

  ngOnInit() {
  }
}
