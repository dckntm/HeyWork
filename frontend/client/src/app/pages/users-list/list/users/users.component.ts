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
      this.users.forEach(user => {
        this.loadImg(user.id, user.profile.avatar)
      })
      
    })

  }

  filter(){
    if(this.chosenStack == 0){
      this.pageService.getUsers()
      .subscribe(x => {
        this.users = x;
        console.log(x);
        console.log(this.users)
        this.users.forEach(user => {
          this.loadImg(user.id, user.profile.avatar)
        })
        
      })
    } else {
      this.pageService.getUsersOptions(this.chosenStack)
      .subscribe(x => {
        this.users = x;
        console.log(x);
        console.log(this.users)
        this.users.forEach(user => {
          this.loadImg(user.id, user.profile.avatar)
        })
        
      })
    }
    

  }

  navigateToUser(id){
    this.router.navigate(['/user/' + id])
  }

  loadImg(id: number, url: string){
    this.pageService.getImg(url)
    .subscribe(data => {
      this.createImgFromBlob(id, data)
    }, error => {
      console.log(error);
      console.log("error")
    })
  }

  createImgFromBlob(id: number, img: Blob){
    console.log('im here')
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.users[id].img = reader.result;
    }, false)

    if(img) {
      console.log('made');
      reader.readAsDataURL(img)
    }
  }

}
