import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToDo} from "../type/to-do";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  baseUrl: string = 'https://localhost:7232/';
  toDo$ = new BehaviorSubject<ToDo[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getToDo() {

    const options = {
      headers: {"Authorization": `Bearer ${this.userService.token()}`}
    };

    return this.http.get<ToDo[]>(this.baseUrl + 'todo', options);
  }

  postToDo(toDo: ToDo) {
    const options = {
      headers: {"Authorization": `Bearer ${this.userService.token()}`}
    };

    return this.http.post<ToDo>(this.baseUrl + 'todo', toDo, options)
  }

  putToDo(id: string | number, toDo: ToDo) {
    const options = {
      headers: {"Authorization": `Bearer ${this.userService.token()}`}
    };
    return this.http.put(`https://localhost:7232/todo/${id}`, toDo, options);
  }
}
