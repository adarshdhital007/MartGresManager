// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalCost: number = 0;

  constructor(private cartservice: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.cartservice.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.calculateTotalCost();
    });
  }

  calculateTotalCost() {
    this.totalCost = this.cartItems.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  }

  removeFromCart(product: Product) {
    this.cartservice.removeFromCart(product);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  incrementQuantity(product: Product) {
    this.cartservice.addToCart(product);
  }

  decrementQuantity(product: Product) {
    this.cartservice.removeFromCart(product);
  }
}
