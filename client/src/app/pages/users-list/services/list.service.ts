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
    .get<Stack[]>("http://localhost:8000/api/stack", this.httpOptions)
  }
}
