import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../shared/data-access/models/user';
import { UserFormComponent } from '../../ui/user-form/user-form.component';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css',
})
export class UsersEditComponent {
  user = this.data.user;
  constructor(
    public dialogRef: MatDialogRef<UsersEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.user);
  }
  onUserEdited(user: User) {
    this.dialogRef.close({
      ...user,
      id: this.user.id,
    });
  }
}
