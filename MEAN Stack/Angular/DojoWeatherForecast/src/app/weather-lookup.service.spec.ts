import { TestBed, inject } from '@angular/core/testing';

import { WeatherLookupService } from './weather-lookup.service';

describe('WeatherLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherLookupService]
    });
  });

  it('should be created', inject([WeatherLookupService], (service: WeatherLookupService) => {
    expect(service).toBeTruthy();
  }));
});
