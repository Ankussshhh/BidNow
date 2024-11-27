// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make HTTP requests

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredAuctions: any[] = [];  // This will store the featured auctions

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch all auctions when the component initializes
    this.fetchAllAuctions();
  }

  fetchAllAuctions(): void {
    this.http.get('http://localhost:3000/api/auctions').subscribe(
      (data: any) => {
        // Assuming image is stored as relative path, make sure to prepend the base URL
        this.featuredAuctions = this.getRandomAuctions(data.map((auction: any) => ({
          ...auction,
          image: `http://localhost:3000${auction.image}`  // Adjust according to your image path
        })), 3);  // Pick 3 random auctions
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }
  
  // Helper function to pick random auctions
  getRandomAuctions(auctions: any[], count: number): any[] {
    const shuffled = auctions.sort(() => 0.5 - Math.random()); // Shuffle the auctions array
    return shuffled.slice(0, count);  // Return the first 'count' auctions from the shuffled array
  }

  viewAuction(id: number): void {
    // You can navigate to the auction details page here
    console.log(`Viewing auction with ID: ${id}`);
  }
}
