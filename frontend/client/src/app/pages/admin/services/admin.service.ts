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
    .post("/api/stack/create",{
      name: stackName
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("/api/stack", this.httpOptions)
  }

  getConflicts(): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>("/api/returned_orders", this.httpOptions)
  }

  sendBack(orderId: number, comment: string){
    return this.http
    .put('/api/order/return/' + orderId, {
      comment: comment
    })
    .subscribe(x => {
      console.log(x)
    })
  } 

  closeOrder(orderId: number){
    return this.http
    .put('/api/order/cancel_refund/' + orderId, this.httpOptions)
    .subscribe(x => {
      console.log(x)
    })
  }
}
