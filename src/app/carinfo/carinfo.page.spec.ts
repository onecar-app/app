import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarinfoPage } from './carinfo.page';

describe('CarinfoPage', () => {
  let component: CarinfoPage;
  let fixture: ComponentFixture<CarinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
