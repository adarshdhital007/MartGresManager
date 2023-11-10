import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Store';
  searchQuery: string = '';
  cartItemCount: number = 0;

  constructor(private router: Router, private cartService: ProductService) {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
    });
  }

  ngOnInit(): void {}

  searchProducts() {
    let queryParams = {};
    if (this.searchQuery) {
      queryParams = { q: this.searchQuery };
    }

    this.router.navigate(['/products'], {
      queryParams: queryParams,
    });
  }
}
