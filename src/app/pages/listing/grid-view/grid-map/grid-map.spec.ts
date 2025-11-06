import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMap } from './grid-map';

describe('GridMap', () => {
  let component: GridMap;
  let fixture: ComponentFixture<GridMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridMap]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
