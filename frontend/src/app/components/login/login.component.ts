import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsername!: string;
  loginPassword!: string;

  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  login() {
    this.userService.login(this.loginUsername, this.loginPassword).subscribe(
      (response) => {
        const token = response.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Set the user info in your service
        this.userInfoService.setLoggedInUser({
          username: this.loginUsername,
          token,
        });

        // Navigate to the dashboard
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  registerNow() {
    this.router.navigate(['/register']);
  }
}
