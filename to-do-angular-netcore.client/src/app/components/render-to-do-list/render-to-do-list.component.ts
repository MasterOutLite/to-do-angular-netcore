import {Component, OnInit} from '@angular/core';
import {ToDo} from "../../type/to-do";
import {ToDoService} from "../../Service/to-do.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-render-to-do-list',
  template: `
    <div class="pt-2 d-flex flex-column">
      <h3>To Do List</h3>
      <div class="row g-3">
        <div class="card p-2" *ngFor="let toDo of toDosOb$ | async | slice: 0:countItems; let i = index;">
          <app-render-to-do
            [toDo]="toDo">
          </app-render-to-do>
        </div>
      </div>

      <ng-container *ngIf="showPagination">
        <ngb-pagination
          class="d-flex justify-content-center mt-4 "
          [collectionSize]="totalItems"
          [(page)]="page"
          (pageChange)="selectPage($event)"
          [maxSize]="5"
          [rotate]="true"
          [ellipses]="false"
          [boundaryLinks]="true"
        />
      </ng-container>

    </div>
  `,
  styleUrl: './render-to-do-list.component.css'
})
export class RenderToDoListComponent implements OnInit {
  toDosOb$: Observable<ToDo[]>;
  showPagination: boolean = false;
  page: number = 1;
  totalItems: number = 1;
  countItems: number = 10;

  constructor(private toDoService: ToDoService) {
  }

  ngOnInit(): void {
    this.toDosOb$ = this.toDoService.todo$;
    this.toDoService.getToDo().subscribe(value => {
      this.page = value.page + 1;
      this.totalItems = value.total;
      this.showPagination =  this.totalItems / this.countItems > 1;
      console.log(this.countItems, this.page, this.totalItems);
    });
  }

  selectPage(page: number) {
    this.toDoService.getToDo({page: this.page - 1, count: this.countItems}).subscribe(
      value => {
        this.page = value.page + 1;
        this.totalItems = value.total;
        console.log(this.countItems, this.page, this.totalItems);
      }
    );
  }

  formatInput(input: HTMLInputElement) {
    const FILTER_PAG_REGEX = /[^0-9]/g;
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }


}
