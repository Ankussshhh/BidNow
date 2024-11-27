import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http
        .post('http://localhost:3000/api/auth/login', { email, password })
        .subscribe(
          (response: any) => {
            // Store the static JWT token in localStorage
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']); // Redirect after successful login
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
    }
  }
}
