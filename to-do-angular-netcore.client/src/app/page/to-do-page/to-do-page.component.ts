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
      <div class="container-md">
          <app-render-to-do-list></app-render-to-do-list>
      </div>
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


}
