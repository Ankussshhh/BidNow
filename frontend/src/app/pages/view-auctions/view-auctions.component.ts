import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionService } from '../../services/auction.service'; 
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-view-auctions',
  templateUrl: './view-auctions.component.html',
  styleUrls: ['./view-auctions.component.scss']
})
export class ViewAuctionsComponent implements OnInit {
  auctions: any[] = [];
  isDeleting: boolean = false;

  constructor(
    private http: HttpClient,
    private auctionService: AuctionService,
    private authService: AuthService  
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
      const token = this.authService.getToken();
  
      if (!token) {
        console.error('No authentication token available. Deletion cannot proceed.');
        return;
      }
  
      this.isDeleting = true;
  
      this.auctionService.deleteAuction(auctionId, token).subscribe({
        next: () => {
          console.log('Auction deleted successfully');
          this.auctions = this.auctions.filter(auction => auction._id !== auctionId);
          this.isDeleting = false;
        },
        error: (err) => {
          // Log the error response to check its structure
          console.error('Error deleting auction:', err);
          this.isDeleting = false;
        }
      });
    }
  }
}
