import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAuctionsComponent } from './view-auctions.component';

describe('ViewAuctionsComponent', () => {
  let component: ViewAuctionsComponent;
  let fixture: ComponentFixture<ViewAuctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAuctionsComponent]
    });
    fixture = TestBed.createComponent(ViewAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
