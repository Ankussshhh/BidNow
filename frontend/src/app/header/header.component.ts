import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string | null = null;
  isProfileMenuVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = user.isLoggedIn;
      this.userName = user.name;
    });
  }

  toggleProfileMenu(): void {
    console.log('Profile menu clicked');
    console.log('Current state: isLoggedIn = ', this.isLoggedIn, ', isProfileMenuVisible = ', this.isProfileMenuVisible);
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }
  
  

  signOut(): void {
    this.authService.logout();  // Call the logout function from AuthService
    this.router.navigate(['/']);  // Navigate to the home page after sign-out
  }
}
