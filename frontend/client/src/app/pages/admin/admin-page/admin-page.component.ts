import { retunedOrder } from './../../../models/return-orders';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  orders: retunedOrder[]
  returnedOrders$: Observable<retunedOrder[]>
  newStackName: string = ''

  constructor(private pageService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadReturnedOrders()
    this.pageService.getConflicts().subscribe(x => {
      this.orders = x
      console.log(this.orders)
    })
  }

  onClick(){
    this.pageService.addStack(this.newStackName);
  }

  loadReturnedOrders(){
    this.returnedOrders$ = this.pageService.getConflicts()
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/'])
  }


}
