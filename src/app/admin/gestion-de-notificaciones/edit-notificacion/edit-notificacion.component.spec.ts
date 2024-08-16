import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotificacionComponent } from './edit-notificacion.component';

describe('EditNotificacionComponent', () => {
  let component: EditNotificacionComponent;
  let fixture: ComponentFixture<EditNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
