import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-auctions',
  templateUrl: './view-auctions.component.html',
  styleUrls: ['./view-auctions.component.scss']
})
export class ViewAuctionsComponent implements OnInit {
  auctions: any[] = []; // Array to store auctions

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuctions();
  }

  fetchAuctions(): void {
    this.http.get('http://localhost:3000/api/auctions').subscribe(
      (data: any) => {
        console.log('Fetched Auctions:', data); // Log the response to inspect the image URLs
        this.auctions = data;
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }
}
