import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PushesPage } from './pushes.page';

describe('PushesPage', () => {
  let component: PushesPage;
  let fixture: ComponentFixture<PushesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PushesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
