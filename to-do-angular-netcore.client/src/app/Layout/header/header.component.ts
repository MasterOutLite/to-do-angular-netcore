import {Component, OnInit} from '@angular/core';
import {Routers} from "../../routes";
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../Service/user.service";
import {User} from "../../type/user";
import {Observable} from "rxjs";


@Component({
  selector: 'app-header',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container">
                  <a class="navbar-brand" href="{{Routers.Home}}">
                      <img ngSrc="favicon.ico" alt="Logo" width="30" height="30"
                           class="d-inline-block align-text-top">
                      To Do
                  </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarNavAltMarkup"
                          (click)="isCollapse = !isCollapse"
                          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="navbar-collapse" [ngClass]="{'collapse': isCollapse}" id="navbarNavAltMarkup">
                      <div class="navbar-nav me-auto">
                          <a class="nav-link" [ngClass]="{'active': currentRoute == Routers.Home}" aria-current="page"
                             href="{{Routers.Home}}">Home</a>
                          <a class="nav-link" [ngClass]="{'active': currentRoute == Routers.ToDo}"
                             href="{{Routers.ToDo}}">ToDo</a>
                          <a class="nav-link" [ngClass]="{'active': currentRoute == Routers.Auth}"
                             href="{{Routers.Auth}}">Auth</a>
                      </div>

                    <span *ngIf="!!user" class="navbar-text me-3">
                        User: {{user.unique_name}}
                     </span>

                      <button *ngIf="user" type="button" class="btn btn-outline-secondary"
                              (click)="logOut()"
                      >
                          Log Out
                      </button>

                      <button *ngIf="!user" type="button" class="btn btn-outline-primary"
                              (click)="logIn()"
                      >
                          LogIn
                      </button>
                  </div>
              </div>
          </nav>
      </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isCollapse: boolean = true;
  currentRoute: string;
  user$: Observable<User | null>;
  user: User | null;
  protected readonly Routers = Routers;

  constructor(private router: Router, private userService: UserService) {
    this.userService.user$.subscribe(value => {
      //this.user$ = value;
      this.user = value;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.currentRoute = this.router.url.slice(1);
        console.log('Current Route:', currentRoute, this.router.url.slice(1));
      }
    });
  }

  logIn(){
    this.router.navigate([Routers.Auth]);
  }
  logOut(){
    this.router.navigate([Routers.Home]);
    this.userService.clearUser();
  }
}
