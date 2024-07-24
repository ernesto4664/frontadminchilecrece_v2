import { TestBed } from '@angular/core/testing';

import { UsuariosappService } from './usuariosapp.service';

describe('UsuariosappService', () => {
  let service: UsuariosappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
