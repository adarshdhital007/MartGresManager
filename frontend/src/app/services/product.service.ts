import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cart: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private products: Product[] = [];

  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http:HttpClient) {
    this.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/products?featured=true`);
  }

  getProducts(): Observable<Product[]> {
    return this.makeFetchRequest(this.productsUrl);
  }

  getProductById(productId: number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${productId}`;
    return this.makeFetchRequest(productUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.makeFetchRequest(this.productsUrl, 'POST', product);
  }

  updateProduct(product: Product): Observable<Product> {
    const productUrl = `${this.productsUrl}/${product.id}`;
    return this.makeFetchRequest(productUrl, 'PUT', product);
  }

  deleteProduct(productId: number): Observable<any> {
    const productUrl = `${this.productsUrl}/${productId}`;
    return this.makeFetchRequest(productUrl, 'DELETE');
  }

  private makeFetchRequest(
    url: string,
    method: string = 'GET',
    data?: any
  ): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    return new Observable((observer) => {
      fetch(url, options)
        .then((response) => response.json())
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addToCart(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;

      const headers = {
        'Content-Type': 'application/json',
      };

      this.makeFetchRequest(
        `${this.productsUrl}/${product.id}`,
        'PUT',
        product
      ).subscribe(
        (updatedProduct: Product) => {
          this.addToCartInMemory(updatedProduct);
        },
        (error) => {
          // Handle the error if the update request fails
        }
      );
    }
  }

  addToCartInMemory(product: Product) {
    const index = this.cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      this.cart[index].quantity += 1;
    } else {
      const productToAdd = { ...product, quantity: 1 };
      this.cart.push(productToAdd);
    }

    this.cartItemsSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // Reduce the quantity or remove the item if the quantity is 1
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }

    // Notify subscribers about changes
    this.cartItemsSubject.next(this.cart);
  }

  getCart(): Product[] {
    // Retrieve the current shopping cart
    return this.cart;
  }

  getTotal(): number {
    // Calculate the total cost of items in the cart
    return this.cart.reduce(
      (total, item) => total + item.cost * item.quantity,
      0
    );
  }

  clearCart() {
    this.cart = []; // Clear the cart by setting the cart array to an empty array.
    this.cartItemsSubject.next(this.cart); // Notify subscribers about changes
  }

  updateCart(product: Product) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cart[index] = product;
      this.cartItemsSubject.next(this.cart); // Notify subscribers about changes
    }
  }

  // Observable to subscribe to cart item changes
  cartItems$ = this.cartItemsSubject.asObservable();

}
