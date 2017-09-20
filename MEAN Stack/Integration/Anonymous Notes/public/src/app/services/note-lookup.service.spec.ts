import { TestBed, inject } from '@angular/core/testing';

import { NoteLookupService } from './note-lookup.service';

describe('NoteLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteLookupService]
    });
  });

  it('should be created', inject([NoteLookupService], (service: NoteLookupService) => {
    expect(service).toBeTruthy();
  }));
});
