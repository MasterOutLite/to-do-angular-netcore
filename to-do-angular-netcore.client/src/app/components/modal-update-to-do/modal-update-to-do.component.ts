import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToDo} from "../../type/to-do";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../type/category";
import {ToDoService} from "../../Service/to-do.service";
import {CategoryService} from "../../Service/category.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-modal-update-to-do',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="handleSubmit($event)" class="row g-3 needs-validation"
          [attr.novalidate]="novalidate">
      <div class="col-md-4">
        <label for="validationServer01" class="form-label">Title</label>
        <input formControlName="title" type="text" class="form-control" id="validationServer01"
               required>
      </div>
      <div class="col-md-6">
        <label for="validationServer02" class="form-label">Description</label>
        <input formControlName="description" type="text" class="form-control" id="validationServer02" required>
      </div>

      <div class="col-md-2">
        <label for="validationServer03" class="form-label">Category</label>
        <select formControlName="categoryId" class="form-select" id="validationServer03" required>
          <option *ngFor="let category of categories" value="{{category.id}}">
            {{category.name}}
          </option>
          <option value="" selected>...</option>
        </select>
      </div>
      <div class="col">
        <button class="btn btn-primary" type="submit">Add To Do</button>
      </div>
    </form>
  `,
  styleUrl: './modal-update-to-do.component.css'
})
export class ModalUpdateToDoComponent implements OnInit {
  @Input() todo: ToDo;
  @Output() newToDo = new EventEmitter<ToDo>();

  myForm: FormGroup;
  novalidate: boolean = false;
  categories: Category[];

  constructor(private fb: FormBuilder, private toDoService: ToDoService,
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

  handleSubmit(event: Event) {
    if (this.myForm.valid) {
      console.log('Form submitted successfully');
      console.log('Form Data:', this.myForm.value);
      this.novalidate = false;
    } else {
      console.log('Form is invalid');
      this.novalidate = true;
    }
  }

  getCategory() {
    this.categoryService.getCategory()
      // .pipe(
      //   tap(value => {
      //     this.categories = value;
      //   }),
      //   catchError((err) => {
      //     console.log(err)
      //     throw err;
      //   })
      // ).subscribe();
  }
}
