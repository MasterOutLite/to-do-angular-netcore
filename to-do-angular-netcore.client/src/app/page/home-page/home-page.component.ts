import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../Service/user.service";
import {Routers} from "../../routes";

@Component({
  selector: 'app-home-page',
  template: `
      <h1>
          Welcome to ToDo!
      </h1>
      <p class="h4">
          You is {{isAuth ? '' : 'not'}} auth
      </p>
      <button *ngIf="isAuth" (click)="onClickToDo()" type="button" class="btn btn-success">Go to ToDo
      </button>
      <button *ngIf="!isAuth" (click)="onClickAuth()" type="button" class="btn btn-danger">Go to Auth</button>
  `,
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isAuth: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.isAuth = !!userService.user();
  }

  onClickToDo() {
    this.router.navigate([this.Routers.ToDo]);
  }

  onClickAuth() {
    this.router.navigate([this.Routers.Auth]);
  }

  protected readonly Routers = Routers;
}
