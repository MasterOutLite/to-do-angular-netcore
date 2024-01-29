import {Injectable} from "@angular/core";
import {Category} from "../type/category";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {HttpApi} from "./http-api";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _currentState: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public category$: Observable<Category[]> = this._currentState.asObservable();


  constructor(private httpApi: HttpApi) {
  }

  getCategory() {
    return this.httpApi.get<Category[]>('category').pipe(
      tap((categories) => {
        this._currentState.next(categories)
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
    );
  }

  postCategory(category: Category){
    return this.httpApi.post<Category>('category', category).pipe(
      tap((data) => {
        this.addCategory(data);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error;
      }),
    );
}

  addCategory(add: Category) {
    this._currentState.next([...this._currentState.value, add])
  }
}
