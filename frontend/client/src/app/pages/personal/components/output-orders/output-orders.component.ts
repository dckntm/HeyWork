import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-orders',
  templateUrl: './output-orders.component.html',
  styleUrls: ['./output-orders.component.scss']
})
export class OutputOrdersComponent implements OnInit {
  @Input() currentBlock: number;

  constructor() { 
    console.log(this.currentBlock)
  }

  ngOnInit(): void {
  }

}
