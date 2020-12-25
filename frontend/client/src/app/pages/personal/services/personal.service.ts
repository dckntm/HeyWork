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

  loadInputOrders(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('http://127.0.0.1:8005/executor/closed_orders/' + id, this.httpOptions)
  }

  loadOutputOrders(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('http://127.0.0.1:8005/customer/closed_orders/' + id, this.httpOptions)
  }

  loadReturnOrders(id: number): Observable<any>{
    return this.http
    .get<any>('')
  }

  getOpenCustomer(id: number): Observable<OpenedOrder[]>{
    return this.http
    .get<OpenedOrder[]>('http://127.0.0.1:8005/customer_orders/' + id, this.httpOptions)
  }

  getOrdersToApprove(id: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('http://127.0.0.1:8005/exected_order/' + id, this.httpOptions)
  }

  closeOrder(userId: number, orderId: number){
    return this.http
    .put('http://127.0.0.1:8005/order/close_by_executor/' + orderId + '/' + userId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }

  sendToAdmin(orderId: number){
    return this.http
    .put('http://127.0.0.1:8005/order/to_admin_review/' + orderId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }

  postCloseOrder(id: number, revue: string, rating: number){
    return this.http
    .put('http://127.0.0.1:8005/order/close_by_customer/' + id, {
      review: revue,
      rating: rating,
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getReturnedOrders(userId: number): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>('http://127.0.0.1:8005/customer/returned_orders/' + userId, this.httpOptions)
  }

  uploadImage(image: File, userId: number){
    const formData = new FormData();
    console.log(userId)
    formData.append('avatar', image, image.name);

    return this.http
    .post('http://127.0.0.1:8005/avatar/save/' + userId, formData)
  }
}
