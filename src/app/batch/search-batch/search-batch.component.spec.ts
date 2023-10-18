import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBatchComponent } from './search-batch.component';

describe('SearchBatchComponent', () => {
  let component: SearchBatchComponent;
  let fixture: ComponentFixture<SearchBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBatchComponent]
    });
    fixture = TestBed.createComponent(SearchBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
