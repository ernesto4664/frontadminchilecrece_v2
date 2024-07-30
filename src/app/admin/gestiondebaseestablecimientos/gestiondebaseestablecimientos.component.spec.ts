import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondebaseestablecimientosComponent } from './gestiondebaseestablecimientos.component';

describe('GestiondebaseestablecimientosComponent', () => {
  let component: GestiondebaseestablecimientosComponent;
  let fixture: ComponentFixture<GestiondebaseestablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiondebaseestablecimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiondebaseestablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
