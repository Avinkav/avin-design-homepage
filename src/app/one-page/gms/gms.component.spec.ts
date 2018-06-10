import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmsComponent } from './gms.component';

describe('GmsComponent', () => {
  let component: GmsComponent;
  let fixture: ComponentFixture<GmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
