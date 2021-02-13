import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaniesComponent } from './panies.component';

describe('PaniesComponent', () => {
  let component: PaniesComponent;
  let fixture: ComponentFixture<PaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
