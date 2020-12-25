import { retunedOrder } from './../../../models/return-orders';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Stack } from 'src/app/models/stack';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  orders: retunedOrder[]
  returnedOrders$: Observable<retunedOrder[]>
  newStackName: string = '';
  selected = 0;
  hovered = 0;
  readonly = false;
  closeResult = '';
  currUserId: number;
  chosenOrder: number;
  orderToOpen: number;
  comment: string = '';
  stacks: Stack[]

  constructor(private modalService: NgbModal, private pageService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.pageService.getStacks().subscribe(x => {
      this.stacks = x;
    })
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.chosenOrder = 0;
    this.orderToOpen = 0;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  chooseOrder(id: number){
    console.log(id)
    this.chosenOrder = this.orders[id].id;
    this.orderToOpen = id;
    console.log(this.chosenOrder)
    let dateTime = this.orders[id].deadline.split('T');
    let russianDate = dateTime[0].split('-')
    this.orders[id].deadline = russianDate[2] + '.' + russianDate[1] + '.' + russianDate[0];
    dateTime = null;
    russianDate = null;
  }

  moveBack(){
    this.pageService.sendBack(this.chosenOrder, this.comment);
  }

  closeOrder(){
    this.pageService.closeOrder(this.chosenOrder);
  }


}
