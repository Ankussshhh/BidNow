import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private baseUrl = 'http://localhost:3000/api/auctions'; // Base URL for the auctions API

  constructor(private http: HttpClient) {}

  // Delete auction by ID
  deleteAuction(auctionId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.delete(`http://localhost:3000/api/auctions/${auctionId}`, { headers });
  }
}