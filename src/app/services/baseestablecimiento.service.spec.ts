import { TestBed } from '@angular/core/testing';

import { BaseestablecimientoService } from './baseestablecimiento.service';

describe('BaseestablecimientoService', () => {
  let service: BaseestablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseestablecimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
