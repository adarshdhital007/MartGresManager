// user-info.component.ts
import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  loggedInUser: any;
  orderHistory: any[] = [];

  constructor(
    private userInfoService: UserInfoService,
    private router: Router,
    private orderHistoryService: OrderHistoryService
  ) {}

  // Convert total_cost to a number in the calculateOverallTotalCost method
  calculateOverallTotalCost(): number {
    let overallTotalCost = 0;

    for (const order of this.orderHistory) {
      overallTotalCost += parseFloat(order.total_cost);
      // or use Number(order.total_cost);
    }

    return overallTotalCost;
  }

  ngOnInit() {
    this.loggedInUser = this.userInfoService.getLoggedInUser();

    if (this.loggedInUser) {
      // Fetch order history for the logged-in user
      const token = this.loggedInUser.token;

      this.orderHistoryService.getOrderHistory(token).subscribe(
        (history) => {
          this.orderHistory = history;
        },
        (error) => {
          console.error('Error fetching order history:', error);
        }
      );
    } else {
      // Handle the case when the user is not logged in
    }
  }

  logOut() {
    this.userInfoService.clearLoggedInUser();
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']); // Redirect to the login/register page
  }
}
