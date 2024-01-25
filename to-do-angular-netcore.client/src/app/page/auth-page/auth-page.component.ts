import {Component} from '@angular/core';

@Component({
  selector: 'app-auth-page',
  template: `
      <div class="mx-auto pt-5" style="max-width: 600px">
          <app-auth></app-auth>
      </div>
  `,
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {

}
