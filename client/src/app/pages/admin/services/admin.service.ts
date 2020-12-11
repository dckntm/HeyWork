import { retunedOrder } from './../../../models/return-orders';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    .post("http://0.0.0.0:8000/stack/create",{
      name: stackName
    })
    .subscribe(x => {
      console.log(x)
    })
  }

  getConflicts(): Observable<retunedOrder[]>{
    return this.http
    .get<retunedOrder[]>("http://0.0.0.0:8000/returned_orders", this.httpOptions)
  }
}
