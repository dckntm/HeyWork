import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-orders',
  templateUrl: './process-orders.component.html',
  styleUrls: ['./process-orders.component.scss']
})
export class ProcessOrdersComponent implements OnInit {
  @Input() currentBlock: number;

  constructor() { }

  ngOnInit(): void {
  }

}
