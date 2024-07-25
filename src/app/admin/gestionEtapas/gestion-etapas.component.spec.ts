import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtapasComponent } from './gestion-etapas.component';

describe('GestionEtapasComponent', () => {
  let component: GestionEtapasComponent;
  let fixture: ComponentFixture<GestionEtapasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEtapasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
