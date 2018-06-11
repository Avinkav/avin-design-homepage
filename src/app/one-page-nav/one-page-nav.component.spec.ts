import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePageNavComponent } from './one-page-nav.component';

describe('OnePageNavComponent', () => {
  let component: OnePageNavComponent;
  let fixture: ComponentFixture<OnePageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
