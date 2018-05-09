import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPhilosophyComponent } from './design-philosophy.component';

describe('DesignPhilosophyComponent', () => {
  let component: DesignPhilosophyComponent;
  let fixture: ComponentFixture<DesignPhilosophyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPhilosophyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPhilosophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
