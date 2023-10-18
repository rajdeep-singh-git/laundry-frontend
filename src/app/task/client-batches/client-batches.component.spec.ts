import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBatchesComponent } from './client-batches.component';

describe('ClientBatchesComponent', () => {
  let component: ClientBatchesComponent;
  let fixture: ComponentFixture<ClientBatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientBatchesComponent]
    });
    fixture = TestBed.createComponent(ClientBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
