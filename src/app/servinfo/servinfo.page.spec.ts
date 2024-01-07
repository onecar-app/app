import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ServinfoPage } from './servinfo.page';

describe('ServinfoPage', () => {
  let component: ServinfoPage;
  let fixture: ComponentFixture<ServinfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
