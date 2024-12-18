import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = []; // Array to hold user data
  auctions: any[] = []; // Array to hold auction data
  errorMessage: string | null = null; // For error messages

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchAuctions();
  }

  fetchUsers(): void {
    this.http
      .get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .subscribe(
        (data: any) => (this.users = data),
        (err) => (this.errorMessage = err.error?.message || 'Failed to fetch users.')
      );
  }

  fetchAuctions(): void {
    this.http
      .get('http://localhost:3000/api/admin/auctions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .subscribe(
        (data: any) => (this.auctions = data),
        (err) => (this.errorMessage = err.error?.message || 'Failed to fetch auctions.')
      );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http
        .delete(`http://localhost:3000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        })
        .subscribe(
          () => {
            this.users = this.users.filter((user) => user._id !== userId);
            alert('User deleted successfully.');
          },
          (err) => alert(err.error?.message || 'Failed to delete user.')
        );
    }
  }

  deleteAuction(auctionId: string): void {
    if (confirm('Are you sure you want to delete this auction?')) {
      this.http
        .delete(`http://localhost:3000/api/admin/auctions/${auctionId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        })
        .subscribe(
          () => {
            this.auctions = this.auctions.filter((auction) => auction._id !== auctionId);
            alert('Auction deleted successfully.');
          },
          (err) => alert(err.error?.message || 'Failed to delete auction.')
        );
    }
  }

  editAuction(auction: any): void {
    const newTitle = prompt('Enter new title:', auction.title) || auction.title;
    const newDescription = prompt('Enter new description:', auction.description) || auction.description;
  
    const updatedAuction = { ...auction, title: newTitle, description: newDescription };
  
    this.http
      .put(`http://localhost:3000/api/admin/auctions/${auction._id}`, updatedAuction, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .subscribe(
        (updated: any) => {
          const index = this.auctions.findIndex((a) => a._id === auction._id);
          this.auctions[index] = updated.auction; // Update the local list
          alert('Auction updated successfully.');
        },
        (err) => alert(err.error?.message || 'Failed to update auction.')
      );
  }
}