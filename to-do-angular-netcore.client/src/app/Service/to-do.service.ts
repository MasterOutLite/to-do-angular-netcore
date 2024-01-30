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

    private _currentState: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
    public todo$: Observable<ToDo[]> = this._currentState.asObservable();
    private _paginationState: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({page: 0, total: 0});
    public paginationState$: Observable<Pagination> = this._paginationState.asObservable();

    public query: QueryTodo = {};

    addToDo(add: ToDo) {
        this._currentState.next([...this._currentState.value, add]);
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
                this._currentState.next(value.data);
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
            const newArr = this._currentState.value.filter(value => value.id != id);
            this._currentState.next(newArr);
        }));
    }
}
