import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  product: Product | undefined;
  isCartEmpty: boolean = true;
  showNotFoundMessage: boolean = false;
  addToCartAllClicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartservice: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      this.getProductDetails(productId);
      this.isCartEmpty = this.cartservice.getCart().length === 0; // Check if the cart is empty
    });
  }

  getProductDetails(productId: number) {
    this.showNotFoundMessage = false; 
    this.addToCartAllClicked = false; 
    this.cartservice.getProductById(productId).subscribe(
      (data: Product) => {
        this.product = data;
        this.product.loading = true;
      },
      (error) => {
        this.showNotFoundMessage = true; // Show the message if the product is not found
        console.error('Error fetching product details', error);
      }
    );
  }

  addToCart(product: Product) {
    if (this.product) {
      if (this.product.quantity > 0) {
        this.cartservice.addToCart(product);
        this.isCartEmpty = this.cartservice.getCart().length === 0;
      } else {
        this.addToCartAllClicked = true;
      }
    }
  }

  buyNow(product: Product) {
    const productsToPurchase = [product];
    this.router.navigate(['/checkout']);
  }
}
