import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(private readonly http: HttpClient) { }

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

  postUserData(id: number, username: string, password: string, firstName: string, lastName: string, email: string, mobile: string, company: string, shortDescription: string, stack: any){
    return this.http
    .post('http://127.0.0.1:8005/user/' + id, {
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
    })
  }

  loadOutOrders(id: number): Observable<any>{
    return this.http
    .get<any>('http://127.0.0.1:8005/customerOrders/' + id, this.httpOptions)
  }

  loadInputOrders(id: number): Observable<any>{
    return this.http
    .get<any>('http://127.0.0.1:8005/executorOrders/' + id, this.httpOptions)
  }

  loadReturnOrders(id: number): Observable<any>{
    return this.http
    .get<any>('')
  }
}
