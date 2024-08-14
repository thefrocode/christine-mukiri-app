import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../shared/data-access/models/user';
import { UserFormComponent } from '../../ui/user-form/user-form.component';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css',
})
export class UsersAddComponent {
  constructor(public dialogRef: MatDialogRef<UsersAddComponent>) {}
  onUserAdded(user: User) {
    this.dialogRef.close(user);
  }
}
