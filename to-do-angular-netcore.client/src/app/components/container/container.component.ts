import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div class="container">
      <ng-content>

      </ng-content>
    </div>
  `,
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
