import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacaoComponent } from './recuperacao.component';

describe('RecuperacaoComponent', () => {
  let component: RecuperacaoComponent;
  let fixture: ComponentFixture<RecuperacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
