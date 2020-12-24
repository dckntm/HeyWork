import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Stack } from 'src/app/models/stack';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { PersonalService } from '../../services/personal.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  currUserData$: Observable<User>;
  userData: User;
  closeResult = '';
  currUserId: number;
  orderForm: FormGroup;
  changeForm: FormGroup;
  stacks: Stack[];
  chosenStacks: number[] = [1];
  stacksForPost = [];

  constructor(private modalService: NgbModal, private auth: AuthService, private formBuilder: FormBuilder, private pageService: PersonalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    });
    this.orderForm = this.formBuilder.group({
      title: [ "", Validators.required ],
      description: [ "", Validators.required ],
      deadline: [ "", Validators.required ]
    });
    this.changeForm = this.formBuilder.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ],
      firstName: [ "", Validators.required ],
      lastName: [ "", Validators.required ],
      email: ["", Validators.required ],
      mobile: ["", Validators.required ],
      company: ["", Validators.required ],
      shortInfo: ["", Validators.required ],
    });

    this.currUserData$ = this.pageService.getUserData(this.currUserId)
    this.pageService.getUserData(this.currUserId).subscribe(x => {
      this.userData = x;
      console.log(this.userData)
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

  get cForm() {
    return this.orderForm.controls;
  }

  get userForm() {
    return this.changeForm.controls;
  }

  ngOnInit(): void {
  }

  addStack(){
    this.chosenStacks.push(1)
  }

  processOutOrder(){
    console.log(this.auth.userId, this.currUserId, this.cForm.title.value, this.cForm.description.value, this.cForm.deadline.value)
    // this.pageService.postOpenOrder(this.auth.userId, this.currUserId, this.cForm.title.value, this.cForm.description.value, this.cForm.deadline.value)
  }

  changeUserData(){
    if (this.changeForm.invalid){
      console.log("form is incorrect")
      return;
    }

    this.chosenStacks.forEach(stack => {
      this.stacksForPost.push({id: stack})
    })

    console.log(this.userForm.username.value, this.userForm.password.value, this.userForm.firstName.value, this.userForm.lastName.value, this.userForm.email.value, this.userForm.mobile.value, this.userForm.company.value, this.userForm.shortInfo.value, this.chosenStacks)
    this.pageService.postUserData(this.currUserId, this.userForm.username.value, this.userForm.password.value, this.userForm.firstName.value, this.userForm.lastName.value, this.userForm.email.value, this.userForm.mobile.value, this.userForm.company.value, this.userForm.shortInfo.value, this.chosenStacks)
  }

}
