import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../data-access/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  authStore = inject(AuthStore);

  constructor(private fb: FormBuilder, private router: Router) {
    effect(() => {
      if (this.authStore.user()) {
        this.router.navigate(['/users']);
      }
    });
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authStore.login(this.loginForm.value);
  }
  get f() {
    return this.loginForm.controls;
  }
}
