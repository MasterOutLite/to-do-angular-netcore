import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, tap} from "rxjs";
import {Category} from "../../type/category";
import {ToDo} from "../../type/to-do";
import {ToDoService} from "../../Service/to-do.service";
import {CategoryService} from "../../Service/category.service";

@Component({
  selector: 'app-add-to-do',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" class="row g-3 needs-validation"
          [attr.novalidate]="novalidate">
      <div class="col-md-4">
        <label for="validationServer01" class="form-label">Title</label>
        <input formControlName="title" type="text" class="form-control" id="validationServer01"
               required>
      </div>
      <div class="col-md-6">
        <label for="validationServer02" class="form-label">Description</label>
        <textarea formControlName="description" type="text" rows="1"
                  class="form-control" id="validationServer02" required>
                </textarea>
      </div>

      <div class="col-md-2">
        <label for="validationServer03" class="form-label">Category</label>
        <select formControlName="categoryId" class="form-select" id="validationServer03" required>
          <option *ngFor="let category of categories" value="{{category.id}}">
            {{category.name}}
          </option>
          <option value="" selected>None</option>
        </select>
      </div>
      <div class="col">
        <button class="btn btn-primary" type="submit">Add To Do</button>
      </div>
    </form>
  `,
  styleUrl: './add-to-do.component.css'
})
export class AddToDoComponent implements OnInit {
  myForm: FormGroup;
  novalidate: boolean = false;
  categories: Category[];
  @Output() addToDo = new EventEmitter<ToDo>();

  constructor(private fb: FormBuilder,
              private toDoService: ToDoService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    this.getCategory();
  }

  handleSubmit() {
    if (this.myForm.valid) {
      this.novalidate = false;
      this.postToDo();
    } else {
      this.novalidate = true;
    }
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(value => {
      console.log(value);
      this.categories = value;
    });
  }

  postToDo() {
    this.toDoService.postToDo(this.myForm.value)
      .pipe(
        tap(value => {
          this.addToDo.emit(value);
          this.myForm.reset();
        })).subscribe();
  }

}
