import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotificacionComponent } from './add-notificacion.component';

describe('AddNotificacionComponent', () => {
  let component: AddNotificacionComponent;
  let fixture: ComponentFixture<AddNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
