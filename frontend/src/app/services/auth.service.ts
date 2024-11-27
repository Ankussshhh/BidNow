import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // API URL
  private userSubject = new BehaviorSubject<{ isLoggedIn: boolean; name: string | null }>({
    isLoggedIn: !!localStorage.getItem('token'),
    name: this.getUserName(),
  });

  user$ = this.userSubject.asObservable(); // Observable for components

  constructor(private http: HttpClient) {}

  // Set user data after login
  setUserData(token: string, name: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    this.userSubject.next({ isLoggedIn: true, name });
  }

  // Clear user data on logout
  clearUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.userSubject.next({ isLoggedIn: false, name: null });
  }

  // Get stored user name
  private getUserName(): string | null {
    return localStorage.getItem('name');
  }

  // Logout method
  logout(): void {
    this.clearUserData();
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
