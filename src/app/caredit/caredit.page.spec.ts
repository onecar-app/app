import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CareditPage } from './caredit.page';

describe('CareditPage', () => {
  let component: CareditPage;
  let fixture: ComponentFixture<CareditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CareditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
