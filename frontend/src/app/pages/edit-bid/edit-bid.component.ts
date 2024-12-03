// edit-bid.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-bid',
  templateUrl: './edit-bid.component.html',
  styleUrls: ['./edit-bid.component.scss']
})
export class EditBidComponent implements OnInit {
  bidId: string = '';
  bid: any = {
    title: '',
    description: '',
    startingBid: null,
    currentBid: null,
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bidId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchBid();
  }

  fetchBid(): void {
    // Fetch the bid details by ID to populate the form
    this.http.get(`http://localhost:3000/api/auctions/${this.bidId}`).subscribe(
      (data: any) => {
        this.bid = data;
      },
      (error) => {
        console.error('Error fetching bid:', error);
        alert('Failed to fetch bid details.');
      }
    );
  }

  onSubmit(): void {
    // Update the bid with the new data
    this.http.put(`http://localhost:3000/api/auctions/${this.bidId}`, this.bid).subscribe(
      (response) => {
        alert('Bid updated successfully!');
        this.router.navigate(['/my-bids']); // Redirect to My Bids page
      },
      (error) => {
        console.error('Error updating bid:', error);
        alert('Failed to update bid.');
      }
    );
  }
}
