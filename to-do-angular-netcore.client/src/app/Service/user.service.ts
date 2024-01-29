import {Injectable} from "@angular/core";
import {User} from "../type/user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";


export type UserState = {
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _stateUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this._stateUser.asObservable();

  private _stateToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public token$: Observable<string | null> = this._stateToken.asObservable();

  private localStorageKey = 'auth';

  constructor(private http: HttpClient) {
    const storedState = localStorage.getItem(this.localStorageKey);
    if (!storedState){
      return;
    }

    const state = JSON.parse(storedState) as UserState;
    if (state.token && this.checkLifeTimeEnd(state.token)) {
      this.clearUser();
      return;
    }
    this._stateToken.next(state.token);
    this._stateUser.next(state.user);

  }

  getToken() {
    //console.log(jwtDecode(this._stateToken.value || ''));
    // console.log(this._stateToken.value);
    // console.log(this._stateUser.value);
    return this._stateToken.value;
  }

  updateUser(token: string): void {
    try {
      const user = jwtDecode(token) as User;
      this._stateToken.next(token);
      this._stateUser.next(user);
      const item = JSON.stringify({user, token} as UserState)
      localStorage.setItem(this.localStorageKey, item);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  checkLifeTimeEnd(token: string) {
    const decode = jwtDecode(token);
    if (!decode || !decode.exp)
      return true;
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decode.exp);

    return expirationDate < new Date();
  }

  clearUser() {
    this._stateUser.next(null);
    this._stateToken.next(null);
    localStorage.removeItem(this.localStorageKey);
  }
}
