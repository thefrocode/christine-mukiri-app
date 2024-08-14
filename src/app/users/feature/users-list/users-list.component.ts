import { Component, effect, inject } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { UsersStore } from '../../data-access/users.store';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  private gridApi!: GridApi;

  authStore = inject(AuthStore);

  colDefs: ColDef[] = [
    { field: 'usrFirstname', flex: 1 },
    { field: 'usrLastname', flex: 1 },
    { field: 'usrUsername', flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        container.classList.add(
          'flex',
          'flex-row',
          'items-center',
          'gap-2',
          'text-[0.9375rem]'
        );

        const editButton = document.createElement('button');

        editButton.classList.add(
          'bg-green-300',
          'px-1',
          'py-0.5',
          'rounded-md'
        );
        editButton.addEventListener('click', () => this.editUser(params.data));

        const editIcon = document.createElement('i');
        editIcon.classList.add('bi', 'bi-pen');
        editButton.appendChild(editIcon);
        editButton.innerHTML = 'Edit';

        const deleteButton = document.createElement('button');

        deleteButton.classList.add(
          'bg-red-300',
          'px-1',
          'py-0.5',
          'rounded-md'
        );
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('bi', 'bi-trash');
        deleteButton.appendChild(deleteIcon);
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () =>
          this.deleteUser(params.data)
        );

        container.appendChild(editButton);
        container.appendChild(deleteButton);

        return container;
      },
      width: 200,
    },
  ];

  usersStore = inject(UsersStore);

  constructor(private dialog: MatDialog) {}

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.usersStore.deleteUser(user.id);
    });
  }
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  ngOnInit() {
    this.usersStore.loadUsers();
  }

  addUser() {
    const dialogRef = this.dialog.open(UsersAddComponent, {
      width: '500px',
      height: '42vh',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.usersStore.addUser(result);
    });
  }
  editUser(user: any) {
    const dialogRef = this.dialog.open(UsersEditComponent, {
      width: '500px',
      data: { user: user },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;
      this.usersStore.editUser(result);
    });
  }
}
