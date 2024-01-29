import {Component, inject, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToDoService} from "../../Service/to-do.service";

@Component({
  selector: 'app-confirm-deletion-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">You wont delete this?</h4>
      <button type="button" class="btn-close" aria-label="Close"
              (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <div *ngFor="let msg of message">
        {{msg}}
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="deleteToDo()">Delete</button>
      <button type="button" class="btn btn-outline-success" (click)="activeModal.close('Save click')">No</button>
    </div>
  `,
  styleUrl: './confirm-deletion-modal.component.css'
})
export class ConfirmDeletionModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() delete: () => void;
  @Input() message: string[];

  constructor() {
  }

  deleteToDo() {
    this.delete();
    this.activeModal.close();
  }
}
