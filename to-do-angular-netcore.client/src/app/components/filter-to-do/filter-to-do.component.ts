import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../type/category";
import {CategoryService} from "../../Service/category.service";
import {toDoColumnFilter} from "../../const/to-do-column-filter";
import {ToDoService} from "../../Service/to-do.service";
import {QueryTodo} from "../../type/query-todo";

@Component({
    selector: 'app-filter-to-do',
    template: `
        <div class="d-flex flex-row gap-2">
            <div>
                <label for="categoryIdFilter" class="form-label">Category</label>
                <select class="form-select" (change)="changeCategory($event)" [(ngModel)]="categoryId"
                        id="categoryIdFilter"
                        required>
                    <option *ngFor="let category of categories$ | async" [value]="category.id">
                        {{category.name}}
                    </option>
                    <option value="0" selected>None</option>
                </select>
            </div>

            <div>
                <label for="sortColumn" class="form-label">Sort column</label>
                <select class="form-select" (change)="changeColumnFilter($event)"
                        id="sortColumn" required>
                    <option *ngFor="let column of toDoColumnFilter; let i = index" [value]="i"
                    >
                        {{column.title}}
                    </option>
                    <option value="" selected>None</option>
                </select>
            </div>
        </div>
    `,
    styleUrl: './filter-to-do.component.css'
})
export class FilterToDoComponent {
    protected readonly toDoColumnFilter = toDoColumnFilter;
    categories$: Observable<Category[]>;
    categoryId: number = 0;

    constructor(private categoryService: CategoryService, private toDoService: ToDoService) {
        this.categories$ = this.categoryService.category$;
    }

    changeCategory(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        const categoryId = parseInt(value) || undefined;
        this.toDoService.getToDo({categoryId}).subscribe();
    }

    changeColumnFilter(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        const index = parseInt(value);
        let query: QueryTodo = {sortColumn: undefined, sortOrder: undefined};
        if (index) {
            const column = this.toDoColumnFilter[index];
            query = {sortColumn: column.sortColumn, sortOrder: column.sortOrder};
        }
        this.toDoService.getToDo(query).subscribe();
    }

}
