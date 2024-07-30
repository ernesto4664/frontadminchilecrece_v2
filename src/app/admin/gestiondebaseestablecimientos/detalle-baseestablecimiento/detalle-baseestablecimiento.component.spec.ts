import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBaseestablecimientoComponent } from './detalle-baseestablecimiento.component';

describe('DetalleBaseestablecimientoComponent', () => {
  let component: DetalleBaseestablecimientoComponent;
  let fixture: ComponentFixture<DetalleBaseestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleBaseestablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleBaseestablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
