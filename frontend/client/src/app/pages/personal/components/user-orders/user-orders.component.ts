import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { retunedOrder } from 'src/app/models/return-orders';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  orders$: Observable<retunedOrder[]>;
  currUserId: number;

  constructor(private pageService: PersonalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    });
  }

  ngOnInit(): void {
    this.orders$ = this.pageService.loadInputOrders(this.currUserId);
  }

}
