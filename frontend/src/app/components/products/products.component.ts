import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(
    private cartservice: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProducts();

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.filterProducts();
    });
  }

   getAllProducts() {
    this.cartservice.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.products.forEach((product) => (product.loading = false));
        this.filterProducts();
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  filterProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
