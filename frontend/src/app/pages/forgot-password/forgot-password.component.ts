import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
  
      this.http.post('http://localhost:3000/api/auth/forgot-password', formData).subscribe(
        (response: any) => {
          alert(response.message);
        },
        (error) => {
          console.error('Error:', error);
          alert('Failed to send reset link. Please try again.');
        }
      );
    }
  }
}
