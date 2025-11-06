import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRePassword } from './auth-re-password';

describe('AuthRePassword', () => {
  let component: AuthRePassword;
  let fixture: ComponentFixture<AuthRePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRePassword]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
