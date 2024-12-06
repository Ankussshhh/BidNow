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
  isLoading = true; // For showing loading spinner
  errorMessage: string = ''; // For displaying errors

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user data from AuthService
    this.authService.getUserData().subscribe((userData) => {
      if (userData && userData.id) {
        this.currentUserId = userData.id;
        this.fetchUserBids();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }  

  fetchUserBids(): void {
    this.http.get(`http://localhost:3000/api/auctions/user/${this.currentUserId}`).subscribe(
      (data: any) => {
        this.userBids = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load bids. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching user bids:', error);
      }
    );
  }

  deleteBid(bidId: string): void {
    if (!this.currentUserId) {
      alert('Please log in to delete your bid.');
      this.router.navigate(['/login']);
      return;
    }

    if (confirm('Are you sure you want to delete this bid?')) {
      this.http.delete(`http://localhost:3000/api/auctions/${bidId}`, {
        body: { userId: this.currentUserId }
      }).subscribe(
        () => {
          this.userBids = this.userBids.filter(bid => bid._id !== bidId);
          alert('Bid deleted successfully!');
        },
        (error) => {
          this.errorMessage = 'Failed to delete bid. Please try again.';
          console.error('Error deleting bid:', error);
        }
      );
    }
  }

  editBid(bidId: string): void {
    // Redirect to edit bid page
    this.router.navigate([`/edit-bid/${bidId}`]);
  }
}
