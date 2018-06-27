import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.css']
})
export class NewTodoDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<NewTodoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  ngOnInit() {
  }
  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
