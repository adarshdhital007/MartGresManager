import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserInfoService } from "../services/userinfo.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.userInfoService.getLoggedInUser()) {
      // User is authenticated
      return true;
    } else {
      // Redirect to the login page if not authenticated
      return this.router.createUrlTree(["/login"]);
    }
  }
}
