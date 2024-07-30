import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondeubicacionesComponent } from './gestiondeubicaciones.component';

describe('GestiondeubicacionesComponent', () => {
  let component: GestiondeubicacionesComponent;
  let fixture: ComponentFixture<GestiondeubicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiondeubicacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiondeubicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
