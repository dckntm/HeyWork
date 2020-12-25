import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OpenedOrder } from 'src/app/models/open-orders';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-returned-orders',
  templateUrl: './returned-orders.component.html',
  styleUrls: ['./returned-orders.component.scss']
})
export class ReturnedOrdersComponent implements OnInit {
  selected = 0;
  hovered = 0;
  readonly = false;
  closeResult = '';
  orders: OpenedOrder[];
  currUserId: number;
  chosenOrder: number;
  orderToOpen: number;
  comment: string = '';

  constructor(private modalService: NgbModal, private pageService: PersonalService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    });
  }

  ngOnInit(): void {
    this.pageService.getReturnedOrders(this.currUserId).subscribe(x => {
      this.orders = x;
      console.log(this.orders)
    })
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
    this.chosenOrder = this.orders[id].id;
    console.log(this.orders[id])
    console.log(id)
    this.orderToOpen = id;
    console.log(this.chosenOrder)
    let dateTime = this.orders[id].deadline.split('T');
    let russianDate = dateTime[0].split('-')
    this.orders[id].deadline = russianDate[2] + '.' + russianDate[1] + '.' + russianDate[0];
    dateTime = null;
    russianDate = null;
  }

  onSubmit(){
    this.pageService.postCloseOrder(this.chosenOrder, this.comment, this.selected)
  }

}
