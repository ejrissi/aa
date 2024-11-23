import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADDComponent } from './add.component';

describe('ADDComponent', () => {
  let component: ADDComponent;
  let fixture: ComponentFixture<ADDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ADDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
