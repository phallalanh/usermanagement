import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/guard.component';
import { RoleListComponent } from 'src/app/features/role/role-list/role-list.component';
import { RoleFormComponent } from 'src/app/features/role/role-form/role-form.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role/add',
    component: RoleFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role/update/:id',
    component: RoleFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role/detail',
    component: RoleFormComponent,
    canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleModuleModule { }
