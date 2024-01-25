import {Component, OnInit} from '@angular/core';
import {ToDo} from "../../type/to-do";
import {ToDoService} from "../../Service/to-do.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../Service/user.service";
import {Routers} from "../../routes";

@Component({
    selector: 'app-to-do-page',
    template: `
        <app-container>
            <app-add-to-do (addToDo)="addToDo($event)"></app-add-to-do>
            <app-render-to-do-list [toDos]="toDo"></app-render-to-do-list>
        </app-container>
    `,
    styleUrl: './to-do-page.component.css'
})
export class ToDoPageComponent implements OnInit {
    public toDo: ToDo[] = [];

    constructor(private toDoService: ToDoService, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        if (!this.userService.user()) {
            this.router.navigate([Routers.Auth]);
            return;
        }

        this.toDoService.getToDo().pipe(tap(value => {
            this.toDo = value;
            console.log(value);
        })).subscribe();
    }

    addToDo(newToDo: ToDo) {
        this.toDo.push(newToDo);
    }

}
