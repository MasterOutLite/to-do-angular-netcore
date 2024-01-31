import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, tap} from "rxjs";
import {Category} from "../../type/category";
import {ToDoService} from "../../Service/to-do.service";
import {CategoryService} from "../../Service/category.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-to-do',
  template: `
      <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" class="row g-3 needs-validation"
            [attr.novalidate]="novalidate">
          <div class="col-12 col-lg-4">
              <label for="validationServer01" class="form-label">Title</label>
              <input formControlName="title" type="text" class="form-control" id="validationServer01"
                     required>
          </div>
          <div class="col-12 col-lg-8">
              <label for="validationServer02" class="form-label">Description</label>
              <textarea formControlName="description" type="text" rows="1"
                        class="form-control" id="validationServer02" required>
                </textarea>
          </div>

          <div class="col-12 col-lg-4">
              <label for="validationServer03" class="form-label">Category</label>
              <select formControlName="categoryId" class="form-select" id="validationServer03" required>
                  <option *ngFor="let category of categories$ | async" [value]="category.id">
                      {{category.name}}
                  </option>
                  <option value="" selected>None</option>
              </select>
          </div>

          <div class="col-6 col-md-4 col-xl-3 d-flex flex-column justify-content-end">
              <button
                      type="button"
                      class="btn btn-outline-primary mt-auto"
                      (click)="collapse.toggle()"
                      [attr.aria-expanded]="!isCollapsed"
                      aria-controls="collapseExample"
              >
                  Add Category
              </button>
          </div>
          <div class="col-12">
              <div #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed" class="card border-0">
                  <app-add-category (addCategory)="hide()"></app-add-category>
              </div>
          </div>
          <div class="col text-end mt-0">
              <hr/>
              <button class="btn btn-primary" type="submit">Add To Do</button>
              <button class="btn btn-outline-secondary ms-3" (click)="activeModal.close()">Close</button>
          </div>
      </form>
  `,
  styleUrl: './add-to-do.component.css'
})
export class AddToDoComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  myForm: FormGroup;
  novalidate: boolean = false;
  categories$: Observable<Category[]>;
  isCollapsed = true;

  constructor(private fb: FormBuilder,
              private toDoService: ToDoService,
              private categoryService: CategoryService) {
    this.categories$ = this.categoryService.category$
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    this.getCategory();
  }

  hide() {
    this.isCollapsed = true;
  }

  handleSubmit() {
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      this.novalidate = false;
      this.postToDo();
    } else {
      this.novalidate = true;
    }
  }

  getCategory() {
    this.categoryService.getCategory().subscribe();
  }

  postToDo() {
    this.toDoService.postToDo(this.myForm.value)
      .pipe(
        tap(() => {
          this.myForm.reset();
        })).subscribe();
  }
}
