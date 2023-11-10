import { Component } from '@angular/core';
import { UserInfoService } from '../../services/userinfo.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUsername: string = '';
  registerPassword: string = '';
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  errorMessage: string = ''; // Property to hold the error message

  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  register() {
    if (this.registerUsername && this.registerPassword) {
      this.userService.register(this.registerUsername, this.registerPassword).subscribe(
        (response) => {
          console.log('Registration successful');

          // Store the JWT token in localStorage
          const token = response.token;
          localStorage.setItem('token', token);

          this.login(); // Automatically log in after registration
        },
        (error) => {
          this.errorMessage = 'Username already exists. Please choose another username.';
          console.error('Registration failed', error);
        }
      );
    } else {
      this.errorMessage = 'Username and password are required.';
      console.error('Username and password are required.');
    }
  }

  login() {
    this.userService.login(this.registerUsername, this.registerPassword).subscribe(
      (response) => {
        const token = response.token;

        // Store the JWT token in localStorage
        localStorage.setItem('token', token);

        this.userInfoService.setLoggedInUser({ username: this.registerUsername, token });
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login after registration failed', error);
      }
    );
  }
}
