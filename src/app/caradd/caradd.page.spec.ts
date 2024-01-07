import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaraddPage } from './caradd.page';

describe('CaraddPage', () => {
  let component: CaraddPage;
  let fixture: ComponentFixture<CaraddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaraddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
