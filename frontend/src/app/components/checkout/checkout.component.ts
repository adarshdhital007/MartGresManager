import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product.model";
import { ProductDBService } from "../../services/productdb.service";
import { OrderSuccessModalComponent } from "../order-success-modal/order-success-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  shippingInfo = {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };
  totalCost: number = 0;
  isCartEmpty: boolean = false;
  isFormValid: boolean = true;
  isOrderPlaced: boolean = false;

  constructor(
    private cartService: ProductService,
    private checkoutService: ProductDBService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.updateTotalCost();
    this.isCartEmpty = this.cartItems.length === 0;
  }

  updateTotalCost() {
    this.totalCost = this.cartService.getTotal();
  }

  clearForm() {
    // Reset the shippingInfo object to its initial empty state
    this.shippingInfo = {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    };
  }

  onSubmit() {
    if (this.isCartEmpty) {
      return; // Disable place order if the cart is empty
    }

    // Validate the form fields
    this.isFormValid = this.validateForm();

    if (this.isFormValid) {
      // Create an array of product details to send to the server
      const cartItems = this.cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.cost,
      }));

      const order = {
        cartItems: cartItems,
        totalCost: this.totalCost,
        shippingInfo: this.shippingInfo,
      };

      // Retrieve the JWT token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("JWT token is missing");
        return;
      }

      // Send the order and token to the checkout service
      this.checkoutService.initiatePurchase(order, token).subscribe(
        (response) => {
          this.isOrderPlaced = true;
          this.showOrderSuccessModal(); // Show the modal
          console.log("Order placed successfully:", response);

          // Clear the cart and form
          this.clearForm();
        },
        (error) => {
          console.error("Error placing order:", error);
        }
      );
    }
  }

  private validateForm(): boolean {
    // You can add more validation as needed
    return (
      this.shippingInfo.name.trim() !== "" &&
      this.shippingInfo.email.trim() != "" &&
      this.shippingInfo.address.trim() !== "" &&
      this.shippingInfo.city.trim() !== "" &&
      this.shippingInfo.state.trim() !== "" &&
      this.shippingInfo.zip.trim() !== ""
    );
  }

  showOrderSuccessModal() {
    const dialogRef = this.dialog.open(OrderSuccessModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // Handle actions after the modal is closed, if needed
      console.log("Order success modal closed:", result);
    });
  }
}
