import { TestBed } from '@angular/core/testing';

import { AcessoNaoAutenticadoService } from './acesso-nao-autenticado.service';

describe('AcessoNaoAutenticadoService', () => {
  let service: AcessoNaoAutenticadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcessoNaoAutenticadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
