import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOutputComponent } from './tab-output.component';

describe('TabOutputComponent', () => {
  let component: TabOutputComponent;
  let fixture: ComponentFixture<TabOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
