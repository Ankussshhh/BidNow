import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionService } from '../../services/auction.service'; // Adjust the path as needed
import { AuthService } from '../../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-view-auctions',
  templateUrl: './view-auctions.component.html',
  styleUrls: ['./view-auctions.component.scss']
})
export class ViewAuctionsComponent implements OnInit {
  auctions: any[] = []; // Array to store auctions

  constructor(
    private http: HttpClient,
    private auctionService: AuctionService,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAuctions();
  }

  fetchAuctions(): void {
    this.http.get('http://localhost:3000/api/auctions').subscribe(
      (data: any) => {
        console.log('Fetched Auctions:', data);
        this.auctions = data;
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  deleteAuction(auctionId: string): void {
    if (confirm('Are you sure you want to delete this auction?')) {
      const token = this.authService.getToken();  // Get token from AuthService
      
      console.log('JWT Token:', token);  // Debugging log
      console.log('Auction ID to delete:', auctionId); // Debug log
  
      if (!token) {
        console.error('No authentication token available.');
        return;
      }
  
      this.auctionService.deleteAuction(auctionId, token).subscribe({
        next: () => {
          console.log('Auction deleted successfully');
          this.auctions = this.auctions.filter(auction => auction._id !== auctionId);
        },
        error: (err) => {
          console.error('Error deleting auction:', err);
        },
      });
    }
  }
}
