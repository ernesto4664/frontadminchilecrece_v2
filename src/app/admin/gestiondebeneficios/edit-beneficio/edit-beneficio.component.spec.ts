import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneficioComponent } from './edit-beneficio.component';

describe('EditBeneficioComponent', () => {
  let component: EditBeneficioComponent;
  let fixture: ComponentFixture<EditBeneficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBeneficioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
