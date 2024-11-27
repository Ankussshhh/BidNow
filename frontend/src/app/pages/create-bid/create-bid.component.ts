import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.scss']
})
export class CreateBidComponent {
  bid = {
    title: '',
    description: '',
    startingBid: null, // Ensure startingBid is defined
    currentBid: null,
    imageUrl: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.bid.title || !this.bid.description || !this.bid.startingBid) {
      alert('Title, description, and starting bid are required.');
      return;
    }
  
    // Set currentBid to startingBid if not explicitly provided
    if (!this.bid.imageUrl) {
      this.bid.imageUrl = '';  // Set empty string for missing image URL if not provided
    }
  
    this.http.post('http://localhost:3000/api/auctions', this.bid).subscribe(
      (response: any) => {
        console.log('Auction created successfully:', response);
        alert('Auction created successfully!');
      },
      (error) => {
        console.error('Error creating auction:', error);
        alert('Failed to create auction. Please try again.');
      }
    );
  }
}
