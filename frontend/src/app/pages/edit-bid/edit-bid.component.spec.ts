import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidComponent } from './edit-bid.component';

describe('EditBidComponent', () => {
  let component: EditBidComponent;
  let fixture: ComponentFixture<EditBidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBidComponent]
    });
    fixture = TestBed.createComponent(EditBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
