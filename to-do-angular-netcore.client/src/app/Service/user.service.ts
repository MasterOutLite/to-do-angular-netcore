import {computed, Injectable, signal} from "@angular/core";
import {CreateUser, User} from "../type/user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, first, Observable, tap} from "rxjs";
import {jwtDecode} from "jwt-decode";


export type UserState = {
  user: User | undefined;
  token: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'https://localhost:7232/api/';
  private state = signal<UserState>({
    user: undefined,
    token: undefined,
  },);

  private localStorageKey = 'auth';

  constructor(private http: HttpClient) {
    const storedState = localStorage.getItem(this.localStorageKey);
    if (storedState) {
      const state = JSON.parse(storedState) as UserState
      this.state.set({user: state.user, token: state.token})
    }
  }

  user = computed(() => this.state().user);
  token = computed(() => this.state().token);

  updateUser(token: string): void {
    try {
      const user = jwtDecode(token) as User
      console.log(user);
      this.state.update(state => ({user, token}))
      const item = JSON.stringify(this.state())
      localStorage.setItem(this.localStorageKey, item);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }


  signOut() {
    this.state.set({user: undefined, token: undefined});
  }

  logIn(user: CreateUser) {
    return this.http.post<{ token: string }>(this.baseUrl + 'user/login', user).pipe(
      tap((res) => {
        this.updateUser(res.token);
        console.log(res);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
      first()
    );
  }

  signUp(user: CreateUser) {
    return this.http.post<{ token: string }>(this.baseUrl + 'user/registration', user).pipe(
      tap((res) => {
        this.updateUser(res.token);
        console.log(res);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
      first()
    );
  }
}
