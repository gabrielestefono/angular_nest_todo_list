import { TestBed } from '@angular/core/testing';

import { RecuperacaoService } from './recuperacao.service';

describe('RecuperacaoService', () => {
  let service: RecuperacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
