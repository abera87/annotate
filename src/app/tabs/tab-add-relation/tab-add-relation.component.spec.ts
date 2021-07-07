import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAddRelationComponent } from './tab-add-relation.component';

describe('TabAddRelationComponent', () => {
  let component: TabAddRelationComponent;
  let fixture: ComponentFixture<TabAddRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAddRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAddRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
