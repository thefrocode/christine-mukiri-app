import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../shared/data-access/models/user';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  usersForm!: FormGroup;
  @Input() type!: string;
  @Input() user!: User;
  @Output() submitted = new EventEmitter<User>();

  constructor(private fb: FormBuilder) {
    console.log(this.user);
  }

  ngOnInit() {
    this.usersForm = this.fb.group({
      usrFirstname: ['', Validators.required],
      usrLastname: ['', Validators.required],
      usrUsername: ['', Validators.required],
    });
    if (this.user) {
      this.usersForm.patchValue(this.user);
    }
  }
  ngOnChanges() {
    if (this.user) {
      this.usersForm.patchValue(this.user);
    }
  }
  onSubmit() {
    if (this.usersForm.invalid) {
      return;
    }
    this.submitted.emit(this.usersForm.value);
  }
}
