import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  private loggedInUser: any = null;

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    if (typeof localStorage !== "undefined") {
      const storedUserInfo = localStorage.getItem("loggedInUser");
      if (storedUserInfo) {
        this.loggedInUser = JSON.parse(storedUserInfo);
      }
    }
  }

  private storeUser(user: any) {
    this.loggedInUser = user;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  }

  setLoggedInUser(user: any) {
    this.storeUser(user);
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  clearLoggedInUser() {
    this.loggedInUser = null;
    localStorage.removeItem("loggedInUser");
  }
}
