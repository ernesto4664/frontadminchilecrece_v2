import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtapaComponent } from './edit-etapa.component';

describe('EditEtapaComponent', () => {
  let component: EditEtapaComponent;
  let fixture: ComponentFixture<EditEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEtapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
