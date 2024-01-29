import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RenderToDoComponent} from './components/render-to-do/render-to-do.component';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AddToDoComponent} from './components/add-to-do/add-to-do.component';
import {ContainerComponent} from './components/container/container.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalUpdateToDoComponent} from './components/modal-update-to-do/modal-update-to-do.component';
import {RenderToDoListComponent} from './components/render-to-do-list/render-to-do-list.component';
import {FooterComponent} from './Layout/footer/footer.component';
import {HeaderComponent} from './Layout/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import {AuthComponent} from './components/auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from './page/auth-page/auth-page.component';
import {ToDoPageComponent} from './page/to-do-page/to-do-page.component';
import {LayoutComponent} from './Layout/layout/layout.component';
import {routes} from "./routes";
import { HomePageComponent } from './page/home-page/home-page.component';
import { TestPageComponent } from './page/test-page/test-page.component';
import { AddToDoModalComponent } from './components/add-to-do-modal/add-to-do-modal.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ConfirmDeletionModalComponent } from './components/confirm-deletion-modal/confirm-deletion-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    RenderToDoComponent,
    AddToDoComponent,
    ContainerComponent,
    ModalUpdateToDoComponent,
    RenderToDoListComponent,
    FooterComponent,
    HeaderComponent,
    AuthComponent,
    AuthPageComponent,
    ToDoPageComponent,
    LayoutComponent,
    HomePageComponent,
    TestPageComponent,
    AddToDoModalComponent,
    AddCategoryComponent,
    ConfirmDeletionModalComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    NgbPaginationModule, NgbAlertModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule, FormsModule, ReactiveFormsModule, NgOptimizedImage
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
