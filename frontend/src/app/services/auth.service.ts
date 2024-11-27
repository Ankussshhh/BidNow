// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; // Your API URL for authentication

  constructor(private http: HttpClient) {}

  // Sign Up
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Logout (removes JWT token)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in (check token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get token (for protected API requests)
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
