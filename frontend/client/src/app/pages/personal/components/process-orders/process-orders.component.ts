import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { retunedOrder } from 'src/app/models/return-orders';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-process-orders',
  templateUrl: './process-orders.component.html',
  styleUrls: ['./process-orders.component.scss']
})
export class ProcessOrdersComponent implements OnInit {
  orders$: Observable<retunedOrder[]>;
  orders: retunedOrder[]
  currUserId: number;

  constructor(private pageService: PersonalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    })
  }

  ngOnInit(): void {
    this.pageService.loadProcessOrders(this.currUserId).subscribe(x => {
      this.orders = x;
      console.log(this.orders)
    })
  }

}
