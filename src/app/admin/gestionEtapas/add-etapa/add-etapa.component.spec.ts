import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapaComponent } from './add-etapa.component';

describe('AddEtapaComponent', () => {
  let component: AddEtapaComponent;
  let fixture: ComponentFixture<AddEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEtapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
