import {Injectable} from "@angular/core";
import {ToDo} from "../type/to-do";
import {BehaviorSubject, first, Observable, tap} from "rxjs";
import {HttpApi} from "./http-api";
import {QueryTodo} from "../type/query-todo";
import {PaginationResponse} from "../type/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private _currentState: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  public todo$: Observable<ToDo[]> = this._currentState.asObservable();

  addToDo(add: ToDo) {
    this._currentState.next([...this._currentState.value, add]);
  }

  constructor(private httpApi: HttpApi) {
  }

  getToDo(query?: QueryTodo) {
    return this.httpApi.get<PaginationResponse<ToDo>>('todo', query).pipe(
      tap(value => {
        console.log(value);
        this._currentState.next(value.data);
      }), first());
  }

  postToDo(toDo: ToDo) {
    return this.httpApi.post<ToDo>('todo', toDo).pipe(
      tap(value => {
        this.addToDo(value);
      }))
  }

  putToDo(id: string | number, toDo: ToDo) {
    return this.httpApi.put(`todo/${id}`, toDo);
  }

  deleteToDo(id: number) {
    return this.httpApi.delete(`todo/${id}`).pipe(tap(value => {
      const newArr = this._currentState.value.filter(value => value.id != id);
      this._currentState.next(newArr);
    }));
  }
}
