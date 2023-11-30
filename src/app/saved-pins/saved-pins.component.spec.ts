import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPinsComponent } from './saved-pins.component';

describe('SavedPinsComponent', () => {
  let component: SavedPinsComponent;
  let fixture: ComponentFixture<SavedPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
