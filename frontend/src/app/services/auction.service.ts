import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private apiUrl = 'http://localhost:3000/api/auctions'; // Base API URL

  constructor(private http: HttpClient) {}

  /**
   * Delete an auction by its ID.
   * @param auctionId - ID of the auction to delete.
   * @param token - JWT token for authentication
   * @returns Observable with the delete response.
   */
  deleteAuction(auctionId: string, token: string) {
    return this.http.delete(`http://localhost:3000/api/auctions/${auctionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } 
}
