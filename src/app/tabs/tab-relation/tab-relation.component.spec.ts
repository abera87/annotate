import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRelationComponent } from './tab-relation.component';

describe('TabRelationComponent', () => {
  let component: TabRelationComponent;
  let fixture: ComponentFixture<TabRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
