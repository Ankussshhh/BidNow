// header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // Check if the user is logged in by looking for a token in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Returns true if token exists
  }

  // Handle sign-out
  signOut() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Optionally, redirect to the homepage or login page
    this.router.navigate(['/']);
  }
}
