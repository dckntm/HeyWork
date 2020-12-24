import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Stack } from 'src/app/models/stack';
import { OpenedOrder } from 'src/app/models/open-orders'
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  mainUserId: number;

  constructor(private readonly http: HttpClient) {
    let tokenInfo: any = jwt_decode(localStorage.getItem('currentUser'));
    this.mainUserId = tokenInfo.user_id;
    console.log(this.mainUserId);
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  postOpenOrder(customer: number, executor: number, title: string, description: string, deadline: string){
    return this.http
    .post('http://127.0.0.1:8005/order/create', {
      customer: customer,
      executor: executor,
      title: title,
      description: description,
      deadline: deadline,
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getUserData(userId: number): Observable<User>{
    return this.http
    .get<User>('http://127.0.0.1:8005/user/' + userId, this.httpOptions)
  }

  postUserData(id: number, username: string, firstName: string, lastName: string, email: string, mobile: string, company: string, shortDescription: string, stack: any){
    console.log('try to send')
    return this.http
    .put('http://127.0.0.1:8005/user/' + id, {
      username: username,
      email: email,
      first_name: firstName,
      last_name: lastName,
      profile: {
        description: shortDescription,
        company: company,
        phone_number: mobile,
      },
      technology: stack
    }).subscribe(x => {
      console.log('hello')
    })
  }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("http://127.0.0.1:8005/stack", this.httpOptions)
  }

  loadInputOrders(id: number): Observable<any>{
    return this.http
    .get<any>('http://127.0.0.1:8005/executorOrders/' + id, this.httpOptions)
  }

  loadReturnOrders(id: number): Observable<any>{
    return this.http
    .get<any>('')
  }

  getOpenCustomer(id: number): Observable<OpenedOrder[]>{
    return this.http
    .get<OpenedOrder[]>('http://127.0.0.1:8005/customer_orders/' + id, this.httpOptions)
  }
}
