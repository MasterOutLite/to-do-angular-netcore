import {Injectable} from "@angular/core";
import {CreateUser} from "../type/user";
import {catchError, first, tap} from "rxjs";
import {UserService} from "./user.service";
import {HttpApi} from "./http-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private state: UserService, private httpApi: HttpApi) {
  }
  signOut() {
    this.state.clearUser()
  }

  logIn(user: CreateUser) {
    return this.httpApi.post<{ token: string }>('user/login', user).pipe(
      tap((res) => {
        this.state.updateUser(res.token);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
      first()
    );
  }

  signUp(user: CreateUser) {
    return this.httpApi.post<{ token: string }>('user/registration', user).pipe(
      tap((res) => {
        this.state.updateUser(res.token);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
      first()
    );
  }
}
