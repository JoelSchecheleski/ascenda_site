import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailTwo } from './property-detail-two';

describe('PropertyDetailTwo', () => {
  let component: PropertyDetailTwo;
  let fixture: ComponentFixture<PropertyDetailTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailTwo]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyDetailTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
