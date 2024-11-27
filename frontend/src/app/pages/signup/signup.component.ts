import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Submit method to call API
  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
  
      this.http.post('http://localhost:3000/api/auth/signup', formData)
        .subscribe(
          (response: any) => {
            alert('Signup successful!');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
          }
        );
    }
  }
}
