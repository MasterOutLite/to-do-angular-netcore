import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
      <div class="min-vh-100 d-flex flex-column">
          <app-header></app-header>
          <div class="flex-grow-1">
              <ng-content></ng-content>
          </div>
          <app-footer></app-footer>
      </div>
  `,
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
