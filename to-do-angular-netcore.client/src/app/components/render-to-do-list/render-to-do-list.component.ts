import {Component, Input} from '@angular/core';
import {ToDo} from "../../type/to-do";

@Component({
  selector: 'app-render-to-do-list',
  template: `
      <div class="pt-2">
          <h3>To Do List</h3>
          <div>
              <div class="row text-center pb-2">
                  <div class="col-1 col-sm-1">
                      ID
                  </div>

                  <div class="col-2 col-sm-1">
                      Done
                  </div>

                  <div class="col-3 col-sm-2">
                      Category
                  </div>

                  <div class="col">
                      Title
                  </div>

                  <div class="col">
                      Description
                  </div>

              </div>
              <div class="row g-3">
                  <app-render-to-do
                          *ngFor="let toDo of toDos"
                          [toDo]="toDo">
                  </app-render-to-do>
              </div>
          </div>
      </div>
  `,
  styleUrl: './render-to-do-list.component.css'
})
export class RenderToDoListComponent {
  @Input() toDos: ToDo[];

}
