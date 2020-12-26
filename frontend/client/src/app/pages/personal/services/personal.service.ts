import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Stack } from 'src/app/models/stack';
import { OpenedOrder } from 'src/app/models/open-orders'
import jwt_decode from "jwt-decode";
import { retunedOrder } from 'src/app/models/return-orders';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private readonly http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  postOpenOrder(customer: number, executor: number, title: string, description: string, deadline: string){
    return this.http
    .post('/order/create', {
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
    .get<User>('/api/user/' + userId, this.httpOptions)
  }

  postUserData(id: number, username: string, firstName: string, lastName: string, email: string, mobile: string, company: string, shortDescription: string, stack: any){
    console.log('try to send')
    return this.http
    .put('/api/user/' + id, {
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
    .get<Stack[]>("/api/stack", this.httpOptions)
  }

  loadInputOrders(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('/api/executor/closed_orders/' + id, this.httpOptions)
  }

  loadOutputOrders(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('/api/customer/closed_orders/' + id, this.httpOptions)
  }

  loadReturnOrders(id: number): Observable<any>{
    return this.http
    .get<any>('')
  }

  getOpenCustomer(id: number): Observable<OpenedOrder[]>{
    return this.http
    .get<OpenedOrder[]>('/api/customer_orders/' + id, this.httpOptions)
  }

  getOrdersToApprove(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('/api/exected_order/' + id, this.httpOptions)
  }

  closeOrder(userId: number, orderId: number){
    return this.http
    .put('/api/order/close_by_executor/' + orderId + '/' + userId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }

  sendToAdmin(orderId: number){
    return this.http
    .put('/api/order/to_admin_review/' + orderId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }

  postCloseOrder(id: number, revue: string, rating: number){
    return this.http
    .put('/api/order/close_by_customer/' + id, {
      review: revue,
      rating: rating,
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getReturnedOrders(userId: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('/api/customer/returned_orders/' + userId, this.httpOptions)
  }

  uploadImage(image: File, userId: number){
    const formData = new FormData();
    console.log(userId)
    formData.append('avatar', image, image.name);

    return this.http
    .post('/api/avatar/save/' + userId, formData)
  }

  loadProcessOrders(userId: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('/api/executor/opened/' + userId, this.httpOptions)
  }
}
