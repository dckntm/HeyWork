import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
  currUserId: number;
  myPage: boolean = false;
  chosenTable: number = 0; // 0 - input, 1 - output, 2 - in process, 3 - returned to remake
  statuses = [
    {
      id: 0,
      value: 'Выполненные',
    },
    {
      id: 1,
      value: 'Исходящие',
    },
    {
      id: 2,
      value: 'Исходящие в процессе',
    },
    {
      id: 3,
      value: 'Входящие в процессе'
    },
    {
      id: 4,
      value: 'Возвращённые',
    },
    {
      id: 5,
      value: 'Для подтверждения'
    }
  ];

  constructor(private route: ActivatedRoute, private readonly auth: AuthService) {
    this.route.params.subscribe(params => {
      this.currUserId = params['id']
    })
    if(this.currUserId == this.auth.userId){
      this.myPage = true;
    } else {
      this.statuses = [
        {
          id: 0,
          value: 'Выполненные',
        },
        {
          id: 1,
          value: 'Исходящие',
        },
      ]
    }
  }

  ngOnInit(): void {
  }

  setTable(value: number){
    this.chosenTable = value;
  }

}
