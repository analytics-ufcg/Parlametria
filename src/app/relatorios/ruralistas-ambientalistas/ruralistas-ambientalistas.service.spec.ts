import { TestBed } from '@angular/core/testing';

import { RuralistasAmbientalistasService } from './ruralistas-ambientalistas.service';

describe('RuralistasAmbientalistasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuralistasAmbientalistasService = TestBed.get(RuralistasAmbientalistasService);
    expect(service).toBeTruthy();
  });
});
