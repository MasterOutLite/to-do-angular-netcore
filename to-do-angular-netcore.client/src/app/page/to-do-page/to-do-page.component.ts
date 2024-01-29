import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../Service/user.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Routers} from "../../routes";
import {Router} from "@angular/router";
import {AddToDoModalComponent} from "../../components/add-to-do-modal/add-to-do-modal.component";

@Component({
  selector: 'app-to-do-page',
  template: `
    <app-container>
      <button class="btn btn-lg btn-outline-primary " (click)="open()">Add new ToDo</button>
      <app-render-to-do-list></app-render-to-do-list>
    </app-container>
  `,
  styleUrl: './to-do-page.component.css'
})
export class ToDoPageComponent implements OnInit {
  user$: Observable<any>;
  private modalService = inject(NgbModal);

  constructor(private router: Router, private userService: UserService) {
    if (!this.userService.getToken()) {
      this.router.navigate([Routers.Auth]);
      return;
    }
  }

  ngOnInit() {
    this.user$ = this.userService.token$;
  }

  open() {
    const modalRef = this.modalService.open(AddToDoModalComponent, {fullscreen: "sm", size: "xl", scrollable: true});
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
