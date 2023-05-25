import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciPage } from './llistat.page';

describe('IniciPage', () => {
  let component: IniciPage;
  let fixture: ComponentFixture<IniciPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IniciPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
