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

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUserData(token: string, name: string, userId: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('name', name);
    localStorage.setItem('userId', userId);
    this.userSubject.next({ isLoggedIn: true, name });
  }

  clearUserData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    this.userSubject.next({ isLoggedIn: false, name: null });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Added method to get user data
  getUserData(): Observable<{ id: string | null, name: string | null }> {
    const userData = {
      id: this.getUserId(),
      name: this.getStoredUserName(),
    };
    return new BehaviorSubject(userData).asObservable();
  }

  private getStoredUserName(): string | null {
    return localStorage.getItem('name');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setUserData(response.token, response.name, response.userId);
        }
      })
    );
  }

  logout(): void {
    this.clearUserData();
  }
}
