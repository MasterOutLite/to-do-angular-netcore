import {Component, Input, OnInit} from '@angular/core';
import {ToDo} from '../../type/to-do';
import {catchError, tap} from "rxjs";
import {CategoryService} from "../../Service/category.service";
import {Category} from "../../type/category";
import {ToDoService} from "../../Service/to-do.service";

@Component({
  selector: 'app-render-to-do',
  template: `
    <div class="row text-center g-3">
      <div class="col-4 col-sm-1" (click)="handleUpdate()">
        <button type="button" class="btn"
                [disabled]="!isEdit"
                [ngClass]="{'btn-primary': isEdit, 'btn-danger': isError}"
        >{{toDo.id}}</button>
      </div>

      <div class="col-2 col-sm-1 pt-2">
        <input class="form-check-input" type="checkbox" [(ngModel)]="toDo.done" (change)="handleOnEdit()"
               id="flexCheckDefault-{{toDo.id}}">
      </div>

      <div class="col-6 col-sm-2">
        <select (change)="handleOnEdit()" [ngModel]="toDo.categoryId"
                (ngModelChange)="onEditCategoryId($event)"
                class="form-select" id="validationServer-{{toDo.id}}"
                required>
          <option *ngFor="let item of category" value="{{item.id}}" [selected]="item.id == toDo.categoryId">
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="col-12 col-sm">
        <input type="text" [(ngModel)]="toDo.title" class="form-control" id="titleFormControlInput-{{toDo.id}}"
               (change)="handleOnEdit()" placeholder="Title">
      </div>

      <div class="col-12 col-sm-12 col-lg">
            <textarea type="text" [(ngModel)]="toDo.description" class="form-control"
                      id="descriptionFormControlInput-{{toDo.id}}"
                      (change)="handleOnEdit()"
                      placeholder="Description" rows="1">
            </textarea>
      </div>

    </div>
  `,
  styleUrl: './render-to-do.component.css'
})
export class RenderToDoComponent implements OnInit {
  @Input() toDo: ToDo;
  oldToDo: ToDo;
  isEdit: boolean = false;
  isError: boolean = false;
  category: Category[];

  constructor(private toDoService: ToDoService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(value => {
      this.category = value
    })
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

    console.log('Not is equals');
    console.log('this.toDo', this.toDo);
    console.log('this.oldToDo', this.oldToDo);
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
}
