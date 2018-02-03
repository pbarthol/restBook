import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealOverviewComponent } from './meal-overview.component';

describe('MealOverviewComponent', () => {
  let component: MealOverviewComponent;
  let fixture: ComponentFixture<MealOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
