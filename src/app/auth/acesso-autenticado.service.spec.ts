import { TestBed } from '@angular/core/testing';

import { AcessoAutenticadoService } from './acesso-autenticado.service';

describe('AcessoAutenticadoService', () => {
  let service: AcessoAutenticadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessoAutenticadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
