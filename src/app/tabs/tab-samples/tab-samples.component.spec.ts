import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSamplesComponent } from './tab-samples.component';

describe('TabSamplesComponent', () => {
  let component: TabSamplesComponent;
  let fixture: ComponentFixture<TabSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
