import { JWt } from './../../../models/jwt';
import { Stack } from './../../../models/stack';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean>;
  res: JWt;
  userId: number;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private readonly http: HttpClient, private router: Router) { }

  login(username: string, password: string){
    console.log("logging in");
    

    return this.http
      .post("http://0.0.0.0:8000/auth/jwt/create", {
        username: username,
        password: password
      })
      .subscribe((token: JWt) => {
        // console.log(token);
        let tokenInfo: any = jwt_decode(token.access);
        console.log(tokenInfo);
        this.userId = tokenInfo.user_id;
        if (tokenInfo.is_staff){
          this.router.navigate(["/admin"])
        } else {
          this.router.navigate(["/users"])
        }
        localStorage.removeItem("currentUser")
        localStorage.setItem("currentUser", token.access);
        // console.log(localStorage.getItem("currentUser"))
      })
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string, mobile: string, company: string, shortDescription: string, stack: any){
    console.log("signing up")

    return this.http
    .post("http://0.0.0.0:8000/user/create",{
      username: username,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      profile: {
        description: shortDescription,
        company: company,
        phone_number: mobile,
      },
      technology: stack
    }, {responseType: 'text'})
    .subscribe(x => {
      console.log(x)
      this.router.navigate(["/login"])
    })
  }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("http://0.0.0.0:8000/stack", this.httpOptions)
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(["/"]);
    console.log(localStorage.getItem("currentUser"))
  }

  public get userIsLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }
}
