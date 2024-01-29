import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Service/auth.service";

@Component({
  selector: 'app-auth',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" class="text-start card p-3"
          [attr.novalidate]="novalidate">
      <div class="btn-group mb-3" role="group">
        <button type="button" class="btn"
                (click)="isSignUp = true"
                [ngClass]="{'btn-primary': isSignUp}"
        >Sign Up
        </button>
        <button type="button" class="btn"
                (click)="isSignUp = false"
                [ngClass]="{'btn-primary': !isSignUp}"
        >Log In
        </button>
      </div>
      <ng-container *ngIf="isSignUp">
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input formControlName="name" type="text" class="form-control" id="inputName"
                 aria-describedby="emailHelp">
        </div>
      </ng-container>
      <div class="mb-3">
        <label for="inputEmail" class="form-label">Email address</label>
        <input formControlName="email" type="email" class="form-control" id="inputEmail"
               aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input formControlName="password" type="password" class="form-control" id="inputPassword"
               aria-describedby="emailHelp">
      </div>
      <button class="btn btn-primary" type="submit">{{isSignUp ? 'Sign Up' : 'Log in'}}</button>
    </form>
  `,
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  myForm: FormGroup;
  novalidate: boolean = false;
  isSignUp: boolean = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
    });
  }

  handleSubmit() {
    if (this.myForm.valid) {
      if (this.isSignUp) {
        this.authService.signUp(this.myForm.value).subscribe(value => {
          this.router.navigate(['todo']);
        });
      } else {
        this.authService.logIn(this.myForm.value).subscribe(value => {
          this.router.navigate(['todo']);
        });
      }

      console.log('Is valid', this.myForm.valid, this.myForm.value)

    } else {
      console.log('Is not valid', this.myForm.valid, this.myForm.value)
    }
  }
}
