import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }

  dosmth(){
    console.log('im here')
  }

}
