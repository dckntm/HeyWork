import { retunedOrder } from './../../../models/return-orders';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stack } from 'src/app/models/stack';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private readonly http: HttpClient) { }

  addStack(stackName: string){
    console.log(stackName)
    return this.http
    .post("http://127.0.0.1:8005/stack/create",{
      name: stackName
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("http://127.0.0.1:8005/stack", this.httpOptions)
  }

  getConflicts(): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>("http://127.0.0.1:8005/returned_orders", this.httpOptions)
  }

  sendBack(orderId: number, comment: string){
    return this.http
    .put('http://127.0.0.1:8005/order/return/' + orderId, {
      comment: comment
    })
    .subscribe(x => {
      console.log(x)
    })
  } 

  closeOrder(orderId: number){
    return this.http
    .put('http://127.0.0.1:8005/order/cancel_refund/' + orderId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }
}
