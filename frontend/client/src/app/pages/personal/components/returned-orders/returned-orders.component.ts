import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-returned-orders',
  templateUrl: './returned-orders.component.html',
  styleUrls: ['./returned-orders.component.scss']
})
export class ReturnedOrdersComponent implements OnInit {
  @Input() currentBlock: number;

  constructor() { }

  ngOnInit(): void {
  }

}
