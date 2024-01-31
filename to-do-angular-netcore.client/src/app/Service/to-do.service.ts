import {Injectable} from "@angular/core";
import {ToDo} from "../type/to-do";
import {BehaviorSubject, first, Observable, tap} from "rxjs";
import {HttpApi} from "./http-api";
import {QueryTodo} from "../type/query-todo";
import {Pagination, PaginationResponse} from "../type/pagination-response";


@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private _toDoState: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  public todo$: Observable<ToDo[]> = this._toDoState.asObservable();
  private _paginationState: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({page: 0, total: 0});
  public paginationState$: Observable<Pagination> = this._paginationState.asObservable();

  public query: QueryTodo = {};

  addToDo(add: ToDo) {
    this._toDoState.next([...this._toDoState.value, add]);
  }

  constructor(private httpApi: HttpApi) {
  }

  getToDo(query?: QueryTodo) {
    if (query)
      this.query = ({...this.query, ...query})
    console.log('query', this.query);
    return this.httpApi.get<PaginationResponse<ToDo>>('todo', this.query).pipe(
      tap(value => {
        console.log(value);
        this._toDoState.next(value.data);
        this._paginationState.next({total: value.total, page: value.page});
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
      if (this._toDoState.value.length <= 1 && this.query.page != undefined) {
        this.query.page = this.query.page - 1;
      }
      this.getToDo().subscribe();
    }));
  }
}
