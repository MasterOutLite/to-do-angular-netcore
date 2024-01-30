import {Component, inject, Input, OnInit} from '@angular/core';
import {ToDo} from '../../type/to-do';
import {catchError, Observable, tap} from "rxjs";
import {CategoryService} from "../../Service/category.service";
import {Category} from "../../type/category";
import {ToDoService} from "../../Service/to-do.service";
import {AddToDoModalComponent} from "../add-to-do-modal/add-to-do-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDeletionModalComponent} from "../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-render-to-do',
  template: `
      <div class="row text-center g-3">

          <div class="col-6">
              <div class="text-start">
                  <label for="titleFormControlInput-{{toDo.id}}" class="form-label ">Title</label>
                  <input type="text" [(ngModel)]="toDo.title" class="form-control"
                         id="titleFormControlInput-{{toDo.id}}"
                         (change)="handleOnEdit()" placeholder="Title">
              </div>
          </div>

          <div class="col-1 ">
              <div class="text-start d-flex flex-column align-items-center">
                  <label for="flexCheckDefault-{{toDo.id}}" class="form-label ">Done</label>
                  <input class="form-check-input mt-2" type="checkbox" [(ngModel)]="toDo.done" (change)="handleOnEdit()"
                         id="flexCheckDefault-{{toDo.id}}">
              </div>
          </div>

          <div class="col">
              <div class="text-start">
                  <label for="validationServer-{{toDo.id}}" class="form-label ">Category</label>
                  <select (change)="handleOnEdit()" [ngModel]="toDo.categoryId"
                          (ngModelChange)="onEditCategoryId($event)"
                          class="form-select" id="validationServer-{{toDo.id}}"
                          required>
                      <option *ngFor="let item of category$| async" value="{{item.id}}"
                              [selected]="item.id == toDo.categoryId">
                          {{item.name}}
                      </option>
                  </select>
              </div>
          </div>

          <div class="col-12">
              <div class="text-start">
                  <label for="descriptionFormControlInput-{{toDo.id}}" class="form-label ">Description</label>
                  <textarea type="text" [(ngModel)]="toDo.description" class="form-control"
                            id="descriptionFormControlInput-{{toDo.id}}"
                            (change)="handleOnEdit()"
                            placeholder="Description" rows="1">
            </textarea>
              </div>
          </div>

          <div class="col text-end">
              <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn"
                          (click)="handleUpdate()"
                          [disabled]="!isEdit"
                          [ngClass]="{'btn-primary': isEdit, 'btn-danger': isError}"
                  >
                      Update
                  </button>
                  <button type="button"
                          (click)="handleDelete()"
                          class="btn btn-danger">
                      Delete
                  </button>
              </div>
          </div>
      </div>
  `,
  styleUrl: './render-to-do.component.css'
})
export class RenderToDoComponent implements OnInit {
  private modalService = inject(NgbModal);
  @Input() toDo: ToDo;
  oldToDo: ToDo;
  isEdit: boolean = false;
  isError: boolean = false;
  category$: Observable<Category[]>;

  constructor(private toDoService: ToDoService, private categoryService: CategoryService) {
    this.category$ = categoryService.category$;
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe();
    this.oldToDo = {...this.toDo}
  }

  onEditCategoryId(event: string) {
    this.toDo.categoryId = parseInt(event);
  }

  handleOnEdit() {
    this.isEdit = JSON.stringify(this.toDo) !== JSON.stringify(this.oldToDo);
  }

  handleUpdate() {
    if (!this.isEdit)
      return;

    this.toDoService.putToDo(this.toDo.id, this.toDo).pipe(tap(() => {
      this.oldToDo = {...this.toDo};
      this.isEdit = false;
      if (this.isError)
        this.isError = false;
    }), catchError((err) => {
      this.isError = true;
      throw err
    })).subscribe();
  }

  handleDelete() {
    const modalRef = this.modalService.open(ConfirmDeletionModalComponent, {size: "sm",});
    modalRef.componentInstance.delete = () => {
      this.toDoService.deleteToDo(this.toDo.id).subscribe();
    };
    modalRef.componentInstance.message = [
      `You wont delete element with:`,
      `Title: ${this.toDo.title}.`,
      `Description: ${this.toDo.description}.`,
      `Category: ${this.toDo.category.name}. `,
    ];
  }
}
