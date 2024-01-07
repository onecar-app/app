import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ServaddPage } from './servadd.page';

describe('ServaddPage', () => {
  let component: ServaddPage;
  let fixture: ComponentFixture<ServaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
