import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTeaserComponent } from './restaurant-teaser.component';

describe('RestaurantTeaserComponent', () => {
  let component: RestaurantTeaserComponent;
  let fixture: ComponentFixture<RestaurantTeaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantTeaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
