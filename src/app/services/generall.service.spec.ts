import { TestBed } from '@angular/core/testing';

import { GenerallService } from './generall.service';

describe('GenerallService', () => {
  let service: GenerallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
