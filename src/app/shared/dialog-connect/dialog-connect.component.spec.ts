import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConnectComponent } from './dialog-connect.component';

describe('DialogConnectComponent', () => {
  let component: DialogConnectComponent;
  let fixture: ComponentFixture<DialogConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
