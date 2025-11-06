import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFull } from './navbar-full';

describe('NavbarFull', () => {
  let component: NavbarFull;
  let fixture: ComponentFixture<NavbarFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFull]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
