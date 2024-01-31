import {Component, inject, OnInit} from '@angular/core';
import {ToDo} from "../../type/to-do";
import {ToDoService} from "../../Service/to-do.service";
import {Observable} from "rxjs";
import {AddToDoModalComponent} from "../add-to-do-modal/add-to-do-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-render-to-do-list',
  template: `
    <div class="pt-2 d-flex flex-column ">

      <div class="d-flex gap-2 flex-wrap align-items-end justify-content-md-end justify-content-center">
        <app-filter-to-do></app-filter-to-do>
        <span>
          <app-categories-list></app-categories-list>
          <button class="btn  btn-outline-primary ms-2" (click)="open()">Add ToDo</button>
        </span>
      </div>
      <hr/>

      <div class="row g-3">
        <div class="card p-2" *ngFor="let toDo of toDos$ | async | slice: 0:countItems; let i = index;">
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
  private modalService = inject(NgbModal);
  toDos$: Observable<ToDo[]>;
  showPagination: boolean = false;
  page: number = 1;
  totalItems: number = 1;
  countItems: number = 10;

  constructor(private toDoService: ToDoService) {
  }

  ngOnInit(): void {
    this.toDos$ = this.toDoService.todo$;
    this.toDoService.todo$.subscribe(value => {
      if (value.length > this.countItems) {
        console.log('Get new ToDo')
        this.toDoService.getToDo().subscribe();
      }
    });

    this.toDoService.paginationState$.subscribe(value => {
      this.page = value.page + 1;
      this.totalItems = value.total;
      this.showPagination = this.totalItems > this.countItems;
    });

    this.toDoService.getToDo({page: this.page - 1, count: this.countItems}).subscribe();
  }

  selectPage(page: number) {
    this.toDoService.getToDo({page: page - 1, count: this.countItems}).subscribe();
  }

  open() {
    this.modalService.open(AddToDoModalComponent, {fullscreen: "sm", size: "xl", scrollable: true});
  }


}
