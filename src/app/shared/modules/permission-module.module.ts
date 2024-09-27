import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/guard.component';
import { PermissionDetailComponent } from 'src/app/features/permission/permission-detail/permission-detail.component';
import { PermissionFormComponent } from 'src/app/features/permission/permission-form/permission-form.component';
import { PermissionListComponent } from 'src/app/features/permission/permission-list/permission-list.component';

const routes: Routes = [
  {
    path: '',
    component: PermissionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'permission/add',
    component: PermissionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'permission/update/:id',
    component: PermissionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'permission/detail',
    component: PermissionDetailComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PermissionModuleModule { }
