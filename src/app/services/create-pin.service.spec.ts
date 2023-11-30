import { TestBed } from '@angular/core/testing';

import { CreatePinService } from './create-pin.service';

describe('CreatePinService', () => {
  let service: CreatePinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
