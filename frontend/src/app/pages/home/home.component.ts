import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  featuredAuctions: any[] = []; // Stores the featured auctions

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch featured auctions
    this.fetchAllAuctions();

    // Subscribe to user changes to update userName dynamically
    this.authService.user$.subscribe((user) => {
      this.userName = user.name;
    });
  }

  fetchAllAuctions(): void {
    this.http.get('http://localhost:3000/api/auctions').subscribe(
      (data: any) => {
        this.featuredAuctions = this.getRandomAuctions(data.map((auction: any) => ({
          ...auction,
          imageUrl: auction.imageUrl  // Use the imageUrl directly
        })), 3);
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  // Helper function to pick random auctions
  getRandomAuctions(auctions: any[], count: number): any[] {
    const shuffled = auctions.sort(() => 0.5 - Math.random()); // Shuffle the auctions array
    return shuffled.slice(0, count); // Return the first 'count' auctions
  }

  viewAuction(id: number): void {
    console.log(`Viewing auction with ID: ${id}`); // Handle auction navigation
  }
}
