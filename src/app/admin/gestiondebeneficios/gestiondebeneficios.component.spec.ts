import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondebeneficiosComponent } from './gestiondebeneficios.component';

describe('GestiondebeneficiosComponent', () => {
  let component: GestiondebeneficiosComponent;
  let fixture: ComponentFixture<GestiondebeneficiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiondebeneficiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiondebeneficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
