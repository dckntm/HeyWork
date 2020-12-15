import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') != null){
      this.userIsLoggedIn = true
    }
  }

}
