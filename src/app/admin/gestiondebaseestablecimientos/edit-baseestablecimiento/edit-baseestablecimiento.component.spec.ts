import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaseestablecimientoComponent } from './edit-baseestablecimiento.component';

describe('EditBaseestablecimientoComponent', () => {
  let component: EditBaseestablecimientoComponent;
  let fixture: ComponentFixture<EditBaseestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBaseestablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBaseestablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
