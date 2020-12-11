import { retunedOrder } from './../../../models/return-orders';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  returnedOrders$: Observable<retunedOrder[]>
  newStackName: string = ''

  constructor(private pageService: AdminService) { }

  ngOnInit(): void {
    this.loadReturnedOrders()
  }

  onClick(){
    this.pageService.addStack(this.newStackName);
  }

  loadReturnedOrders(){
    this.returnedOrders$ = this.pageService.getConflicts()
    
  }


}
