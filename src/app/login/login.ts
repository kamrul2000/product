import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginData } from '../auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // API requires "username"
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const credentials: LoginData = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login error:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
