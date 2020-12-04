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

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private readonly http: HttpClient, private router: Router) { }

  login(username: string, password: string){
    console.log("logging in");
    

    return this.http
      .post("http://localhost:8000/api/user/login", {
        email: username,
        password: password
      }, {responseType: 'text'})
      .subscribe((token) => {
        console.log(token);
        let tokenInfo = jwt_decode(token);
        // if (tokenInfo.is_staff){
        //   this.router.navigate(["/admin"])
        // } else {
        //   this.router.navigate(["/users"])
        // }
        localStorage.removeItem("currentUser")
        localStorage.setItem("currentUser", token);
        console.log(localStorage.getItem("currentUser"))
      })
  }

  register(username: string, password: string, firstName: string, lastName: string, email: string, mobile: string, company: string, shortDescription: string, stack: number[]){
    console.log("signing up")

    return this.http
    .post("http://localhost:8000/api/user/register",{
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: mobile,
      company: company,
      description: shortDescription,
      tecnology: stack,
    }, {responseType: 'text'})
    .subscribe(x => {
      console.log(x)
      this.router.navigate(["/login"])
    })
  }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("http://localhost:8000/api/stack", this.httpOptions)
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
