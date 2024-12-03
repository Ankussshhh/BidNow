import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http.post('http://localhost:3000/api/auth/login', { email, password }).subscribe(
        (response: any) => {
          // Save user data in localStorage
          localStorage.setItem('authToken', response.token); // Save the token
          localStorage.setItem('userData', JSON.stringify({
            token: response.token,
            name: response.name,
            userId: response.userId // Save the userId
          }));

          // Pass all three required parameters to the setUserData method
          this.authService.setUserData(response.token, response.name, response.userId);

          // Redirect after login
          this.router.navigate(['/']); // Redirect to home after login
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
