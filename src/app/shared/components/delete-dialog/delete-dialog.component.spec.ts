import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { DeleteDialogComponent } from './delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close method dispatchDeleteAction is called', () => {
    component.dispatchDeleteAction();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call close method dispatchDeleteAction is called with true', () => {
    component.dispatchDeleteAction();

    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call close method dispatchCancelDeleteAction is called', () => {
    component.dispatchCancelDeleteAction();

    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call close method dispatchCancelDeleteAction is called with false', () => {
    component.dispatchCancelDeleteAction();

    expect(component.dialogRef.close).toHaveBeenCalledWith(false);
  });
});
