import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Base API URL
  private userSubject = new BehaviorSubject<{ isLoggedIn: boolean; name: string | null }>({
    isLoggedIn: !!localStorage.getItem('authToken'),
    name: this.getStoredUserName(),
  });

  user$ = this.userSubject.asObservable(); // Observable for user data

  constructor(private http: HttpClient) {}

  /**
   * Set user data after successful login.
   * @param token - JWT token
   * @param name - User's name
   * @param userId - User's ID
   */
  setUserData(token: string, name: string, userId: string): void {
    localStorage.setItem('authToken', token);
    console.log('Token saved:', token);  // Debugging log
    localStorage.setItem('name', name);
    localStorage.setItem('userId', userId);
    this.userSubject.next({ isLoggedIn: true, name });
  }
  

  /**
   * Clear user data from local storage and update subject.
   */
  clearUserData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    this.userSubject.next({ isLoggedIn: false, name: null });
  }

  /**
   * Get the stored JWT token from local storage.
   * @returns JWT token or null if not available.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Get stored user name from local storage.
   * @returns User's name or null if not available.
   */
  private getStoredUserName(): string | null {
    return localStorage.getItem('name');
  }

  /**
   * Get stored user ID from local storage.
   * @returns User's ID or null if not available.
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Check if the user is currently logged in.
   * @returns True if logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Perform login request to the server.
   * @param email - User's email
   * @param password - User's password
   * @returns Observable with the login response
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setUserData(response.token, response.name, response.userId);
        }
      })
    );
  }

  /**
   * Perform logout by clearing user data and notifying observers.
   */
  logout(): void {
    this.clearUserData();
  }
}