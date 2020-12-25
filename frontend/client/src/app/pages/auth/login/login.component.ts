import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  

  onSubmit(){
    if (this.loginForm.invalid){
      console.log("form is incorrect")
      return;
    }
    console.log(this.form.username.value, this.form.password.value)
    this.authService.login( this.form.username.value, this.form.password.value )
    this.router.navigate(['/'])
    this.error = this.authService.err
  }

}
