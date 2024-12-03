import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.scss'],
})
export class CreateBidComponent {
  bid = {
    title: '',
    description: '',
    startingBid: 0,
    imageUrl: '',
  };

  currentUserId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        this.currentUserId = parsedData.userId || null;
        console.log('Current User ID:', this.currentUserId);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }

    if (!this.currentUserId) {
      alert('Your session has expired. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (!this.bid.title || !this.bid.description || !this.bid.startingBid) {
      alert('All fields are required!');
      return;
    }

    const bidData = {
      ...this.bid,
      currentBid: this.bid.startingBid,
      userId: this.currentUserId,
    };

    this.http.post('http://localhost:3000/api/auctions/create', bidData).subscribe(
      (response: any) => {
        alert('Auction created successfully!');
        this.router.navigate(['/']); // Redirect to home
      },
      (error) => {
        console.error('Error creating auction:', error);
        alert('Failed to create auction. Please try again.');
      }
    );
  }
}
