import { TestBed, inject } from '@angular/core/testing';

import { GithubLookupService } from './github-lookup.service';

describe('GithubLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubLookupService]
    });
  });

  it('should be created', inject([GithubLookupService], (service: GithubLookupService) => {
    expect(service).toBeTruthy();
  }));
});
