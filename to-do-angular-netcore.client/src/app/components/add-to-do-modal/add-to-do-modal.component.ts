import {Component, inject} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-to-do-modal',
  template: `
      <div class="modal-header">
          <h4 class="modal-title">Add new ToDo?</h4>
          <button type="button" class="btn-close" aria-label="Close"
                  (click)="activeModal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
          <app-add-to-do></app-add-to-do>
      </div>
  `,
  styleUrl: './add-to-do-modal.component.css'
})
export class AddToDoModalComponent {
  activeModal = inject(NgbActiveModal);

}
