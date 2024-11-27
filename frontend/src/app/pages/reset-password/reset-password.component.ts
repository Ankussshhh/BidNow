import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the token from the URL's query parameters
    this.token = this.route.snapshot.queryParams['token'];

    // Initialize the form for resetting the password
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Method to handle the form submission
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;

      // Ensure both password fields match
      if (formData.password === formData.confirmPassword) {
        // Send the password reset request to the backend
        this.http.post('http://localhost:3000/api/auth/reset-password', {
          token: this.token,
          password: formData.password
        }).subscribe(
          (response: any) => {
            alert('Password reset successful');
            this.router.navigate(['/login']); // Redirect to the login page after successful reset
          },
          (error) => {
            console.error('Error:', error);
            alert('Failed to reset password. Please try again.');
          }
        );
      } else {
        alert('Passwords do not match');
      }
    }
  }
}
