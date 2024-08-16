import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNotificacionComponent } from './detalle-notificacion.component';

describe('DetalleNotificacionComponent', () => {
  let component: DetalleNotificacionComponent;
  let fixture: ComponentFixture<DetalleNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
