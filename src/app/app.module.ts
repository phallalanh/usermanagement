// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { RoleListComponent } from './features/role/role-list/role-list.component';
import { UserDetailComponent } from './features/user/user-detail/user-detail.component';
import { RoleDetailComponent } from './features/role/role-detail/role-detail.component';
import { DepartmentListComponent } from './features/department/department-list/department-list.component';
import { DepartmentFormComponent } from './features/department/department-form/department-form.component';
import { DepartmentDetailComponent } from './features/department/department-detail/department-detail.component';
import { AuthServiceComponent } from './core/service/auth-service.component';
import { MessageComponent } from './shared/message/message.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ListComponent } from './shared/component/list/list.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

// Services
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomMessageService } from './core/service/customMessage.service';
import { RoleFormComponent } from './features/role/role-form/role-form.component';
import { CardComponent } from './shared/card/card.component';
import { ForgotPasswordComponent } from './features/reset-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserFormComponent,
    RoleListComponent,
    RoleFormComponent,
    UserDetailComponent,
    RoleDetailComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailComponent,
    ForgotPasswordComponent,
    ListComponent,
    UserListComponent,
    MessageComponent,
    NotfoundComponent,
    DashboardComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CardModule,
    HttpClientModule,
    MenubarModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ToastModule,
    DropdownModule,
    ImageModule,
    ConfirmDialogModule

  ],
  providers: [AuthServiceComponent, MessageService, CustomMessageService, ConfirmationService], // Include services here
  bootstrap: [AppComponent]
})
export class AppModule { }
