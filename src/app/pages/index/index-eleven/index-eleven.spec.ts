import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEleven } from './index-eleven';

describe('IndexEleven', () => {
  let component: IndexEleven;
  let fixture: ComponentFixture<IndexEleven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEleven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexEleven);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
