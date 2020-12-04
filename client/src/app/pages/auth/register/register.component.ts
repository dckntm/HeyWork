import { Stack } from './../../../models/stack';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  stacks: Stack[]
  chosenStacks: number[] = [1]

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getStacks()
    .subscribe(x => {
      this.stacks = x;
    })
    this.loginForm = this.formBuilder.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ],
      firstName: [ "", Validators.required ],
      lastName: [ "", Validators.required ],
      email: ["", Validators.required ],
      mobile: ["", Validators.required ],
      company: ["", Validators.required ],
      shortInfo: ["", Validators.required ],
    });
  }

  get form() {
    return this.loginForm.controls;
  }
  addStack(){
    this.chosenStacks.push(1)
  }

  onSubmit(){
    if (this.loginForm.invalid){
      console.log("form is incorrect")
      return;
    }
    console.log(this.form.username.value, this.form.password.value, this.form.firstName.value, this.form.lastName.value)
    this.authService.register( this.form.username.value, this.form.password.value, this.form.firstName.value, this.form.lastName.value, this.form.email.value, this.form.mobile.value, this.form.company.value, this.form.shortInfo.value, this.chosenStacks )
    this.router.navigate(['/'])
  }

}