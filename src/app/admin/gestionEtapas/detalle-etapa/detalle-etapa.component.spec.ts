import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEtapaComponent } from './detalle-etapa.component';

describe('DetalleEtapaComponent', () => {
  let component: DetalleEtapaComponent;
  let fixture: ComponentFixture<DetalleEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEtapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
