import {Routes} from "@angular/router";
import {AuthPageComponent} from "./page/auth-page/auth-page.component";
import {ToDoPageComponent} from "./page/to-do-page/to-do-page.component";
import {HomePageComponent} from "./page/home-page/home-page.component";

export enum Routers {
  Home = '',
  Auth = 'auth',
  ToDo = 'todo',
}

export const routes: Routes = [
  {path: Routers.Home, component: HomePageComponent},
  {path: Routers.Auth, component: AuthPageComponent},
  {path: Routers.ToDo, component: ToDoPageComponent},
];

