import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuralistasAmbientalistasComponent } from './ruralistas-ambientalistas.component';

describe('RuralistasAmbientalistasComponent', () => {
  let component: RuralistasAmbientalistasComponent;
  let fixture: ComponentFixture<RuralistasAmbientalistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuralistasAmbientalistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuralistasAmbientalistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
