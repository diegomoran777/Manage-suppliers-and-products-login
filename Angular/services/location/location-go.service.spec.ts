import { TestBed } from '@angular/core/testing';

import { LocationGoService } from './location-go.service';

describe('LocationGoService', () => {
  let service: LocationGoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationGoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
