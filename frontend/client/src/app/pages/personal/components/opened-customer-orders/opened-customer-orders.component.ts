import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OpenedOrder } from 'src/app/models/open-orders';
import { PersonalService } from '../../services/personal.service';

@Component({
  selector: 'app-opened-customer-orders',
  templateUrl: './opened-customer-orders.component.html',
  styleUrls: ['./opened-customer-orders.component.scss']
})
export class OpenedCustomerOrdersComponent implements OnInit {
  closeResult = '';
  orders: OpenedOrder[];
  currUserId: number;
  chosenOrder: number;

  constructor(private modalService: NgbModal, private pageService: PersonalService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    });
  }

  ngOnInit(): void {
    this.pageService.getOpenCustomer(this.currUserId).subscribe(x => {
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
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  chooseOrder(id: number){
    this.chosenOrder = id;
    let dateTime = this.orders[id].deadline.split('T');
    let russianDate = dateTime[0].split('-')
    this.orders[id].deadline = russianDate[2] + '.' + russianDate[1] + '.' + russianDate[0];
  }


}
