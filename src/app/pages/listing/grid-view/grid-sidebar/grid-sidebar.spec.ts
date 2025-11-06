import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSidebar } from './grid-sidebar';

describe('GridSidebar', () => {
  let component: GridSidebar;
  let fixture: ComponentFixture<GridSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSidebar]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
