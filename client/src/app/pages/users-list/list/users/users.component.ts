import { Stack } from './../../../../models/stack';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [NgbRatingConfig]
})
export class UsersComponent implements OnInit {
  stacks: Stack[];
  chosenStack = 1;
  users = [1,2,3,4,5]

  constructor(config: NgbRatingConfig, private pageService: ListService) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.pageService.getStacks()
    .subscribe(x => {
      this.stacks = x;
    })
  }

}
