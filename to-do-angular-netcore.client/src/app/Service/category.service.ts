import {computed, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../type/category";
import {BehaviorSubject, catchError, delay, first, Observable, of, tap} from "rxjs";
import {ToDo} from "../type/to-do";

export type CategoryState = {
  category: Category[];
  isLoad: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'https://localhost:7232/';
  private state = signal<CategoryState>({
    category: [],
    isLoad: true,
  });

  category = computed(() => this.state().category)
  isLoad = computed(() => this.state().isLoad)


  constructor(private http: HttpClient) {
  }

  getCategory() {
    if (this.state().category.length > 0) {
      return of(this.state().category);
    }

    return this.http.get<Category[]>(this.baseUrl + 'category').pipe(
      tap((categories) => {
        this.addCategory(categories);
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        throw error; // Throw the error to handle it in the calling code.
      }),
      first() // Take the first emitted value and complete the observable.
    );
  }

  addCategory(add: Category[]) {
    this.state.update(state => ({...state, category: [...state.category, ...add]}));
  }
}
