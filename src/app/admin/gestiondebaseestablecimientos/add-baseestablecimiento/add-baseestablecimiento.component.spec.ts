import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseestablecimientoComponent } from './add-baseestablecimiento.component';

describe('AddBaseestablecimientoComponent', () => {
  let component: AddBaseestablecimientoComponent;
  let fixture: ComponentFixture<AddBaseestablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBaseestablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBaseestablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
