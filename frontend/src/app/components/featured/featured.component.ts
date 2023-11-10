import { Component,OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {
  featuredProductIds: number[] = [2, 13, 4]; // Add the IDs of featured products here
  featuredProducts: Product[] = [];

  constructor(private cartservice: ProductService) {}

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  getFeaturedProducts() {
    this.cartservice.getProducts().subscribe(
      (data: Product[]) => {
        this.featuredProducts = data.filter((product) =>
          this.featuredProductIds.includes(Number(product.id))
        );
      },
      (error) => {
        console.error('Error fetching featured products', error);
      }
    );
  }
}
