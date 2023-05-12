import { TestBed } from '@angular/core/testing';

import { BeautyServiceService } from './beauty-service.service';

describe('BeautyServiceService', () => {
  let service: BeautyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeautyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
