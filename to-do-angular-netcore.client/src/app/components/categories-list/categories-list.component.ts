import {Component, inject} from '@angular/core';
import {CategoryService} from "../../Service/category.service";
import {Observable} from "rxjs";
import {Category} from "../../type/category";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-categories-list',
    template: `
        <button type="button" class="btn btn-outline-primary" (click)="open()">Category</button>
    `,
    styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {

    private modalService = inject(NgbModal);

    open() {
        const modalRef = this.modalService.open(CategoriesListModalComponent, {scrollable: true});
    }
}

@Component({
    selector: 'app-categories-list-modal',
    template: `
        <div class="modal-header">
            <h4 class="modal-title" id="modal-basic-title">Category list</h4>
            <button type="button" class="btn-close" aria-label="Close"
                    (click)="modal.dismiss('Cross click')"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="d-flex flex-column overflow-y-scroll gap-2" style="max-height: 300px">
                    <div class="col-12 d-flex justify-content-between" *ngFor="let item of categories$ | async">
                        <div class="col-8">
                            {{item.name}}
                        </div>
                        <button class="btn btn-danger align-self-end">
                            Delete
                        </button>
                    </div>
                </div>
                <div class="col-12">
                    <div #collapse="ngbCollapse" [(ngbCollapse)]="isCollapsed" class="card border-0">
                        <app-add-category (addCategory)="hide()"></app-add-category>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" (click)="collapse.toggle()">Add Category</button>
            <button type="button" class="btn btn-outline-secondary" (click)="modal.close('Save click')">Close</button>
        </div>
    `,
})
export class CategoriesListModalComponent {
    modal = inject(NgbActiveModal);
    isCollapsed = true;
    categories$: Observable<Category[]>;

    constructor(private categoryService: CategoryService) {
        this.categories$ = this.categoryService.category$;
    }

    hide() {
        this.isCollapsed = true;
    }
}
