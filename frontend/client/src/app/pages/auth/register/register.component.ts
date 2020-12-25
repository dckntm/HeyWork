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
  incorrectForm: boolean = false;
  loginForm: FormGroup;
  stacks: Stack[]
  chosenStacks: number[] = [1]
  stacksForPost = []
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getStacks()
    .subscribe(x => {
      console.log(x)
      this.stacks = x;
    })
    this.loginForm = this.formBuilder.group({
      username: [ "", Validators.required ],
      password: [ "", Validators.required ],
      firstName: [ "", Validators.required ],
      lastName: [ "", Validators.required ],
      email: ["", Validators.required ],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+7-?)|0)?[0-9]{10}$")] ],
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

  hui(){
    console.log(this.chosenStacks)
  }

  onSubmit(){
    if (this.loginForm.invalid){
      console.log("form is incorrect");
      this.incorrectForm = true;
      return;
    }

    this.chosenStacks.forEach(stack => {
      this.stacksForPost.push({id: stack})
    })

    console.log(this.form.username.value, this.form.password.value, this.form.firstName.value, this.form.lastName.value, this.form.email.value, this.form.mobile.value, this.form.company.value, this.form.shortInfo.value, this.chosenStacks)
    this.authService.register( this.form.username.value, this.form.password.value, this.form.firstName.value, this.form.lastName.value, this.form.email.value, this.form.mobile.value, this.form.company.value, this.form.shortInfo.value, this.chosenStacks )
    this.router.navigate(['/'])
  }

}
