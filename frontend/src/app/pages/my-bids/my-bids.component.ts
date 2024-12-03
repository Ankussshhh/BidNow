// my-bids.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {
  userBids: any[] = []; // List of bids posted by the user
  currentUserId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user data from localStorage or AuthService
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.currentUserId = parsedData.id; // Assuming user ID is saved in userData
    }

    // Fetch the bids posted by the current user
    this.fetchUserBids();
  }

  fetchUserBids(): void {
    // Fetch the user's posted bids from the backend API
    this.http.get(`http://localhost:3000/api/auctions/user/${this.currentUserId}`).subscribe(
      (data: any) => {
        this.userBids = data;
      },
      (error) => {
        console.error('Error fetching user bids:', error);
      }
    );
  }

  deleteBid(bidId: string): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      alert('Please log in to delete your bid.');
      this.router.navigate(['/login']);
      return;
    }
  
    const parsedData = JSON.parse(userData);
    const userId = parsedData.id;
  
    if (confirm('Are you sure you want to delete this bid?')) {
      this.http.delete(`http://localhost:3000/api/auctions/${bidId}`, { 
        body: { userId } 
      }).subscribe(
        () => {
          this.userBids = this.userBids.filter(bid => bid._id !== bidId);
          alert('Bid deleted successfully!');
        },
        (error) => {
          console.error('Error deleting bid:', error);
          alert('Failed to delete bid.');
        }
      );
    }
  }

  editBid(bidId: string): void {
    // Redirect to edit bid page
    this.router.navigate([`/edit-bid/${bidId}`]);
  }
}
