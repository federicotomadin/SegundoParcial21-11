import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaCompletaComponent } from './grilla-completa.component';

describe('GrillaCompletaComponent', () => {
  let component: GrillaCompletaComponent;
  let fixture: ComponentFixture<GrillaCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
