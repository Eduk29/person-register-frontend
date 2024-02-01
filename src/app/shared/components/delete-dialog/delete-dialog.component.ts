import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPerson } from 'src/app/person/models/person.model';

@Component({
  selector: 'edv-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPerson
  ) {}

  public dispatchDeleteAction(): void {
    this.dialogRef.close(true);
  }

  public dispatchCancelDeleteAction(): void {
    this.dialogRef.close(false);
  }
}
