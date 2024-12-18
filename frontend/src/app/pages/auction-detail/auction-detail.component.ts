import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { HttpHeaders } from '@angular/common/http'; // Make sure this import is added

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent implements OnInit {
  auction: any;
  remainingTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  ngOnInit(): void {
    const auctionId = this.route.snapshot.paramMap.get('id');
    console.log('Auction ID:', auctionId);  // Debugging line to check the auction ID
    if (auctionId) {
      this.fetchAuctionDetails(auctionId);
    } else {
      console.error('Auction ID is undefined');
    }
  }
  

  fetchAuctionDetails(id: string): void {
    this.auctionService.getAuctionById(id).subscribe(
      (data) => {
        console.log('Auction Data:', data);  // Log the entire auction data
        this.auction = data;
        
        // Check if endTime is valid
        if (!this.auction.endTime) {
          console.error('End time is missing');
          this.remainingTime = 'End time not available';
          return;
        }
  
        this.startCountdown();
      },
      (error) => console.error('Error fetching auction details:', error)
    );
  }

  startCountdown(): void {
    const expiryTime = new Date(this.auction.endTime).getTime(); // Changed from expiryTime to endTime

    if (isNaN(expiryTime)) {
      console.error('Invalid expiry time:', this.auction.endTime);
      this.remainingTime = 'Invalid expiry time';
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = expiryTime - now;
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        this.remainingTime = 'Expired';
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        this.remainingTime = `${hours}h ${minutes}m ${seconds}s`;
      }
    }, 1000);
  }

  deleteBid(bidId: string): void {
    if (!confirm('Are you sure you want to delete this bid?')) {
      return;
    }
  
    this.auctionService.deleteBid(this.auction._id, bidId).subscribe(
      (response) => {
        alert('Bid deleted successfully!');
        this.fetchAuctionDetails(this.auction._id); // Refresh auction data
      },
      (error) => {
        console.error('Error deleting bid:', error);
        alert(error.error?.message || 'An error occurred while deleting the bid.');
      }
    );
  }
  

  placeBid(): void {
    const newBidAmount = prompt('Enter your bid amount:');
    if (!newBidAmount || isNaN(parseFloat(newBidAmount))) {
      alert('Invalid bid amount!');
      return;
    }
  
    if (parseFloat(newBidAmount) > this.auction.currentBid) {
      const bid = {
        bidAmount: parseFloat(newBidAmount),
      };
  
      this.auctionService.placeBid(this.auction._id, bid).subscribe(
        (response) => {
          alert('Bid placed successfully!');
          this.fetchAuctionDetails(this.auction._id); // Refresh auction data
        },
        (error) => {
          console.error('Error placing bid:', error);
          alert(error.error?.message || 'An error occurred while placing the bid.');
        }
      );
    } else {
      alert('Bid must be higher than the current bid!');
    }
  }  
}
