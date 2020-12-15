import { User } from './../../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stack } from '../../../models/stack';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private readonly http: HttpClient) { }

  getStacks(): Observable<Stack[]>{
    return this.http
    .get<Stack[]>("http://0.0.0.0:8000/stack", this.httpOptions)
  }

  getUsers(): Observable<User[]>{
    return this.http
    .get<User[]>('http://0.0.0.0:8000/users',this.httpOptions)
  }

  getImg(imageUrl: string): Observable<Blob>{
    return this.http
    .get('http://0.0.0.0:8000' +imageUrl, {responseType: 'blob'})
  }

  getUsersOptions(tec: number){
    let opt = {
      headers:{
        "Content-Type": "application/json",
      },
      params:{
        'tech': tec.toString()
      }
    }
    return this.http
    .get<User[]>('http://0.0.0.0:8000/search', opt)
  }
}
