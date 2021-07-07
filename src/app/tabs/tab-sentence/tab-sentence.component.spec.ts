import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSentenceComponent } from './tab-sentence.component';

describe('TabSentenceComponent', () => {
  let component: TabSentenceComponent;
  let fixture: ComponentFixture<TabSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabSentenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
