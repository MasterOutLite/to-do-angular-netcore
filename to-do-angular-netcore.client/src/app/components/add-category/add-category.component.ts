import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../Service/category.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-category',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="handleSubmit()" class="row g-3 needs-validation"
          [attr.novalidate]="novalidate">
      <div class="col-12 col-lg-4">
        <label for="validationServer01" class="form-label">Name</label>
        <input formControlName="name" type="text" class="form-control" id="validationServer01"
               required>
      </div>
      <div class="col-12 col-lg-8">
        <label for="validationServer02" class="form-label">Description</label>
        <textarea formControlName="description" type="text" rows="1"
                  class="form-control" id="validationServer02" required>
                </textarea>
      </div>
      <div class="col-12 text-end">
        <button class="btn btn-primary ms-auto" type="submit">Add Category</button>

      </div>
    </form>
  `,
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  myForm: FormGroup;
  novalidate: boolean = false;
  @Output() addCategory: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  handleSubmit() {
    console.log(this.myForm.value)
    if (this.myForm.valid) {
      this.novalidate = false;
      this.categoryService.postCategory(this.myForm.value).pipe(tap(value => {
        this.addCategory.emit();
      })).subscribe();
    } else {
      this.novalidate = true;
    }
  }
}
