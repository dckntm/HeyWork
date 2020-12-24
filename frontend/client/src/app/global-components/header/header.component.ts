import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') != null){
      this.userIsLoggedIn = true;
    }
    console.log(this.authService.userIsAdmin)
  }

  goLK(){
    if(this.authService.userIsAdmin){
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/user/' + this.authService.userId])
      console.log(this.authService.userId)
    }
    
  }

  

}
