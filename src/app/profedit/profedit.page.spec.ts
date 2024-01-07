import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfeditPage } from './profedit.page';

describe('ProfeditPage', () => {
  let component: ProfeditPage;
  let fixture: ComponentFixture<ProfeditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
