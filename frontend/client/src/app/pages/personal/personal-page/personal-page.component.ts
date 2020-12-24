import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
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
      value: 'В проецссе',
    },
    {
      id: 3,
      value: 'Возвращённые'
    },
    {
      id: 4,
      value: 'В проецссе',
    },
    {
      id: 5,
      value: 'Для подтверждения'
    }
  ];

  constructor() { 
    console.log(this.chosenTable)
  }

  ngOnInit(): void {
  }

  setTable(value: number){
    this.chosenTable = value;
  }

}
