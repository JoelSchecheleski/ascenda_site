import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMap } from './list-map';

describe('ListMap', () => {
  let component: ListMap;
  let fixture: ComponentFixture<ListMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMap]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
