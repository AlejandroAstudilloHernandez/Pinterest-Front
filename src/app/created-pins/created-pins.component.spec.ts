import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPinsComponent } from './created-pins.component';

describe('CreatedPinsComponent', () => {
  let component: CreatedPinsComponent;
  let fixture: ComponentFixture<CreatedPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
