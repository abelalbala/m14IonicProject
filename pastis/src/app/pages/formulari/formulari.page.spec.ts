import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariPage } from './formulari.page';

describe('FormulariPage', () => {
  let component: FormulariPage;
  let fixture: ComponentFixture<FormulariPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormulariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
