import { User } from './../../../../models/user';
import { Stack } from './../../../../models/stack';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [NgbRatingConfig]
})
export class UsersComponent implements OnInit {
  img: any;
  stacks: Stack[];
  users: User[];
  chosenStack = 0;

  constructor(config: NgbRatingConfig, private pageService: ListService, private router: Router) { 
    config.max = 5;
    config.readonly = true;
    
  }

  ngOnInit(): void {
    this.pageService.getStacks()
    .subscribe(x => {
      console.log(x)
      this.stacks = x;
      this.stacks.push({id: 0, name: 'Любой стэк'})
      // this.chosenStack = this.stacks.length;
      // console.log(this.chosenStack)
    })

    this.pageService.getUsers()
    .subscribe(x => {
      this.users = x;
      console.log(x);
      console.log(this.users)
      
    })

  }

  filter(){
    if(this.chosenStack == 0){
      this.pageService.getUsers()
      .subscribe(x => {
        this.users = x;
        console.log(x);
        console.log(this.users)
        
      })
    } else {
      this.pageService.getUsersOptions(this.chosenStack)
      .subscribe(x => {
        this.users = x;
        console.log(x);
        console.log(this.users)
        
      })
    }
    

  }

  navigateToUser(id){
    this.router.navigate(['/user/' + id])
  }


}
